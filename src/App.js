import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import SigninPage from "./routes/SigninPage";
import SignupPage from "./routes/SignupPage";
import TimeLine from "./routes/TimeLine";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SigninPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/timeline" element={<TimeLine />} />
         {/* </Routes> <Route path="/user/:id" element={</>}/> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
