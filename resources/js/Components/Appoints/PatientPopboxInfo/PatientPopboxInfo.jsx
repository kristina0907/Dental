import React from "react";
import Bell from "../media/Bell";
import Chair from "../media/Chair/Chair";
import Clock from "../media/Clock/Clock";
import Close from "../media/Close";
import Finish from "../media/Finish/Finish";
import "./PatientPopboxInfo.css";

class PatientPopboxInfo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			nextTime: '',
		};

		this.changeRecordOpen = this.changeRecordOpen.bind(this);
		this.cancelRecordOpen = this.cancelRecordOpen.bind(this);
		this.splitInterval = this.splitInterval.bind(this);
		this.parent = this.props.parent;
	}

	static getDerivedStateFromProps(props, state) {
		let nextTime;
		if (!state.nextTime) nextTime = props.patient.nextTime;
		if (state.nextTime && state.nextTime != props.patient.nextTime) {
			return {
				nextTime: state.nextTime,
			};
		}
		return null;
	}

	changeRecordOpen() {
		this.parent.setState({
			changeRecordBtnClicked: true,
			patientInfoBtnClicked: false
		});
	}

	cancelRecordOpen() {
		this.parent.setState({
			cancelRecordBtnClicked: true,
			patientInfoBtnClicked: false
		});
	}

	splitInterval(time, nextTime, evt){
		// находим длину текущего интервала
		let delta = new Date('01.01.2000 '+nextTime) - new Date('01.01.2000 '+time);
		delta = delta / 1000;
		if (delta < 1800) return alert('Интервал менее 30 минут разделить нельзя');
		// находим новый конец интевала
		let newInterval = new Date('01.01.2000 '+time).getTime() + 900000,
			date = new Date(newInterval);
		newInterval = (date.getHours()<10 ? '0'+date.getHours():date.getHours())+':'+date.getMinutes();
		// устанавливаем новую сетку распиания
		let Appoint = this.parent.props.parent, stage = this.parent.props.stage,
			idx = Appoint.intervals[stage].indexOf(time),
			customIntervals = Appoint.state.customIntervals,
			doctor = this.props.patient.doctor_id;
		if (customIntervals[doctor]) customIntervals[doctor].push(newInterval);
		else customIntervals[doctor] = [newInterval];
		Appoint.setState({
			customIntervals: customIntervals,
		});
		// обновляем расписание
		Appoint.getCurrentShedule(Appoint.state.currentDate, Appoint.state.medDirection);
		this.props.closePatientInfo();
	}

	render() {
		let patient = this.props.patient;
		if (!patient.id) return null;
		return (
			<div className="patient-info form-popbox">
				<div className="container">
                  <Close closeClicked={this.props.closePatientInfo} />
                  <div className="row form-box">
						<div className="col-lg-8 left-part">
							<div className="row">
								<div className="col-lg-6">
									<p className="name"><strong>{patient.family+' '+patient.name}</strong></p>
									<p className="birth-date">{patient.birthday}</p>
								</div>
								<div className="col-lg-6">
									{patient.is_primary ? <p className="status-patient"><strong>Первичный</strong></p> : <p className="status-patient"><strong>&nbsp;</strong></p>}
									<p className="visit-time">{patient.time} - {patient.nextTime} (0:30)</p>
								</div>
								<div className="col-lg-12">
									<div className="row status-buttons">
										<div className="col-lg-9">
											<button className="ready-btn"><Bell /></button>
											<button className="inProgress-btn"><Chair /></button>
											<button className="finish-btn"><Finish /></button>
										</div>
										<div className="col-lg-3">
											<button className="waiting-btn"><Clock /></button>
										</div>
									</div>
								</div>
								<div className="col-lg-6 text-left"><p>{patient.phone}</p></div>
								<div className="col-lg-6 text-right"><p>{patient.phone}</p></div>
								<div className="col-lg-12">
									<div className="row comment">
										<div className="col-lg-12">
											<p>Комментарий к приему:</p>
											<p>
												Максимальная длина комментария не должна превышать 75
												символов исключая пробелы
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4 right-part">
							<div className="row first" onClick={this.splitInterval.bind(
								this,
								patient.time,
								patient.nextTime
							)}>
								<p>Разделить интервал</p>
							</div>
							<hr />
							<div className="row second" onClick={() => this.changeRecordOpen()}>
								<p>Изменить запись</p>
							</div>
							<div className="row" onClick={() => this.cancelRecordOpen()}>
								<p>Отменить прием</p>
							</div>
							<hr />
							<div className="row bottom">
								<p><strong>К карточке</strong></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default PatientPopboxInfo;
