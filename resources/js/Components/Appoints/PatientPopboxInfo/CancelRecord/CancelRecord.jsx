import React from "react";
import Close from "../../media/Close";
import "./CancelRecord.css";
import $ from "jquery";

class CancelRecord extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			reason: '',
			reasonDetails:'',
			comment: ''
		};
		this.reasons = {
            "0": {"status": "yellow", "label": "Неизвестна"},
            "1": {"status": "red", "label": "Отказ от приёма"},
            "2": {"status": "red", "label": "Отказ от лечения"},
            "3": {"status": "green", "label": "Отменён врачом"},
            "4": {"status": "green", "label": "Ошибка добавления"}
        };

		this.reasonDetails =
			[
				'Неизвестна',
				'Недовольство ценой',
				'Недовольство качеством',
				'Переезд',
				'Причина неизвестна',
			];
		this.changeReason = this.changeReason.bind(this);
		this.changeReasonDetails = this.changeReasonDetails.bind(this);
		this.commentChange = this.commentChange.bind(this);
		this.saveRecord = this.saveRecord.bind(this);
		this.recordClose = this.recordClose.bind(this);
		this.parent = this.props.parent;
	}

	componentDidMount() {
		// при открытиии данной формы закрывается popBox
	}

	changeReason(evt){
		this.setState({
			reason: evt.target.value
		});
	}

	changeReasonDetails(evt){
		this.setState({
			reasonDetails: evt.target.value
		});
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
				reason: this.state.reason,
				reasonDetails: this.state.reasonDetails,
				comment: this.state.comment,
				date: patient.date,
                time:patient.time
			};
		$.post("/api/shedule/cancelrecord", form, function (response){
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
			cancelRecordBtnClicked: false
		});
	}

	render() {
		let patient = this.props.patient,
			hasDetails = this.state.reason === 'red';
		return (
			<div className="patient-cancel-record form-popbox">
				<div className={hasDetails ? "container":"container one-row"}>
					<Close closeClicked={this.recordClose} />
					<div className="row">
						<div className="col-lg-8 left-part">
							<div className="row name">
								<div className="col-lg-6">
									<p><strong>{patient.family+' '+patient.name}</strong></p>
								</div>
								<div className="col-lg-6 text-right">
									<p>{patient.time} - {patient.nextTime} (0:30)</p>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-3 text-left">
									<p>Причина:</p>
								</div>
								<div className="col-lg-9 ">
									<select id="reason" onChange={this.changeReason}>
										{Object.keys(this.reasons).map((index) => {
										    let option = this.reasons[index]
											return(
                                                <option value={option.status} key={index}>{option.label}</option>
                                            )
										})}
									</select>
								</div>
							</div>
							{ hasDetails ?
								<div className="row">
									<div className="col-lg-3 text-left">
										<p>Причина отказа:</p>
									</div>
									<div className="col-lg-9">
										<select id="reason-detail" onChange={this.changeReasonDetails}>
											{this.reasonDetails.map((value, index) => {
												return <option value={value} key={index}>{value}</option>
											})}
										</select>
									</div>
								</div> : null
							}
							<div className="row">
								<p>Комментарий:</p>
							</div>
							<div className="row text-left">
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

export default CancelRecord;
