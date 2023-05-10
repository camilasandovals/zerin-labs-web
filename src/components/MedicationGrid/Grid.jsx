import { Col, Container, Row } from "react-bootstrap"
import Medication from "../MedicationGrid/Medication"
import { useEffect, useState } from "react"

export default function Grid(){
    const [medications, setMedications] = useState()

    useEffect(()=>{
        fetch("http://54.234.48.173:3001/api/medications")
        .then(resp => resp.json())
        .then(setMedications)
        .catch(alert)
    },[])
    
    return(
        <Container>
            <Row>
                {
                    medications.map(
                        (data) => (
                            data
                            ? <Medication data = {data}/>
                            : <p> Loading ...</p>
                        )
                    )
                }
            </Row>
        </Container>
    )
}