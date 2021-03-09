import React from "react";
import "./Close.css";
class Close extends React.Component {
	state = {};
	render() {
		return (
				<div className="close-xbutton" onClick={() => this.props.closeClicked()}>
					<svg
						width="8"
						height="8"
						viewBox="0 0 8 8"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="svg_btn"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M0.124052 0.138335C-0.0441098 0.3201 -0.0409013 0.611764 0.131219 0.789786L3.37703 4.14688L0.415703 7.20974C0.243582 7.38776 0.240374 7.67943 0.408535 7.86119C0.576697 8.04296 0.85255 8.04599 1.02467 7.86797L3.99972 4.79092L6.97475 7.86795C7.14687 8.04597 7.42272 8.04293 7.59088 7.86117C7.75904 7.6794 7.75584 7.38774 7.58371 7.20972L4.62241 4.14688L7.8682 0.789813C8.04032 0.611792 8.04353 0.320127 7.87537 0.138362C7.7072 -0.0434034 7.43135 -0.0464389 7.25923 0.131582L3.99972 3.50284L0.740187 0.131556C0.568067 -0.0464658 0.292214 -0.0434307 0.124052 0.138335Z"
							fill="#C4C4C4"
						/>
					</svg>
				</div>
		);
	}
}

export default Close;
