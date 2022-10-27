import styled from "styled-components";
import Header from "../Header/Header";

function Layout({ children }) {
  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  );
}

export default Layout;

const Wrapper = styled.div`
  padding-top: 44px;
  font-weight: 600;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 1500px) {
    max-width: 1000px;
  }
`;
