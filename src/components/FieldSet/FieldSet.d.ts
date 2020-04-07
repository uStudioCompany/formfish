import { ReactElement } from 'react';
import { FieldArray, FieldSet } from '../../context/form/FormContext';
import { Watch } from '../../hooks/use-watch';
import { CommonProps } from '../../types';

export interface FieldSetProps extends CommonProps {
  /**
   * FieldSet children can be anything with any depth of nesting, but should include either FieldSets of Fields inside
   * If used as an array, should pass an index to any Field or FieldSet inside
   */
  children: ReactElement | ReactElement[];
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
