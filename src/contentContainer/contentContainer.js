import SettingsContext from "../../contexts/settings";
import styles from "./contentContainer.module.css";
import { useContext } from "react";

function ContentContainer(props) {
	const [settings] = useContext(SettingsContext);
	return (
		<>
			<div className={` ${styles.contentContainer}`}>{props.children}</div>
		</>
	);
}
export default ContentContainer;
