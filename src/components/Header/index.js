import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';
import { Container, Content, NavContainer, Profile } from './styles';
import leftdb from '~/assets/Dumbbell@3x/leftDb@3x.png';
import rightdb from '~/assets/Dumbbell@3x/rightDb@3x.png';

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={leftdb} leftDb alt="" />
          <img src={rightdb} alt="" />
          <Link to="/home">GYMPOINT</Link>
        </nav>

        <NavContainer>
          <NavLink to="/home">ALUNOS</NavLink>
          <NavLink to="/plans">PLANOS</NavLink>
          <NavLink to="/inscriptions">MATRÍCULAS</NavLink>
          <NavLink to="orders">PEDIDOS DE AUXÍLIO</NavLink>
        </NavContainer>

        <aside>
          <Profile>
            <div>
              <strong>{user.name}</strong>
              <button type="button" onClick={handleSignOut}>
                Sair do GoBarber
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
