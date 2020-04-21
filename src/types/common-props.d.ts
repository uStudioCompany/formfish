import { Watch } from '../hooks/use-watch';

export interface CommonProps {
  /**
   * Name of the Field
   */
  name: string;
  /**
   * A method to access Field state at any time
   */
  watch?: Watch<unknown>;
  /**
   * A function that gets customized value from the input
   */
  getValue?(state: unknown): unknown;
  /**
   * A function that passes customized value back to the input
   */
  setValue?(value: unknown): unknown;
  /**
   * Custom separator for createFieldName function
   */
  nameSeparator?: string;
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
    event?: string;
    /**
     * Identifier to pass to the input
     */
    id?: string | number;
  };
}
