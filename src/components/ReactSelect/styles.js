import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0;
  padding: 0;

  .react-select {
    width: 100%;
    margin: 0;
    padding: 0;
    color: red;
    height: 44px;

    &::placeholder {
      width: 100px;
    }

    div {
      margin: 0;
      padding: 0;
    }
  }
`;
