import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import styles from "./infoModal.module.css";

function InfoModal(props) {
    return (
        <>
        <div className={"modal fade"} id="infoModal" tabIndex="-1" aria-labelledby="infoModalLabel" aria-hidden="true">
            <div className="modal-md modal-dialog">
                <div className={"modal-content " + styles.modalContent}>
                    <div className={"modal-header " + styles.modalHeader}>
                        <h5 className="modal-title" id="infoModalLabel">{props.title}</h5>
                        <button type="button" className={"btn-close "  + styles.closeButton} data-bs-dismiss="modal" aria-label="Close">
                            <FontAwesomeIcon icon={regular('xmark')} size="lg"/>
                        </button>
                    </div>

                    <div className="modal-body">
                        

                    </div>
                    <div className={"modal-footer " +  styles.modalFooter}>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </>
	);
}

export default InfoModal;
