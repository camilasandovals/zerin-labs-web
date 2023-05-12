import { useState, createContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './scenes/Home';
import SignUp from './scenes/SignUp';
import Login from './scenes/Login';
import Landing from './scenes/Landing';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

export const UserMedications = createContext(null)

function App() {
  const [medications, setMedications] = useState()

  return (
    <div className="App">
      <UserMedications.Provider value = {[medications, setMedications]}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/home' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
      </UserMedications.Provider>
    </div>
  );
}

export default App;
