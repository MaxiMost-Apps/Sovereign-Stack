import { Preferences } from '@capacitor/preferences';

const FOLDER_ID_KEY = 'sovereign_folder_id';
const FOLDER_NAME_KEY = 'sovereign_folder_name';

export const DriveService = {
  async getTargetFolder() {
    const { value: folderId } = await Preferences.get({ key: FOLDER_ID_KEY });
    if (folderId) return folderId;

    const { value: folderName } = await Preferences.get({ key: FOLDER_NAME_KEY });
    // In production, this would call Google Drive API to find/create folder
    return folderName || 'Maximost';
  },

  async setStealthMode(enabled: boolean, customName: string) {
    if (enabled) {
      await Preferences.set({ key: FOLDER_NAME_KEY, value: customName });
      await Preferences.remove({ key: FOLDER_ID_KEY }); // Reset ID to force re-search
    } else {
      await Preferences.set({ key: FOLDER_NAME_KEY, value: 'Maximost' });
    }
  }
};
