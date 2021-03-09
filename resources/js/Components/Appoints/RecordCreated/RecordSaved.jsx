import React from "react";
import Check from "../media/Check";
import Close from "../media/Close";
import "./RecordSaved.css";
class RecordSaved extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	componentDidMount() {
		// при открытиии данной формы закрывается popBox
	}

	render() {
		let patient = this.props.patient, appoint = this.props.appoint;
		return (
			<div className="record-saved">
				<div className="container">
					<div className="row">
						<div className="row green-box">
							<div className="succs-img">
								<Check />
							</div>
							<div className="appoint">Запись создана</div>
						</div>
						<div className="row left-box">
							<div className="col-lg-12">
								<strong className="patient-name">{patient.family+' '+patient.name+' '+patient.surname}</strong>
							</div>
							<div className="col-lg-7">
								<div className="row">
									<div className="col-lg-12">Карта № {patient.medCard}</div>
									<div className="col-lg-12">{patient.birthday} (50 лет)</div>
									<div className="col-lg-12 phone">Телефон <strong>{patient.phone}</strong></div>
								</div>
							</div>
							<div className="col-lg-5">
								<div className="col-lg-12">
									Врач: <strong>{appoint.doctor}</strong>
								</div>
								<div className="col-lg-12">
									Дата: <strong>{appoint.date}</strong>
								</div>
								<div className="col-lg-12">
									Время <strong>{appoint.time} - {appoint.nextTime} (0:30)</strong>
								</div>
							</div>
						</div>
						<div className="col-lg-12">
							<textarea className="input-recordSaved" placeholder="Комментарий"></textarea>
						</div>
					</div>
					<Close closeClicked={this.props.closeSaveRecord} />
				</div>
			</div>
		);
	}
}

export default RecordSaved;
