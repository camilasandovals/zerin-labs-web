import { useState, createContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './scenes/Home';
import SignUp from './scenes/SignUp';
import Login from './scenes/Login';
import Landing from './scenes/Landing';
import MedDetails from './scenes/MedDetails';
import MedsHistoryGrid from './scenes/MedsHistoryGrid';

import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

export const MedicationsContext = createContext(null)
export const SelectedMedicationContext = createContext(null)
export const UserContext = createContext(null);
function App() {
  const [medications, setMedications] = useState()
  const [selectedMedication, setSelectedMedication] = useState()
  const [user, setUser] = useState();

  return (
    <div className="App">
      <UserContext.Provider value={[user, setUser]}>
        <SelectedMedicationContext.Provider value={[selectedMedication, setSelectedMedication]}>
          <MedicationsContext.Provider value = {[medications, setMedications]}>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/home' element={<Home />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/login' element={<Login />} />
                <Route path="/medications/:id" element={<MedDetails />} />
                <Route path="/medications/" element={<MedsHistoryGrid />} />
              </Routes>
            </BrowserRouter>
          </MedicationsContext.Provider>
        </SelectedMedicationContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
