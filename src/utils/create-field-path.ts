import { createFieldName } from './create-field-name';

/**
 * @internal
 * Creates a path for a field to be used in input registration process
 *
 * @param path Concatenated path received from parent
 * @param name Field name
 * @param index If the Field is rendered inside an array in must receive an index
 * to properly create its path
 * @param nameSeparator Custom name separator from Form settings
 * @return Returns a path with either an array index or dot-notation property
 * at the end of a string
 */
export const createFieldPath = ({
  path,
  name,
  index,
  nameSeparator
}: {
  path: string;
  name: string;
  index?: number;
  nameSeparator: string;
}): string => {
  return typeof index === 'number' ? `${path}[${index}]` : `${path}.${createFieldName(name, nameSeparator)}`;
};
