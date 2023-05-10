import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './scenes/Home';
import SignUp from './scenes/SignUp';
import Login from './scenes/Login';
import Landing from './scenes/Landing';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/home' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
