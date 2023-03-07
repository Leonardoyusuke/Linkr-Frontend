import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SigninPage from './routes/SigninPage';
import SignupPage from './routes/SignupPage';

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SigninPage />} />
        <Route path='/sign-up' element={<SignupPage />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
