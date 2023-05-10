import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { Button, Modal } from "react-bootstrap"
import Grid from "../components/MedicationGrid/Grid"
import { PlusCircleFill } from "react-bootstrap-icons"

export default function AddMed() {
    const [showModal, setShowModal] = useState(false);
  return (
    <>
    <PlusCircleFill size={60} color={"violet"} onClick={() => setShowModal(true)} />
    <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton onClick={() => setShowModal(false)}>
        <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        <Button variant="primary">Save changes</Button>
        </Modal.Footer>
    </Modal >
    </>
  );
}