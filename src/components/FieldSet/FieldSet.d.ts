import { ReactElement } from 'react';
import { FieldArray, FieldSet } from '../../context/form/FormContext';
import { Watch } from '../../hooks/use-watch';

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
   * A method to access FieldSet state at any time
   */
  watch?: Watch<FieldSet | FieldArray>;
  /**
   * Index to be accepted when used inside of an array
   */
  index?: number;
  /**
   * For extension with styled-components or CSS classes
   */
  className?: string;
}
