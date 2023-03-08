import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalContextProvider from './contexts/GlobalContext';
import SigninPage from './routes/SigninPage';
import SignupPage from './routes/SignupPage';
import TimeLine from './routes/TimeLine';

function App() {

  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SigninPage />} />
          <Route path='/sign-up' element={<SignupPage />} />
          <Route path='/timeline' element={<TimeLine />} />
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;
