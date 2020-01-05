import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';
import {
  Container,
  Content,
  NavContainer,
  NavLinkElm,
  Profile,
} from './styles';
import leftdb from '~/assets/Dumbbell@3x/leftdb@3x.png';
import rightdb from '~/assets/Dumbbell@3x/rightdb@3x.png';

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const subject = useSelector(state => state.subject.subject);
  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={leftdb} alt="left-dumbbell" />
          <img src={rightdb} alt="right-dumbbell" />
          <Link to="/home">GYMPOINT</Link>
        </nav>

        <NavContainer>
          <NavLinkElm
            active={subject === 'student' ? 'true' : undefined}
            to="/home"
          >
            ALUNOS
          </NavLinkElm>
          <NavLinkElm
            active={subject === 'plan' ? 'true' : undefined}
            to="/plans"
          >
            PLANOS
          </NavLinkElm>
          <NavLinkElm
            active={subject === 'inscription' ? 'true' : undefined}
            to="/inscriptions"
          >
            MATRÍCULAS
          </NavLinkElm>
          <NavLinkElm
            active={subject === 'order' ? 'true' : undefined}
            to="/help-orders"
          >
            PEDIDOS DE AUXÍLIO
          </NavLinkElm>
        </NavContainer>

        <aside>
          <Profile>
            <div>
              <strong>{user.name}</strong>
              <button type="button" onClick={handleSignOut}>
                sair do sistema
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
