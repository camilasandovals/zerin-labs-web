import { Container, Row } from "react-bootstrap"
import MedicationCard from "./Card"
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
                            data.show
                            ? <MedicationCard key={data._id} data={data}/>
                            : <span></span>
                        )
                    )
                }
            </Row>
        </Container>
    )
}