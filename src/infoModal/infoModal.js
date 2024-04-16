import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import styles from "./infoModal.module.css";
import AbilityModalBody from "./abilityModalBody/abilityModalBody";
import MoveModalBody from "./moveModalBody/moveModalBody";
import * as helpers from "/src/helpers";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function InfoModal(props) {
	const handleClose = () => props.setShow(false);
	const handleShow = () => props.setShow(true);
	return (
		<>
			{props.info && (
				<Modal
					show={props.show}
					onHide={handleClose}
					id="infoModal"
					tabIndex="-1"
					aria-hidden="true"
				>
					<Modal.Header className={styles.modalHeader}>
						<h5 className="modal-title" id="settingsModalLabel">
							{helpers.deHyphenate(props.info.name)}
						</h5>
						<Button
							variant="close"
							aria-label="Close"
							onClick={handleClose}
							className={styles.closeButton}
						>
							<FontAwesomeIcon icon={regular("xmark")} size="lg" />
						</Button>
					</Modal.Header>
					<Modal.Body className={styles.modalBody}>
						{props.type == "ability" && (
							<AbilityModalBody ability={props.info} />
						)}
						{props.type == "move" && <MoveModalBody move={props.info} />}
					</Modal.Body>
					<Modal.Footer className={styles.modalFooter}>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			)}
		</>
	);
}

export default InfoModal;
