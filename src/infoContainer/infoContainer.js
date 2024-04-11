
import styles from "./infoContainer.module.css";

function InfoContainer(props) {
	return (
		<>
            <div className={styles.infoContainer + " gap"}>
                {props.children}
            </div> 
		</>
	);
}
export default InfoContainer;
