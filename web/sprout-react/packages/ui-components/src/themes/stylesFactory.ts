import memoizeOne from 'memoize-one';
// import { KeyValue } from '@savantly/sprout-api';

/**
 *  Creates memoized version of styles creator
 * @param stylesCreator function accepting dependencies based on which styles are created
 */
export function stylesFactory<ResultFn extends (this: any, ...newArgs: any[]) => ReturnType<ResultFn>>(
  stylesCreator: ResultFn
) {
  return memoizeOne(stylesCreator);
}
