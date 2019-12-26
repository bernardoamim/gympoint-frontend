import styled from 'styled-components';

export const Container = styled.table`
  width: 100%;
  background: #fff;
  border-radius: 4px;
  color: #444;

  tr {
    display: grid;
    grid-template-columns: ${props => props.template};
  }
`;
