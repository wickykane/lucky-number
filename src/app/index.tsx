import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Background, Logo, SpecialPrice } from '../assets/images';
import CongratsBox from '../components/CongratsBox';
import Container from '../components/Container';
import Description from '../components/Description';
import Header from '../components/Header';
import RandomNumber from '../components/RandomNumber';
import TurnRemain from '../components/TurnRemain';
import {
  finalizeLuckyCustomer,
  getActiveEvent,
  getLuckyCustomer,
} from './actions';
import {
  CustomerWinner,
  CustomerWinnerResponse,
  Prize,
  PrizeResponse,
} from './types';

const AppLogo = styled.img`
  width: 300px;
  position: absolute;
  top: 0;
  left: 0;
`;

const PriceImage = styled.img`
  width: 100%;
  position: absolute;
  min-width: 400px;
  top: 0;
  left: -10px;
`;

const PriceContainer = styled.div`
  flex: 1;
  position: relative;
`;

const AppContainer = styled.div`
  padding: 3rem 25%;
  height: 100%;
  min-width: 716px;
  background: #1a3daa url(${Background}) no-repeat center center;
`;

type STATUS_SPIN = 'start' | 'end' | 'result';

const App = () => {
  const [currentWinner, setCurrentWinner] = useState<
    CustomerWinner | undefined
  >();

  const [status, setStatus] = useState<STATUS_SPIN>('start');
  const [currentPrize, setCurrentPrize] = useState<Prize | undefined>();

  const winnerRef = useRef<CustomerWinner>();

  const onStart = () => {
    if (currentPrize) {
      setStatus('end');
      getLuckyCustomer(currentPrize.id).then((res: CustomerWinnerResponse) => {
        setCurrentWinner(res.data);
        winnerRef.current = res.data;
      });
    }
  };

  const onEnd = () => {
    const currentWinner = winnerRef.current;
    if (currentPrize && currentWinner) {
      const params = {
        prize_id: currentPrize.id,
        customer_id: currentWinner.customer_id,
        customer_prize_code_id: currentWinner.id,
        location_type: currentWinner.location_type,
      };

      finalizeLuckyCustomer(params).then(() => {
        setStatus('result');
        fetchCurrentPrize();
      });
    }
  };

  const today = new Date();

  const fetchCurrentPrize = () => {
    getActiveEvent().then((res: PrizeResponse) => {
      setCurrentPrize(res.data.current_prize);
    });
  };

  useEffect(() => {
    fetchCurrentPrize();
  }, []);

  return (
    <AppContainer>
      <AppLogo src={Logo} />
      <Header>
        Lễ quay số may mắn
        <Description>{`Tp Hồ Chí Minh, ngày ${today.getDate()} tháng ${today.getMonth()} năm ${today.getFullYear()}`}</Description>
      </Header>
      <Container flex>
        <CongratsBox winner={currentWinner} status={status}></CongratsBox>
        <PriceContainer>
          <PriceImage src={SpecialPrice} />
        </PriceContainer>
      </Container>
      <Container style={{ marginTop: '1rem' }}>
        <RandomNumber
          status={status}
          customer={currentWinner}
          onStart={onStart}
          onEnd={onEnd}
        />
      </Container>
      <Container style={{ marginTop: '1rem' }}>
        <TurnRemain
          remain={currentPrize?.num_of_winer_remain || 0}
        ></TurnRemain>
      </Container>
    </AppContainer>
  );
};

export default App;
