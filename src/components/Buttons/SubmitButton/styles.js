import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Button = styled.button`
  background: ${props => (props.loading ? lighten(0.5, '#ee4d64') : '#ee4d64')};
  color: #fff;
  border: 0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 8px 15px;
  margin-left: 20px;

  &:hover {
    background: ${darken(0.03, '#ee4d64')};
    cursor: ${props => (props.loading ? 'notAllowed' : 'pointer')};
  }

  span {
    text-transform: uppercase;
    font-weight: 500;
    font-size: 14px;
    text-align: center;
    margin-left: 10px;
  }
`;
