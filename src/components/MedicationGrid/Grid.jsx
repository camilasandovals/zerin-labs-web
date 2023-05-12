import { Col, Container, Row } from "react-bootstrap"
import Medication from "../MedicationGrid/Medication"
import { useContext } from "react"
import { MedicationsContext } from "../../App"

export default function Grid(){
    const [medications, setMedications] = useContext(MedicationsContext)
    
    return(
        <Container>
            <Row>
                {
                    medications?.map(
                        (data) => (
                            data
                            ? <Medication key={data._id} data={data}/>
                            : <p> Loading ...</p>
                        )
                    )
                }
            </Row>
        </Container>
    )
}