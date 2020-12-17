import styled from 'styled-components';

const Container = styled.div<{ flex?: boolean }>`
  ${props => props.flex && `display: flex;`}
`;

export default Container;
