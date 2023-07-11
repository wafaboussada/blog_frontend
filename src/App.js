import { Route, Routes } from 'react-router-dom';

import './App.css';
import Register from './components/register';
import Login from './components/login';
import Home from './components/home';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />}/>
    </Routes>
  );
}

export default App;
