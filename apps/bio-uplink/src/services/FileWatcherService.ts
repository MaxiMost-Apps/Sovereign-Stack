import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { MetricTransformer, type RawData } from './MetricTransformer';
import { SyncEngine } from './SyncEngine';

const INGEST_PATH = 'Sovereign_Ingest';
const ARCHIVE_PATH = 'Sovereign_Ingest/Archive';
const ERROR_PATH = 'Sovereign_Ingest/Errors';
const DEBUG_LOG = 'mule_debug.txt';

export const FileWatcherService = {
  async init() {
    try {
      await Filesystem.mkdir({ path: INGEST_PATH, directory: Directory.Documents, recursive: true });
      await Filesystem.mkdir({ path: ARCHIVE_PATH, directory: Directory.Documents, recursive: true });
      await Filesystem.mkdir({ path: ERROR_PATH, directory: Directory.Documents, recursive: true });
    } catch (e) {
      console.log('FileWatcher: Directories exist or permission denied.');
    }
  },

  async logError(message: string) {
    try {
      const timestamp = new Date().toISOString();
      await Filesystem.appendFile({
        path: DEBUG_LOG,
        data: `[${timestamp}] ${message}\n`,
        directory: Directory.Documents,
        encoding: Encoding.UTF8
      });
    } catch (e) {
      console.error('Failed to write debug log', e);
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
        // Skip subdirectories
        if (file.type === 'directory') continue;

        if (file.name.endsWith('.json')) {
            try {
                // 2. Read
                const contents = await Filesystem.readFile({
                    path: `${INGEST_PATH}/${file.name}`,
                    directory: Directory.Documents,
                    encoding: Encoding.UTF8
                });

                // 3. Parse & Transform
                const rawData = JSON.parse(contents.data as string);

                let items: RawData[] = [];
                if (Array.isArray(rawData)) {
                    items = rawData;
                } else {
                    items = [rawData];
                }

                // 4. Queue in Vault
                for (const item of items) {
                     // Ensure minimum viable fields
                     if (item.label && (item.value !== undefined) && item.timestamp) {
                         const metric = MetricTransformer.transformToMetric({
                             source_type: 'FILE',
                             label: item.label,
                             value: item.value,
                             timestamp: item.timestamp,
                             metadata: item.metadata
                         });
                         await SyncEngine.queueItem(metric);
                         ingestedCount++;
                     } else {
                         throw new Error(`Invalid item structure in ${file.name}`);
                     }
                }

                // 5. Archive (Move on Success)
                await Filesystem.rename({
                    from: `${INGEST_PATH}/${file.name}`,
                    to: `${ARCHIVE_PATH}/${file.name}_${Date.now()}.json`,
                    directory: Directory.Documents
                });

            } catch (err: any) {
                // 6. Error Handling (Move to Errors)
                console.error(`Failed to ingest ${file.name}:`, err);
                await this.logError(`File: ${file.name} - Error: ${err.message}`);

                await Filesystem.rename({
                    from: `${INGEST_PATH}/${file.name}`,
                    to: `${ERROR_PATH}/${file.name}_failed_${Date.now()}.json`,
                    directory: Directory.Documents
                });
            }
        }
      }

      return ingestedCount;

    } catch (e) {
      console.error('FileWatcher Scan Error:', e);
      return 0;
    }
  }
};
