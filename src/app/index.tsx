import React from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import CongratsBox from '../components/CongratsBox';
import Container from '../components/Container';
import Description from '../components/Description';
import Header from '../components/Header';
import TurnRemain from '../components/TurnRemain';

const AppContainer = styled.div`
  background-color: #1a3daa;
  padding: 3rem 25%;
  height: 100%;
  min-width: 716px;
`;

const ActionButton = styled(Button)`
  font-size: 2.2rem;
  border-radius: 8px;
  padding: 1.5rem 6rem;
`;

const App = () => {
  return (
    <AppContainer>
      <Header>
        Lễ quay số may mắn
        <Description>Tp Hồ Chí Minh, ngày 01 tháng 01 năm 2021</Description>
      </Header>
      <Container>
        <CongratsBox></CongratsBox>
      </Container>
      <Container>
        <ActionButton>Quay số</ActionButton>
      </Container>
      <Container style={{ marginTop: '1rem' }}>
        <TurnRemain></TurnRemain>
      </Container>
    </AppContainer>
  );
};

export default App;
