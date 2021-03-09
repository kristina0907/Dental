import React from "react";
import Close from "../../media/Close";
import "./ChangeRecord.css";
import DatePicker from "react-datepicker";
import $ from "jquery";

class ChangeRecord extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentDate: this.props.parent.props.parent.state.currentDate,
			timeBefore: this.props.time,
			timeAfter: this.props.nextTime,
			doctor: '',
			comment: '',
			intervals:[],
		};
		this.intervals = [
			"09:00",
			"09:30",
			"10:00",
			"10:30",
			"11:00",
			"11:30",
			"12:00",
			"12:30",
			"13:00",
			"13:30",
			"14:00",
			"14:30",
			"15:00",
			"15:30",
			"16:00",
			"16:30",
			"17:00",
			"17:30",
			"18:00",
			"18:30",
			"19:00",
			"19:30",
		];
		this.recordClose = this.recordClose.bind(this);
		this.changeDate = this.changeDate.bind(this);
		this.timeBeforeChange = this.timeBeforeChange.bind(this);
		this.timeAfterChange = this.timeAfterChange.bind(this);
		this.doctorChange = this.doctorChange.bind(this);
		this.commentChange = this.commentChange.bind(this);
		this.saveRecord = this.saveRecord.bind(this);
		this.setFreeIntervals = this.setFreeIntervals.bind(this);
		this.parent = this.props.parent;
	}

	componentDidMount(){
		this.setFreeIntervals(this.state.doctor);
	}

	static getDerivedStateFromProps(props, state) {
		let timeBefore, timeAfter, doctor;
		if (!state.timeBefore) timeBefore = props.patient.time;
		if (!state.timeAfter) timeAfter = props.patient.nextTime;
		if (!state.doctor) doctor = props.patient.doctor_id;
		if (timeBefore||timeAfter||doctor){
			return {
				timeBefore: timeBefore,
				timeAfter: timeAfter,
				doctor: doctor,
			};
		}
		if (state.timeBefore && state.timeBefore != props.patient.time) {
			return {
				timeBefore: state.timeBefore,
			};
		}
		if (state.timeAfter && state.timeAfter != props.patient.nextTime) {
			return {
				timeAfter: state.timeAfter,
			};
		}
		if (state.doctor && state.doctor != props.patient.doctor_id) {
			return {
				doctor: state.doctor,
			};
		}
		return null;
	}

	setFreeIntervals(doctor){
		let Appoint = this.parent.props.parent, stage = this.parent.props.stage,
			records = Appoint.state.records[stage];
		if (!records || !doctor) return alert('Ошибка получения записей');
		let doctorRecords = records[doctor];
		// оставляем только незанятые интервалы
		let intervals = this.intervals.filter(function (interval){
			for (let record of doctorRecords){
				if (record.appointedtime == interval && !record.patient_id){
					return true;
					break;
				}
			}
			return false;
		});
		// возвращаем время с и до текущего пациента в незанятые интервалы
		for (let idx in intervals){
			if (intervals[idx] < this.state.timeBefore) continue;
			else {
				// только если нет этого интервала
				if (intervals.indexOf(this.state.timeBefore) == -1) intervals.splice(idx,0,this.state.timeBefore);
				if (intervals.indexOf(this.state.timeAfter) == -1) intervals.splice(++idx,0,this.state.timeAfter);
				break;
			}
		}
		this.setState({
			intervals: intervals
		});
	}

	/* для вызова внешних API
	componentDidUpdate(prevProps, prevState) {
		if (this.props.selected !== prevProps.selected) {
			this.selectNew();
		}
	}*/

	changeDate(date){
		this.setState({
			currentDate: date
		});
	}

	timeBeforeChange(evt){
		this.setState({
			timeBefore: evt.target.value
		});
	}

	timeAfterChange(evt){
		this.setState({
			timeAfter: evt.target.value
		});
	}

	doctorChange(evt){
		this.setState({
			doctor: evt.target.value
		});
		this.setFreeIntervals(evt.target.value);
	}

	commentChange(evt){
		this.setState({
			comment: evt.target.value
		});
	}

	saveRecord(evt) {
		evt.preventDefault();
		let patient = this.props.patient, self = this,
			form = {
				id: patient.id,
				appointTime: this.state.timeBefore,
				doctor_id: this.state.doctor,
				patient_id: patient.patient_id,
				date: this.state.currentDate.toLocaleDateString(),
			};
		$.post("/api/shedule/updaterecord", form, function (response){
			let result = response;
			if (result.type != "ok") alert(result.errors);
			else {
				// обновляем расписание
				let form = self.parent.props.parent;
				form.getCurrentShedule(form.state.currentDate, form.state.medDirection)
				self.recordClose();
			}
		});
		return false;
	}

	recordClose() {
		this.parent.setState({
			changeRecordBtnClicked: false
		});
	}

	render() {
		let patient = this.props.patient;
		return (
			<div className="patient-change-record form-popbox">
				<div className="container">
					<Close closeClicked={this.recordClose} />
					<div className="row">
						<div className="col-lg-8 left-part">
							<div className="row name">
								<div className="col-lg-12 text-left">
									<p className="name"><strong>{patient.family+' '+patient.name}</strong></p>
								</div>
							</div>
							<div className="row picker">
								<div className="col-lg-3 text-left">
									<p>Дата:</p>
								</div>
								<div className="col-lg-9">
									<DatePicker
										onChange={this.changeDate}
										selected={this.state.currentDate}
										dateFormat="dd.MM.yyyy"
										locale="ru"
									/>
								</div>
							</div>
							<div className="row shedule">
								<div className="col-lg-3 text-left">Прием с:</div>
								<div className="col-lg-3">
									<select id="time-before" onChange={this.timeBeforeChange} value={this.state.timeBefore}>
										{this.state.intervals.map((value, index) => {
											// disabled только по времени конца приёма у своего врача (сделали insert)
											return <option value={value} key={index} disabled={value==this.state.timeAfter && this.state.doctor == patient.doctor_id}>{value}</option>
										})}
									</select>
								</div>
								<div className="col-lg-3 text-right">до:</div>
								<div className="col-lg-3">
									<select id="time-after" onChange={this.timeAfterChange} value={this.state.timeAfter}>
										{this.state.intervals.map((value, index) => {
											return <option value={value} key={index}>{value}</option>
										})}
									</select>
								</div>
							</div>
							<div className="row doctor">
								<div className="col-lg-3 text-left">
									<p>Врач:</p>
								</div>
								<div className="col-lg-9 ">
									<select id="doctor" onChange={this.doctorChange} value={this.state.doctor}>
										{this.props.doctors.map((value, index) => {
											return <option value={value.id} key={index}>{value.name}</option>
										})}
									</select>
								</div>
							</div>
							<div className="row">
								<p>Комментарий:</p>
							</div>
							<div className="row comment">
								<div className="col-lg-12 text-left">
									<textarea
										maxLength="75"
										className="input-comment"
										type="text"
										value={this.state.comment}
										onChange={this.commentChange}
										placeholder="Максимальная длина комментария не должна превышать 75 символов исключая пробелы"
									/>
								</div>
							</div>
						</div>
						<div className="col-lg-4 right-part">
							<div className="row">
								<div className="col-lg-12 save-btn">
									<button onClick={this.saveRecord} className="">Сохранить</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ChangeRecord;
