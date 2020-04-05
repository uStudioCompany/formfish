import { ReactElement } from 'react';

export interface FieldProps {
  /**
   * Only acceptable type of children is that containing value and onChange props inside of it.
   * This allows to properly register and validate input in a Form
   */
  children: ReactElement;
  /**
   * Name of the Field
   */
  name: string;
  /**
   * Index to be accepted when used inside of an array
   */
  index?: number;
  /**
   * Properties to overwride default accessed props on input
   */
  getters?: {
    /**
     * Input's value prop title
     */
    value?: string;
    /**
     * Input's defaultValue prop title
     */
    defaultValue?: string;
    /**
     *  Input's onChange prop title
     */
    onChange?: string;
  };
}
