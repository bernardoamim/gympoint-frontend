import styled from 'styled-components';

export const Container = styled.table`
  width: 100%;
  background: #fff;
  border-radius: 4px;
  color: #444;
  padding: 20px 24px;

  tr {
    display: grid;
    grid-template-columns: ${props => props.template};
  }

  thead tr {
    width: 100%;

    th {
      font-size: 16px;
      color: #444;
      line-height: 19px;
      padding: 12px;
      text-align: left;

      &:first-of-type {
        padding-left: 0;
      }

      &.centerHead {
        text-align: center;
        /* padding-left: 0; */
      }
    }
  }

  tbody tr {
    &:not(:last-child) {
      border-bottom: 1px solid #f0f0f0;
    }
  }

  tbody td {
    text-align: left;
    padding: 15px 12px;
    font-size: 16px;
    color: #666666;

    &:first-of-type {
      padding-left: 0;
    }
    /*
    &:nth-of-type(3) {

    } */

    &.centerData {
      text-align: center;
    }

    &.alignRight {
      text-align: right;
      width: 100%;
      padding-right: 0;
      padding-left: 0;
    }

    &:last-of-type {
      padding-right: 0;
    }

    button {
      background: transparent;
      border: 0;

      &.editBtn {
        color: #4d85ee;
      }

      &.deleteBtn {
        color: #de3b3b;
      }
    }
  }
`;
