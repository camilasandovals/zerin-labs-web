import { Container, Row } from "react-bootstrap"
import { useContext, useEffect } from "react"
import { MedicationsContext, UserContext } from "../App"
import HistoryCard from "../components/HistoryCard/HistoryCard"

export default function MedsHistoryGrid(){
    const [medications, setMedications] = useContext(MedicationsContext)
    const [user, setUser] = useContext(UserContext)
    
    useEffect(() => {
        if (user) {  
          fetch(`http://3.95.14.19:3001/api/medications/?email=${user.email}`)
            .then((resp) => resp.json())
            .then(setMedications)
            .catch(alert);
        }
      }, [user]);

    return(
        <>
        {/* <Container>
            <Row>
                {medications.endDate == //..........
                    medications?.map(
                        (data) => (
                            data
                            ? <HistoryCard key={data._id} data={data}/>
                            : <p> </p>
                        )
                    )
                }
            </Row>
        </Container> */}
        <h1>Medication History</h1>
        <section className="medication-grid-container">
            
            {
                medications?.map(
                    (data) => (
                        data
                        ? <HistoryCard key={data._id} data={data}/>
                        : <p> </p>
                    )
                )
            }
        </section>
        </>
    )
}