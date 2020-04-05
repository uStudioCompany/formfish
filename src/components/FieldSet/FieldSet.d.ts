import { ReactElement } from 'react';

export interface FieldSetProps {
  /**
   * FieldSet children can be anything with any depth of nesting, but should include either FieldSets of Fields inside
   * If used as an array, should pass an index to any Field or FieldSet inside
   */
  children: ReactElement | ReactElement[];
  /**
   * Name of the FieldSeet
   */
  name: string;
  /**
   * Index to be accepted when used inside of an array
   */
  index?: number;
  /**
   * Indicates that every Field inside this FieldSet should be disabled
   */
  isDisabled?: boolean;
  /**
   * For extension with styled-components or CSS classes
   */
  className?: string;
}
