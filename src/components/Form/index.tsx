import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { object } from 'yup';
import FormContextProvider, { FormContext } from '../../context/form';
import { PathContext } from '../../context/path';
import { createFieldName } from '../../utils';
import { FormProps } from './Form';

import Styled from './styled';

const Form: React.FC<InferProps<FormProps>> = ({
  children: form,
  name,
  onSubmit,
  schema,
  className = ''
}) => {
  return (
    <FormContextProvider>
      <FormContext.Consumer>
        {({ getState, validate }) => (
          <Styled.Form
            id={name}
            className={className}
            onSubmit={event => {
              event.preventDefault();

              if (schema) {
                validate(
                  object({
                    [name]: object(schema)
                  })
                );
              }

              onSubmit(getState());
            }}
          >
            <PathContext.Provider
              value={{
                path: createFieldName(name)
              }}
            >
              {form}
            </PathContext.Provider>
          </Styled.Form>
        )}
      </FormContext.Consumer>
    </FormContextProvider>
  );
};

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired,
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  schema: PropTypes.object,
  className: PropTypes.string
};

Form.defaultProps = {
  className: ''
};

export default Form;
