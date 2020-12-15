import styled from 'styled-components';

const Text = styled.span`
  display: inline-block;
  vertical-align: middle;
`;

const Container = styled.div`
  background: #fff;
  padding: 1rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  max-width: 200px;
`;

const Counter = styled.div`
  margin-left: 0.5rem;
  display: flex;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #183aa6;
  color: #fff;
  align-items: center;
  justify-content: center;
`;

const TurnRemain = () => {
  return (
    <Container>
      <Text>Lượt quay còn lại</Text>
      <Counter>
        <span>2</span>
      </Counter>
    </Container>
  );
};
export default TurnRemain;
