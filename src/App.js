import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useState, createContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./scenes/Home";
import SignUp from "./scenes/SignUp";
import Login from "./scenes/Login";
import Landing from "./scenes/Landing";
import MedDetails from "./scenes/MedDetails";
import MedsHistoryGrid from "./scenes/MedsHistoryGrid";
import User from "./scenes/User";
import { Navbar } from "react-bootstrap";
import MenuBar from "./components/Header/MenuBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

const firebaseConfig = {
  apiKey: "AIzaSyCaj2yp6o3IUmnuEqtrrYjwitTElPe6AMY",
  authDomain: "zerin-labs.firebaseapp.com",
  projectId: "zerin-labs",
  storageBucket: "zerin-labs.appspot.com",
  messagingSenderId: "7317186784",
  appId: "1:7317186784:web:2bc91b599ed45c92498885",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const MedicationsContext = createContext(null);
export const SelectedMedicationContext = createContext(null);
export const UserContext = createContext(null);

function App() {
  const [medications, setMedications] = useState();
  const [selectedMedication, setSelectedMedication] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    const oldUser = localStorage.getItem("user");
    if (oldUser) {
      setUser(JSON.parse(oldUser));
      console.log("HERE IS THE USER")
      console.log(user)
    }
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={[user, setUser]}>
        <MedicationsContext.Provider value={[medications, setMedications]}>
          <SelectedMedicationContext.Provider
            value={[selectedMedication, setSelectedMedication]}
          >
            <MenuBar />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/medications/:id" element={<MedDetails />} />
                <Route path="/medications/" element={<MedsHistoryGrid />} />
                <Route path="/user/" element={<User />} />
              </Routes>
            </BrowserRouter>
          </SelectedMedicationContext.Provider>
        </MedicationsContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
