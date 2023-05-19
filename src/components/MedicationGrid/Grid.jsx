import { Container, Row } from "react-bootstrap";
import MedicationCard from "./Card";
import { useContext } from "react";
import { MedicationsContext } from "../../App";
import "./styles.css";

export default function Grid() {
  const [medications, setMedications] = useContext(MedicationsContext);

  return (
    <section className="medication-grid-container">
      {medications?.map((data) =>
        data.show ? (
          <MedicationCard key={data._id} data={data} />
        ) : (
          <span></span>
        )
      )}
    </section>
  );
}
