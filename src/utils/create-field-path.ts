import createFieldName from './create-field-name';

/**
 * @internal
 * Creates a path for a field to be used in input registration process
 *
 * @param path Concatenated path received from parent
 * @param name Field name
 * @param index If the Field is rendered inside an array in must receive an index
 * to properly create its path
 * @return Returns a path with either an array index or dot-notation property
 * at the end of a string
 */
const createFieldPath = ({ path, name, index }: { path: string; name: string; index?: number }): string => {
  return typeof index === 'number' ? `${path}[${index}]` : `${path}.${createFieldName(name)}`;
};

export default createFieldPath;
