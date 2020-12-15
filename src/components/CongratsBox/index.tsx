import React from 'react';

import styled from 'styled-components';
import Header from '../Header';

const Container = styled.div`
  position: relative;
  margin: 2rem 0;
  padding: 1rem;
  border-radius: 15px;
  background-color: #fff;
  border-bottom: 6px solid #ffc700;
  text-align: center;
  font-size: 1.75rem;
  width: 50%;
`;

const CongratsText = styled.p`
  color: red;
  margin: 0;
`;

const Name = styled(Header)`
  color: #374c9f;
  letter-spacing: normal;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
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
  font-weight: bold;
`;

const CongratsBox = () => {
  return (
    <Container>
      <CongratsText>Chúc mừng khách hàng</CongratsText>
      <Name>Đào Quang Huy</Name>
      <Phone>0367987481</Phone>
      <Address>113/4/90 Võ Duy Ninh, P22, Bình Thạnh, TpHCM</Address>
    </Container>
  );
};

export default CongratsBox;
