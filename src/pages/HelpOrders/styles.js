import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 700px;
  margin: 40px auto 0;

  header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 20px 0;

    strong {
      font-size: 24px;
      line-height: 28px;
      color: #444;
      font-weight: bold;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: #fff;
    border-radius: 4px;
    max-width: 100%;

    p {
      text-align: left;
      font-size: 14px;
      color: #444;
      font: 'Roboto-Regular';
      font-weight: 500;
      padding: 0 1px 10px;
      line-height: 16px;
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
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  form {
    display: flex;
    flex-direction: column;

    strong {
      color: #444;
      font-size: 14px;
      line-height: 19px;
      margin-bottom: 8px;
    }

    > p {
      color: #666;
      line-height: 26px;
      font-weight: 300;
      font-size: 16px;
      min-height: 130px;
      height: auto;
      max-width: 100%;
    }

    textarea {
      display: flex;
      color: #999;
      font-size: 16px;
      line-height: 21px;
      font-weight: 300;
      height: auto;
      min-height: 130px;
      margin-bottom: 15px;
      border: 1px solid #ddd;
      border-radius: 4px;
      resize: none;
      padding: 8px 12px;
      overflow-wrap: break-word;
      word-wrap: break-word;
      hyphens: auto;
      width: 100%;

      &::placeholder {
        align-self: flex-start;
      }
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

    span {
      color: #4d85ee;
      font-size: 12px;
      margin: -10px 0 10px 10px;
      align-self: flex-start;
    }
  }
`;

export const ModalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.7)',
  },
  content: {
    position: 'absolute',
    margin: 'auto auto',
    maxWidth: '450px',
    width: '40%',
    minWidth: '400px',
    height: '425px',
    border: '1px solid #ddd',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',
  },
};
