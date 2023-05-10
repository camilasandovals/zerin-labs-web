import { Button } from "react-bootstrap"
import Grid from "../components/MedicationGrid/Grid"
import TestAddMedication from "../components/TestAddMedi"
import { useNavigate } from "react-router-dom"

export default function Home(){
    const navigate = useNavigate();

    return(
        <>
            <TestAddMedication />
            <Grid />
            <Button onClick={() => navigate('/login')}>Logout</Button>
        </>
    )
}