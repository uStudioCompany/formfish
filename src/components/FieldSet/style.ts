import styled, { css } from 'styled-components';

const Wrapper = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0;
`;

const FieldSet = styled.div(
  ({ dataDirection }: { dataDirection: 'row' | 'column' }) => css`
    display: grid;
    grid-auto-flow: ${dataDirection === 'row' ? 'column' : 'row'};
    grid-gap: 1rem;
    align-content: center;

    margin: 0;
    padding: 0;
    border: none;
  `
);

export default { Wrapper, FieldSet };
