import type { FieldProps } from './field.types';

const replacer = (key: string, value: { props: any }): any => {
  if (typeof value === 'object' && 'props' in value) {
    return value.props;
  }

  return value;
};

export const compareProps = (prevProps: FieldProps, nextProps: FieldProps): boolean => {
  return JSON.stringify(prevProps, replacer) === JSON.stringify(nextProps, replacer);
};
