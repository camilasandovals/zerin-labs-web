import { Container, Row } from "react-bootstrap"
import { useContext, useEffect } from "react"
import { MedicationsContext } from "../App"
import HistoryCard from "../components/HistoryCard"

export default function MedsHistoryGrid(){
    const [medications, setMedications] = useContext(MedicationsContext)
    
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
                    medications?.map(
                        (data) => (
                            data
                            ? <HistoryCard key={data._id} data={data}/>
                            : <p> </p>
                        )
                    )
                }
            </Row>
        </Container>
    )
}