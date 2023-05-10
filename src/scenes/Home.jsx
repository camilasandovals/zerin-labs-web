import { Button, Modal } from "react-bootstrap"
import Grid from "../components/MedicationGrid/Grid"
import { useNavigate } from "react-router-dom"
import AddMed from "../components/AddMed";
import { PlusCircleFill } from "react-bootstrap-icons"
import { useState } from "react";

export default function Home(){
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

  
    return(
        <>
            {/* <TestAddMedication /> */}
            <Grid />
            <AddMed />
            <Button onClick={() => navigate('/login')}>Logout</Button>
            

        </>
    )
}
