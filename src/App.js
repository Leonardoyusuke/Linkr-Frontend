import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import SigninPage from "./routes/SigninPage";
import SignupPage from "./routes/SignupPage";
import TimeLine from "./routes/TimeLine";
import UserTimeLine from "./routes/UserTimeLine.jsx"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SigninPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/timeline" element={<TimeLine />} />
          <Route path="/user/:id" element={<UserTimeLine />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
