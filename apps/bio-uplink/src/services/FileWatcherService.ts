import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { MetricTransformer } from './MetricTransformer';
import { SyncEngine } from './SyncEngine';

const INGEST_PATH = 'Sovereign_Ingest';
const ARCHIVE_PATH = 'Sovereign_Archive';

export const FileWatcherService = {
  async init() {
    try {
      await Filesystem.mkdir({ path: INGEST_PATH, directory: Directory.Documents, recursive: true });
      await Filesystem.mkdir({ path: ARCHIVE_PATH, directory: Directory.Documents, recursive: true });
    } catch (e) {
      console.log('FileWatcher: Directories exist or permission denied.');
    }
  },

  async scanAndIngest(): Promise<number> {
    try {
      // 1. List files
      const result = await Filesystem.readdir({
        path: INGEST_PATH,
        directory: Directory.Documents
      });

      let ingestedCount = 0;

      for (const file of result.files) {
        if (file.name.endsWith('.json')) {
            // 2. Read
            const contents = await Filesystem.readFile({
                path: `${INGEST_PATH}/${file.name}`,
                directory: Directory.Documents,
                encoding: Encoding.UTF8
            });

            // 3. Parse & Transform
            const rawData = JSON.parse(contents.data as string);
            const metrics = MetricTransformer.fromFile(rawData);

            // 4. Queue in Vault
            for (const m of metrics) {
                await SyncEngine.queueItem(m);
                ingestedCount++;
            }

            // 5. Archive (Move)
            await Filesystem.rename({
                from: `${INGEST_PATH}/${file.name}`,
                to: `${ARCHIVE_PATH}/${file.name}_${Date.now()}.json`,
                directory: Directory.Documents
            });
        }
      }

      return ingestedCount;

    } catch (e) {
      console.error('FileWatcher Scan Error:', e);
      return 0;
    }
  }
};
