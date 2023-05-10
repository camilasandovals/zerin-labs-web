import { Button } from "react-bootstrap"
import Grid from "../components/MedicationGrid/Grid"
import TestAddMedication from "../components/TestAddMedi"
import { useNavigate } from "react-router-dom"
import AddMed from "../components/AddMed";

export default function Home(){
    const navigate = useNavigate();

    return(
        <>
            {/* <TestAddMedication /> */}
            <Grid />
            <AddMed />
            <Button onClick={() => navigate('/login')}>Logout</Button>
        </>
    )
}