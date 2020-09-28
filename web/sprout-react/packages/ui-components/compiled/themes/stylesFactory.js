import memoizeOne from 'memoize-one';
// import { KeyValue } from '@grafana/data';
/**
 *  Creates memoized version of styles creator
 * @param stylesCreator function accepting dependencies based on which styles are created
 */
export function stylesFactory(stylesCreator) {
    return memoizeOne(stylesCreator);
}
//# sourceMappingURL=stylesFactory.js.map