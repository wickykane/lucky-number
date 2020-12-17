import styled from 'styled-components';

const Button = styled.button`
  background-color: #fea900;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  padding: 1rem;
  color: #fff;
  text-shadow: 1px 1px 1px #333;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 0px 8px 6px rgba(0, 0, 0, 0.2);
  &:active {
    opacity: 0.8;
  }
  &:hover {
    opacity: 0.9;
  }
`;

export default Button;
