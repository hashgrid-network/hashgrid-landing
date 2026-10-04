export interface AppUpdateInfo {
  hasUpdate: boolean;
  latestVersion: string;
  currentVersion: string;
  updateUrl: string;
  releaseNotes: string[];
  mandatory: boolean;
}

export const APP_UPDATE_CONFIG: AppUpdateInfo = {
  hasUpdate: false,
  latestVersion: '1.0.1',
  currentVersion: '1.0.1',
  updateUrl: '#',
  releaseNotes: [
    'Genesis Phase 1 Cloud Mining Engine activated',
    'Optimized server-side zero-battery tap-to-mine routine',
    'Instant referral reward auto-application and 10% hashrate boost',
    'Enhanced security and 2FA wallet protection'
  ],
  mandatory: false,
};

export class AppUpdateManager {
  private static instance: AppUpdateManager;
  public static readonly UPDATE_URL = '#';

  public static getInstance(): AppUpdateManager {
    if (!AppUpdateManager.instance) {
      AppUpdateManager.instance = new AppUpdateManager();
    }
    return AppUpdateManager.instance;
  }

  public getUpdateUrl(): string {
    return AppUpdateManager.UPDATE_URL;
  }

  public openUpdateUrl(): void {
    // Disabled
  }

  public checkForUpdates(): Promise<AppUpdateInfo> {
    return Promise.resolve(APP_UPDATE_CONFIG);
  }
}
