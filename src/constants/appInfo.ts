export interface AppInfo {
  version: string;
  buildNumber?: number;
  lastUpdate: string;
  releaseNotes?: string;
  minRequiredVersion?: string;
}

export const APP_INFO: AppInfo = {
  version: '1.0.0',
  lastUpdate: new Date('2026-02-02').toISOString(),
};
