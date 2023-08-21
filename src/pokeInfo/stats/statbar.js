
import styles from "./stats.module.scss";

function StatBar(props) {
    return (
		<>
            <div className={styles.progress + " progress"}>
                <div className={styles.progressBarLabel + " progress-bar"} style={{width: "20%"}}>{props.label}</div>
                <div className={styles.progressBar + " progress-bar"} style={{width: props.statRatio * 80 + "%"}}>{props.stat}</div>
            </div> 
		</>
	);
}
export default StatBar;
