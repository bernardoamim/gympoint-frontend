import styled from 'styled-components';

export const Container = styled.section`
  align-self: flex-end;
  display: flex;
  flex-direction: row;
  padding: 10px 0;
  margin-bottom: 30px;
  align-items: center;
`;

export const Button = styled.button`
  color: #444;
  border: 0;
  font-size: 14px;
  line-height: 20px;
  padding: 8px 16px;
  text-decoration: none;
  display: flex;
  background: transparent;
  align-items: center;
  text-align: center;
  margin: 0 2px;

  &.active {
    color: #fff;
    background: #999;
    border-radius: 4px;
  }

  &:hover:not(.active) {
    background-color: #ddd;
    border-radius: 4px;
    color: #fff;
  }

  &:disabled {
    border-radius: 4px;
    color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    cursor: not-allowed;
  }

  &:disabled:hover {
    background: none;
  }

  svg {
    color: ${props => (props.disabled ? '#ccc' : '#444')};
  }
`;
