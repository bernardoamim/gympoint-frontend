import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  background: #ee4d64;
  height: auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 350px;
  text-align: center;
  background: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: none;
  padding: 40px 20px;
  box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.1);

  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-bottom: 10px;

    img {
      width: 62px;
      height: 53px;
      &:last-of-type {
        margin-left: -12px;
      }

      &:first-of-type {
        margin-right: -12px;
      }
    }
  }

  > strong {
    font-size: 29px;
    color: #ee4d64;
    font-weight: bold;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    p {
      text-align: left;
      font-size: 14px;
      color: #444;
      font: 'Roboto-Regular';
      font-weight: 500;
      padding: 0 1px 10px;
    }

    input {
      height: 44px;
      padding: 0 15px;
      border-radius: 4px;
      border: 1px solid #ddd;
      color: #999;
      font: 'Roboto-Regular';
      font-weight: 300;
      line-height: 19px;
      letter-spacing: 2;
      font-size: 16px;
      margin-bottom: 20px;

      &::placeholder {
        font: 'Roboto-Regular', sans-serif;
        color: #999;
        line-height: 19px;
        letter-spacing: 2;
        font-size: 16px;
        padding-bottom: 0 !important;
      }
    }

    span {
      color: #4d85ee;
      font-size: 12px;
      margin: -10px 0 10px 10px;
      align-self: flex-start;
    }

    button {
      border: none;
      height: 44px;
      border-radius: 4px;
      background: #ee4d64;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#ee4d64')};
      }

      > span {
        font: 'Roboto-Regular', sans-serif;
        font-size: 16px;
        line-height: 19px;
        font-weight: 500;
        flex: 1;
        color: white;
      }
    }
  }
`;
