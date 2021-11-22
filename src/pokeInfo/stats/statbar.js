
import styles from "./stats.module.css";

function StatBar(props) {
	return (
		<>
            <div className={styles.progress + " progress"}>
                <div className={styles.progressBarLabel + " progress-bar"} style={{width: "15%"}}>{props.label}</div>
                <div className={styles.progressBar + " progress-bar"} style={{width: props.statRatio * 85 + "%"}}>{props.stat}</div>
            </div> 
		</>
	);
}
export default StatBar;
