import { useState, createContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./scenes/Home";
import Landing from "./scenes/Landing";
import MedDetails from "./scenes/MedDetails";
import MedsHistoryGrid from "./scenes/MedsHistoryGrid";
import User from "./scenes/User";
import MenuBar from "./components/Header/MenuBar";
import ZerinLabs from "./scenes/ZerinLabs"
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

export const MedicationsContext = createContext(null);
export const SelectedMedicationContext = createContext(null);
export const UserContext = createContext(null);

function App() {
  const [medications, setMedications] = useState();
  const [selectedMedication, setSelectedMedication] = useState();
  const [user, setUser] = useState();


  useEffect(() => {
    const oldUser = localStorage.getItem("user");
    console.log({ oldUser });
    const parsedUser = JSON.parse(oldUser);
    if (parsedUser) {
      setUser(parsedUser);
      console.log("HERE IS THE USER");
      console.log(user);
    }
  
  }, [setUser]);

  return (
    <div className="App">
      <UserContext.Provider value={[user, setUser]}>
        <MedicationsContext.Provider value={[medications, setMedications]}>
          <SelectedMedicationContext.Provider
            value={[selectedMedication, setSelectedMedication]}
          >
            <BrowserRouter>
              <MenuBar />
              <Routes>
                <Route path="/" element={user? <Navigate to="/home" /> : <Landing /> } />
                <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
                <Route path="/medications/:id" element={<MedDetails />} />
                <Route path="/medications/" element={<MedsHistoryGrid />} />
                <Route path="/user/" element={<User />} />
                <Route path="/labs" element={<ZerinLabs />}/>
              </Routes>
            </BrowserRouter>
          </SelectedMedicationContext.Provider>
        </MedicationsContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
