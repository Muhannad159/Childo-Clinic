import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { styled } from "styled-components";
import ChatGPT from "../features/chatbot/ChatGPT";
import { FaRobot } from "react-icons/fa";
import { useState } from "react";
const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: auto;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
      {isChatOpen && <ChatGPT onClose={handleCloseChat} />}
      {!isChatOpen && (
        <div className="chat-button-container">
          <button className="chat-button" onClick={handleOpenChat}>
            <FaRobot />
          </button>
        </div>
      )}
    </StyledAppLayout>
  );
}

export default AppLayout;
