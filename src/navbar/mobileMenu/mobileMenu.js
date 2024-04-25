import styles from "./mobileMenu.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useContext } from "react";
import SettingsContext from "../../../contexts/settings";
import Offcanvas from "react-bootstrap/Offcanvas";
import ListGroup from "react-bootstrap/ListGroup";

function MobileMenu(props) {
	const handleClose = () => props.setShow(false);
	const handleShow = () => props.setShow(true);

	const [settings] = useContext(SettingsContext);
	return (
		<>
			<Offcanvas
				tabIndex="-1"
				className={styles.mobileMenu}
				show={props.show}
				placement="end"
				onHide={handleClose}
			>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Ultradex</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<ListGroup className={" list-group list-group-flush"}>
						<ListGroup.Item
							action
							className={styles.mobileMenuItem}
							href="/pokedex"
						>
							<div>
								<img
									width={24}
									height={24}
									alt={
										settings.isDark
											? "ultra ball sprite"
											: "premier ball sprite"
									}
									src={
										settings.isDark
											? "/pokeball_icon_white.svg"
											: "/pokeball_icon.svg"
									}
								/>
								Pokemon
							</div>
						</ListGroup.Item>
						<ListGroup.Item
							className={styles.mobileMenuItem}
							action
							href="/itemdex"
						>
							<div>
								<FontAwesomeIcon
									icon={solid("backpack")}
									size="lg"
								/>{" "}
								Items
							</div>
						</ListGroup.Item>
						<ListGroup.Item
							action
							className={styles.mobileMenuItem}
							onClick={() => {
								props.setShowSettingsMenu(!props.showSettingsMenu);
							}}
						>
							<FontAwesomeIcon icon={solid("gear")} size="lg" />
							Settings
						</ListGroup.Item>
					</ListGroup>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
}

export default MobileMenu;
