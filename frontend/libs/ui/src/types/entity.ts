import { FormikHelpers } from 'formik';

export type EntityPageName = 'list' | 'view' | 'edit' | 'create';

export type EntityPageTitleProvider<E> = ({ item, pageName }: { item?: E; pageName: EntityPageName }) => string;
export type EntityPageSubTitleProvider<E> = ({ item, pageName }: { item?: E; pageName: EntityPageName }) => string;
export type EntityPageIconProvider<E> = ({ item, pageName }: { item?: E; pageName: EntityPageName }) => string;

export interface ItemEditorProps<T> {
  item?: T;
  afterSave: (item: T, helpers: FormikHelpers<T>) => void;
}
