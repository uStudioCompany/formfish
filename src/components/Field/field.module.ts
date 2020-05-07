import type { FieldProps } from './field.types';

const replacer = (key: string, value: any): any => {
  if (key === 'children') {
    return undefined;
  }

  return value;
};

export const compareProps = (prevProps: FieldProps, nextProps: FieldProps): boolean => {
  return JSON.stringify(prevProps, replacer) === JSON.stringify(nextProps, replacer);
};
