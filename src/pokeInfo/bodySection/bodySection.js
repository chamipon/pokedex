import styles from "./bodySection.module.scss";
function BodySection(props) {
	return (
		<>
			{ (
				<div style={{ "--flex-basis": props.flexbasis }}  className={styles.bodySection + " gap"}>
                    <div className={styles.bodySection__header}>
                        {props.header}                    
                    </div>
                    <div className={styles.bodySection__info}>
                        {props.info}
                    </div>
				</div>
			)}
		</>
	);
}
export default BodySection;
