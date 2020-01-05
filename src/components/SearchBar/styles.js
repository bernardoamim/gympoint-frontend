import styled from 'styled-components';

export const Bar = styled.label`
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ddd;
  padding: 8px 15px;
  align-items: center;
  margin-left: 15px;

  input {
    border: 0;
    font-size: 14px;
    line-height: 16px;
    color: #999;
    font-weight: normal;
    padding-left: 8px;
    font-family: 'Roboto', sans-serif;
    width: 25%;
    min-width: 200px;
  }
`;
