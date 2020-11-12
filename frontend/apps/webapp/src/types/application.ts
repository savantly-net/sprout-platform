export interface ApplicationUIProperty {
  createdBy: any;
  createdDate: string;
  id: string;
  lastModifiedBy: any;
  lastModifiedDate: string;
  name: string;
  new: boolean;
  value: string;
  version: number;
}

export interface ApplicationSettingsState {
  [key: string]: any;
}
export interface ApplicationState {
  logActions: boolean;
  themeName: string;
  settings: ApplicationSettingsState;
}
