import "./bodySection.css";

function BodySection(props) {
	return (
		<>
			{ (
				<div className="bodySection d-flex">
                    <div className="sectionHeader">
                        {props.header}                    
                    </div>
                    <div className="sectionInfo">
                        {props.info}
                    </div>
				</div>
			)}
		</>
	);
}
export default BodySection;
