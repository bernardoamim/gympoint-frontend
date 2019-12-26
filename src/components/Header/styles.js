import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  background-color: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;
    height: 60%;
    margin-right: 32px;
    padding-right: 32px;
    border-right: 1px solid #ddd;

    img {
      width: 28px;
      height: 24px;
      &:last-of-type {
        margin-left: -5px;
      }

      &:first-of-type {
        margin-right: -5px;
      }
    }

    a {
      color: #ee4d64;
      font-weight: bold;
      margin-left: 20px;
      font-size: 15px;
      line-height: 18px;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const NavContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  font-weight: 500;

  /* a {
    color: #999;
    padding: 0 10px;
    font-size: 15px;

    &.active {
      color: #444;
    }
  } */
`;

export const NavLinkElm = styled(NavLink)`
  padding: 0 10px;
  font-size: 15px;
  color: ${props => (props.active ? '#444' : '#999')};
`;

export const Profile = styled.div`
  display: flex;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #666;
      font-weight: 500;
      font-size: 14px;
    }

    button {
      display: block;
      margin-top: 4px;
      font-size: 14px;
      color: #de3b3b;
      border: none;
    }
  }

  img {
    height: 32px;
    width: 32px;
    border-radius: 50%;
  }
`;
