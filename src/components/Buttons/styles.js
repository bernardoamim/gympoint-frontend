import styled from 'styled-components';
import { darken } from 'polished';

export const SecondaryButton = styled.button`
  background: #ccc;
  color: #fff;
  border: 0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 8px 15px;
  margin-left: 20px;

  &:hover {
    background: ${darken(0.08, '#ccc')};
  }

  span {
    text-transform: uppercase;
    font-weight: 500;
    font-size: 14px;
    text-align: center;
    margin-left: 10px;
  }
`;

export const PrimaryButton = styled.button.attrs({
  type: 'submit',
})`
  background: #ee4d64;
  color: #fff;
  border: 0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 8px 15px;
  margin-left: 20px;

  &:hover {
    background: ${darken(0.03, '#ee4d64')};
  }

  span {
    text-transform: uppercase;
    font-weight: 500;
    font-size: 14px;
    text-align: center;
    margin-left: 10px;
  }
`;
