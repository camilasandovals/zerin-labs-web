import { useState, createContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './scenes/Home';
import SignUp from './scenes/SignUp';
import Login from './scenes/Login';
import Landing from './scenes/Landing';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Medication from './scenes/Medication';

export const MedicationsContext = createContext(null)
export const UserContext = createContext(null);
function App() {
  const [medications, setMedications] = useState()
  const [user, setUser] = useState();

  return (
    <div className="App">
      <UserContext.Provider value={[user, setUser]}>
        <MedicationsContext.Provider value = {[medications, setMedications]}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/home' element={<Home />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path="/medication" element={<Medication />} />
          </Routes>
        </BrowserRouter>
        </MedicationsContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
