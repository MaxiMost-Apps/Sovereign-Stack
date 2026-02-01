import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { SupabaseService } from './SupabaseService';

const DB_NAME = 'mule_vault';

export interface QueueItem {
  id?: number;
  metric_type: string;
  value: number;
  unit: string;
  recorded_at: string;
  metadata: string; // JSON string
  synced: number; // 0 or 1
}

export const SyncEngine = {
  db: null as SQLiteDBConnection | null,
  sqlite: new SQLiteConnection(CapacitorSQLite),
  lastPushTime: null as string | null,

  async init() {
    try {
      if (this.db) return;

      this.db = await this.sqlite.createConnection(DB_NAME, false, 'no-encryption', 1, false);
      await this.db.open();

      const schema = `
        CREATE TABLE IF NOT EXISTS sync_queue (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          metric_type TEXT NOT NULL,
          value REAL NOT NULL,
          unit TEXT NOT NULL,
          recorded_at TEXT NOT NULL,
          metadata TEXT,
          synced INTEGER DEFAULT 0
        );
      `;
      await this.db.execute(schema);
      console.log('Mule Vault (SQLite) initialized.');
    } catch (err) {
      console.error('Mule Vault Init Error:', err);
    }
  },

  async queueItem(item: Omit<QueueItem, 'id' | 'synced'>) {
    if (!this.db) await this.init();

    const query = `
      INSERT INTO sync_queue (metric_type, value, unit, recorded_at, metadata, synced)
      VALUES (?, ?, ?, ?, ?, 0);
    `;
    const values = [item.metric_type, item.value, item.unit, item.recorded_at, JSON.stringify(item.metadata)];

    await this.db?.run(query, values);
    console.log(`Vaulted: ${item.metric_type} (${item.value})`);
  },

  async getPendingCount(): Promise<number> {
    if (!this.db) await this.init();
    const res = await this.db?.query('SELECT COUNT(*) as count FROM sync_queue WHERE synced = 0;');
    return res?.values?.[0]?.count || 0;
  },

  async getSyncedTodayCount(): Promise<number> {
    if (!this.db) await this.init();
    // Rough "today" calculation based on recorded_at string comparison if ISO,
    // or just count synced items. Since we prune synced items, this might be 0 always
    // unless we delay pruning or track in a separate table.
    // For now, we will assume we prune. So this might need a persistent counter or stats table.
    // Let's implement a simple stats logic:
    // We won't prune immediately in flushQueue for this to work, or we accept it resets on prune.
    // Let's modify flushQueue to NOT prune immediately to allow this stat,
    // OR we just return 0 for now if pruning is active.
    // User asked for "Synced Today". Let's disable aggressive pruning for today's items.

    const today = new Date().toISOString().split('T')[0];
    const res = await this.db?.query(`
        SELECT COUNT(*) as count FROM sync_queue
        WHERE synced = 1 AND recorded_at LIKE '${today}%';
    `);
    return res?.values?.[0]?.count || 0;
  },

  async flushQueue(): Promise<number> {
    if (!this.db) await this.init();

    // 1. Fetch pending
    const res = await this.db?.query('SELECT * FROM sync_queue WHERE synced = 0 LIMIT 50;');
    const items = res?.values as QueueItem[];

    if (!items || items.length === 0) return 0;

    let successCount = 0;

    // 2. Push to Supabase
    for (const item of items) {
      try {
        await SupabaseService.pushMetric({
            metric_type: item.metric_type,
            value: item.value,
            unit: item.unit,
            recorded_at: item.recorded_at,
            metadata: JSON.parse(item.metadata || '{}')
        });

        // 3. Mark Synced
        await this.db?.run('UPDATE sync_queue SET synced = 1 WHERE id = ?', [item.id]);
        successCount++;
      } catch (e) {
        console.error(`Sync Failed for ${item.id}:`, e);
      }
    }

    if (successCount > 0) {
        this.lastPushTime = new Date().toLocaleTimeString();
    }

    // Prune items older than 24 hours that are synced
    // This keeps "Synced Today" accurate-ish while preventing bloat
    const yesterday = new Date(Date.now() - 86400000).toISOString();
    await this.db?.run(`DELETE FROM sync_queue WHERE synced = 1 AND recorded_at < '${yesterday}'`);

    return successCount;
  }
};
