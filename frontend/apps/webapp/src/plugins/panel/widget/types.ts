export interface WidgetPanelOptions {
  dataSourceId: string
  dataId: string
}

export type WidgetDataType = 'MARKDOWN' | 'MARKUP' | 'JSON'

export interface WidgetData {
    id: string;
    name: string;
    dataType: WidgetDataType;
    data: any;
}
