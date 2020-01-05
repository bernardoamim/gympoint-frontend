import styled from 'styled-components';
import MdKeyboardArrowDown from '~/assets/MdKeyboardArrowDown.svg';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  max-width: 800px;
  margin: 40px auto 0;

  form {
    width: 100%;

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

      aside {
        display: flex;
        flex-direction: row;
      }
    }

    article {
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

      input,
      select {
        height: 44px;
        padding: 0 15px;
        border-radius: 4px;
        border: 1px solid #ddd;
        color: #999;
        background-color: #fff;
        font: 'Roboto-Regular';
        font-weight: 300;
        line-height: 19px;
        letter-spacing: 2;
        font-size: 16px;
        margin-bottom: 20px;

        &:disabled {
          background-color: #f5f5f5;
        }
      }

      [type='date']::-webkit-calendar-picker-indicator {
        opacity: 0;

        &:hover {
          opacity: 0;
        }
      }

      [type='date']::-webkit-inner-spin-button {
        display: none;
      }

      span {
        color: #4d85ee;
        font-size: 12px;
        margin: -10px 0 10px 10px;
        align-self: flex-start;
      }

      footer {
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: row;

        > span {
          flex: 1;
          margin: 0;
          width: 100%;

          &:not(:last-child) {
            padding-right: 15px;
          }

          > select {
            padding: 0 15px;
            width: 100%;
          }

          > input:disabled {
            padding: 0 15px;
            width: 100%;
          }

          div {
            > div {
              > input {
                width: 100%;
                padding: 0 15px;
              }
            }
          }

          input {
            &:not(:disabled) {
              appearance: none;
              background-image: url(${MdKeyboardArrowDown});
              background-repeat: no-repeat;
              background-position: right 0.7em top 50%, 0 0;
            }
          }
        }

        .react-datepicker-wrapper {
          z-index: 10;
        }
      }
    }
  }
`;
