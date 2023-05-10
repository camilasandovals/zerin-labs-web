import { useState } from "react";
import {  Modal } from "react-bootstrap"
import { PlusCircleFill } from "react-bootstrap-icons"
import TestAddMedication from "./AddMed";

export default function AddMed() {
    const [showModal, setShowModal] = useState(false);
  return (
    <>
    <PlusCircleFill size={60} color={"violet"} onClick={() => setShowModal(true)} />
    <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Body>
        <TestAddMedication showModal={showModal} setShowModal={setShowModal}/>
        </Modal.Body>
    </Modal >
    </>
  );
}