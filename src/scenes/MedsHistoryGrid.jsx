import { Container, Row } from "react-bootstrap"
import { useContext, useEffect } from "react"
import { MedicationsContext, UserContext } from "../App"
import HistoryCard from "../components/HistoryCard/HistoryCard"

export default function MedsHistoryGrid(){
    const [medications, setMedications] = useContext(MedicationsContext)
    const [user, setUser] = useContext(UserContext)
    
    useEffect(() => {
        if (user) {  
          fetch(`${process.env.REACT_APP_APIENDPOINT}/api/medications/?email=${user.email}`)
            .then((resp) => resp.json())
            .then(setMedications)
            .catch(alert);
        }
      }, [user]);

    return(
        <>

        <h1 className="mt-4" >Medication History</h1>
        <section className="medication-grid-container">

            {medications?.length === 0 && (
                <div className="no-medications">
                    <h2>No medications found</h2>
                </div>
            )}
            
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