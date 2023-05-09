import Grid from "../components/MedicationGrid/Grid"
import TestAddMedication from "../components/TestAddMedi"

export default function Home(){
    return(
        <>
            <TestAddMedication />
            <Grid />
            <button>Logout</button>
        </>
    )
}