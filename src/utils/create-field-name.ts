/**
 * @internal
 * Creates a camelCase name for a Field to be used in a Form state object
 *
 * @param name Field name
 * @param separator Custom separator
 */
function createFieldName(name: string, separator = ' ') {
  const arrayFromName = name.toLowerCase().split(separator);
  return `${arrayFromName[0]}${arrayFromName
    .slice(1)
    .map(word => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join('')}`;
}

export default createFieldName;
