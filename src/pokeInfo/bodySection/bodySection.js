import styles from "./bodySection.module.scss";
function BodySection(props) {
	return (
		<>
			{ (
				<div className={styles.bodySection + " d-flex"}>
                    <div className={styles.sectionHeader}>
                        {props.header}                    
                    </div>
                    <div className={styles.sectionInfo}>
                        {props.info}
                    </div>
				</div>
			)}
		</>
	);
}
export default BodySection;
