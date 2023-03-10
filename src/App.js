import styled from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import SigninPage from "./routes/SigninPage";
import SignupPage from "./routes/SignupPage";
import TimeLine from "./routes/TimeLine";
import UserTimeLine from "./routes/UserTimeLine.jsx"
import TagPage from "./routes/TagPage";

export default function App() {
  return (
    <AuthProvider>
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SigninPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route path="/timeline" element={<TimeLine />} />
            <Route path="/hashtag/:tag" element={<TagPage />} />
             <Route path="/user/:id" element={<UserTimeLine />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </AuthProvider>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100vw;
  overflow-y: scroll;
  flex-direction: column;
  background-color: #333333;
`;
