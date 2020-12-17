import React from 'react';

import styled from 'styled-components';
import { CustomerWinner } from '../../app/types';
import Header from '../Header';

const Container = styled.div`
  position: relative;
  flex: 1;
  margin: 2rem 0;
  padding: 1rem;
  border-radius: 15px;
  background-color: #fff;
  text-align: center;
  font-size: 1.75rem;
  width: 50%;
  border-radius: 32.5px;
  box-shadow: 0px 8px 0px #ffab01;
  min-height: 200px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const CongratsText = styled.p`
  color: red;
  margin: 0;
  font-size: 22px;
  font-family: Roboto;
`;

const Name = styled(Header)`
  color: #374c9f;
  letter-spacing: normal;
  margin-top: 0.5rem;
  margin-bottom: 0rem;
`;

const Phone = styled(Header)`
  color: #374c9f;
  letter-spacing: normal;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const Address = styled.div`
  color: #374c9f;
  letter-spacing: normal;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-family: Roboto, sans-serif;
  font-size: 20px;
`;

const TEXT = {
  start: 'VUI LÒNG NHẤN NÚT BẮT ĐẦU ĐỂ QUAY SỐ',
  end: 'ĐANG QUAY SỐ VUI LÒNG NHẤN DỪNG',
  result: '',
};

type Props = {
  status: 'start' | 'end' | 'result';
  winner?: CustomerWinner;
};

const CongratsBox = (props: Props) => {
  return props.status === 'result' && props.winner ? (
    <Container>
      <CongratsText>Chúc mừng khách hàng</CongratsText>
      <Name>{props.winner.customer?.name}</Name>
      <Phone>{props.winner.customer?.phone_numer || 'N/A'}</Phone>
      <Address>{props.winner.customer?.address_line || 'N/A'}</Address>
    </Container>
  ) : (
    <Container>
      <Name>{TEXT[props.status] || TEXT.start}</Name>
    </Container>
  );
};

export default CongratsBox;
