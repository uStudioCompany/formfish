/**
 * @internal
 * Creates a camelCase name for a Field to be used in a Form state object
 *
 * @param name Field name
 * @param separator Custom separator
 */
export const createFieldName = (name: string, separator: string): string => {
  const splitName = name.split(separator);

  if (splitName.length === 1) {
    return name;
  }

  const lowercaseArray = splitName.map(word => word.toLowerCase());

  return `${lowercaseArray[0]}${lowercaseArray
    .slice(1)
    .map(word => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join('')}`;
};
