import { Container, Row, Col, Button } from "react-bootstrap";
import { useState, useContext } from "react";
import { MedicationsContext } from "../App"
import AddMedForm from "../components/AddMed/AddMedForm";

export default function Medication() {
    const [medications, setMedications] = useContext(MedicationsContext);

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:3001/api/medications/${id}`, {
            method: "DELETE",
        })
        const data = await response.json();
        setMedications(data);
    }

    return(
        <>
            <Container>
                <Row>
                    <Col md={4}>
                        <AddMedForm />
                        <Button>Delete</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}