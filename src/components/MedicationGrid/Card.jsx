import { useState, useContext } from "react";
import { MedicationsContext, UserContext } from "../../App";
import { Col, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { CheckCircleFill, TextCenter } from "react-bootstrap-icons";
import "./styles.css";

export default function MedicationCard({ data }) {
  const [medications, setMedications] = useContext(MedicationsContext);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useContext(UserContext);

  const navigate = useNavigate();

  const handleMedTaken = async (id) => {
    const response = await fetch(
      `http://3.95.14.19:3001/api/medications/${id}?email=${user.email}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ show: false }),
      }
    );
    // {medications:medications, user:thisUser}
    const data = await response.json();
    setMedications(data.medications);
    setUser(data.user)
  };

  const background = [];
  // console.log("{data.medImg}", data.medImg);
  return (
    <Col className="d-flex justify-content-center ">
      <div className="card-wrapper">
        <img
          className="medication-card-image"
          src={data.medImg}
          onClick={() => navigate(`/medications/${data._id}`)}
          alt="Overlay"
        />

        <div className="medication-card-content">
          <h2>{data.nameMed}</h2>
          <p>
            <span>Qtty:</span> {data.quantity}
          </p>
          <p>
            <span>Dosage:</span> {data.dosage} {data.unit}
          </p>
          <p>
            <span>Frecuency:</span> {data.frequency}
          </p>
          <button className="medication-card-done-button"  onClick={() => handleMedTaken(data._id)}>
            <h2 style={{marginBottom: 0}}>Taken!</h2></button>
        </div>
      </div>
      
    </Col>
  );
}
