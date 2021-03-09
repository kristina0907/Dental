import $ from "jquery";
import React from 'react';
import './Filters.css';

class Filters extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			branches: ['Филиалы',
				'Краснодар', 'Армавир', 'Новороссийск'],
			directions: ['Мед.направление',
				'Терапевты', 'Хирурги', 'Ортопеды', 'Ортодонты'],
			doctors: ['Врач',
				'Иванов И.И.', 'Александрова А.А.', 'Буслаев И.Э.', 'Вердеревская И.И.'],
			timeFrom: ['с',
				'9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
				'13:00', '13:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
				'17:00', '17:30', '18:00', '18:30', '19:00', '19:30'],
			timeTo: ['до',
				'9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
				'13:00', '13:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
				'17:00', '17:30', '18:00', '18:30', '19:00', '19:30'],
			Interval: ['минут', '15 минут', '30 минут'],
			filters: {
				direction: '',
				doctor: '',
				timeFrom: '',
				timeTo: '',
				Interval: '',
			}
		}
		this.branchChange = this.branchChange.bind(this);
		this.medDirectionChange = this.medDirectionChange.bind(this);
		this.doctorChange = this.doctorChange.bind(this);
		this.timeFromChange = this.timeFromChange.bind(this);
		this.timeToChange = this.timeToChange.bind(this);
		this.IntervalChange = this.IntervalChange.bind(this);
		this.setFilters = this.setFilters.bind(this);
		this.clear = this.clear.bind(this);
		this.apply = this.apply.bind(this);
		this.parent = this.props.parent;
	}

	componentDidMount() {
		this.setFilters(this.props.currentDate, this.props.medDirection)
	}

	componentWillReceiveProps(nextProps) {
		this.setFilters(nextProps.currentDate, nextProps.medDirection);
	}

	setFilters(currentDate, medDirection){
		let self = this;
		$.get("/api/shedule/get/filters",
			{
				date: currentDate.toLocaleDateString(),
				direction: medDirection
			},
			function (response) {
		        console.log(response);
				let result = response;
				//result.doctors.unshift({ id: 0, name: 'Врач' })
				//result.directions.unshift({ id: 0, title: 'Мед.направление' })
				self.setState({
					doctors: result.professions,
					directions: result.professions,

				});
			}
		);
	}

	branchChange(branches){
		return;
	};

	medDirectionChange(evt){
		let directionId = evt.target.value;
		// TODO надо ли currentDate в state?
		this.setFilters(this.props.currentDate, directionId);
		let filters = this.state.filters;
		filters.direction = directionId;
		this.setState({
			filters: filters
		});
	};

	doctorChange(evt){
		let filters = this.state.filters;
		filters.doctor = evt.target.value;
		this.setState({
			filters: filters
		});
	};

	timeFromChange(evt){
		let filters = this.state.filters;
		filters.timeFrom = evt.target.value;
		this.setState({
			filters: filters
		});
	};

	timeToChange(evt){
		let filters = this.state.filters;
		filters.timeTo = evt.target.value;
		this.setState({
			filters: filters
		});
	};

	IntervalChange(evt){
		let filters = this.state.filters;
		filters.Interval = evt.target.value;
		this.setState({
			filters: filters
		});
	};

	clear(){
		$('#branches option').each(function(){
			this.selected = false;
		});
		$('#directions option').each(function(){
			this.selected = false;
		});
		$('#doctors option').each(function(){
			this.selected = false;
		});
		$('#timefrom option').each(function(){
			this.selected = false;
		});
		$('#timeto option').each(function(){
			this.selected = false;
		});
		$('#interval option').each(function(){
			this.selected = false;
		});
		this.setState({
			filters: {
				direction: '',
				doctor: '',
				timeFrom: '',
				timeTo: '',
				Interval: '',
			}
		});
		this.parent.setState({
			records: this.parent.state.allRecords
		});
	}

	// TODO сделать множественный выбор SELECT2
	apply(){
		let self = this, Appoint = this.parent,
			filters = this.state.filters;
		// если был, то переход на вкладку
		if (this.state.filters.direction){
			Appoint.setState({
				medDirection: filters.direction
			});
		}
		return $.get("/api/shedule/get/records",
			{
				date: Appoint.state.currentDate.toLocaleDateString(),
				direction: filters.direction
			},
			function (response) {
				let result = response, records = Appoint.state.allRecords.I,
					recordsFirst = Appoint.setEmptyIntervalsButtons(result.shedule.I,'I'),
					recordsSecond = Appoint.setEmptyIntervalsButtons(result.shedule.II,'II'),
					_recordsFirst = recordsFirst, _recordsSecond = recordsSecond;
				if (filters.doctor){
					// I смена
					let records_ = {};
					records_[filters.doctor] = recordsFirst[filters.doctor];
					recordsFirst = records_;
					// II смена
					records_ = {};
					records_[filters.doctor] = recordsSecond[filters.doctor];
					recordsSecond = records_;
				}
				if (filters.timeFrom){
					// I смена
					for (let userId in recordsFirst){
						recordsFirst[userId] = recordsFirst[userId].filter(function (record) {
							return record.appointedtime >= filters.timeFrom;
						});
					}
					// II смена
					for (let userId in recordsSecond){
						recordsSecond[userId] = recordsSecond[userId].filter(function (record) {
							return record.appointedtime >= filters.timeFrom;
						});
					}
				}
				if (filters.timeTo){
					// I смена
					for (let userId in recordsFirst) {
						recordsFirst[userId] = recordsFirst[userId].filter(function (record) {
							return record.appointedtime < filters.timeTo;
						});
					}
					// II смена
					for (let userId in recordsSecond) {
						recordsSecond[userId] = recordsSecond[userId].filter(function (record) {
							return record.appointedtime < filters.timeTo;
						});
					}
				}
				// TODO узнать логику фильтрации по интервалам
				/*if (filters.Interval){
					recordsSecond = recordsSecond.filter(function(record){
						return record.doctor_id == filters.Interval;
					});
				}*/
				Appoint.setState({
					doctors: result.doctors,
					records: {I:recordsFirst, II:recordsSecond},
					allRecords: {I:_recordsFirst, II:_recordsSecond},
				});
			}
		);
	}

	render() {
		let branches = this.state.branches,
			directions = this.state.directions,
			doctors = this.state.doctors,
			timeFrom = this.state.timeFrom,
			timeTo = this.state.timeTo,
			Interval = this.state.Interval;
		return (
			<div className="filters-box">
				<div className="row title">
					<div className="col-sm-12 col-md-12 col-lg-12">Фильтры</div>
				</div>
				<div className="row">
					<div className="col-sm-12 col-md-12 col-lg-12">
						<select id="branches" onChange={this.branchChange}>
                            <option>Филиалы</option>
							{branches.map((value, index) => {
								return <option value={value} key={index}>{value}</option>
							})}
						</select>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12 col-md-12 col-lg-12">
						<select id="directions" onChange={this.medDirectionChange}>
                            <option>Мед.направление</option>
							{directions.map((value, index) => {
								return <option value={value.id} key={index}>{value.title}</option>
							})}
						</select>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12 col-md-12 col-lg-12">
						<select id="doctors" onChange={this.doctorChange}>
                            <option  >Врач</option>
							{doctors.map((value, index) => {
								return <option value={value.id} key={index}>{value.family} {value.name} {value.surname}</option>
							})}
						</select>
					</div>
				</div>
				<div className="row intervals">
					<div className="col-sm-4 col-md-4 col-lg-4" style={{ paddingLeft: 0 }}>
						<select id="timefrom" onChange={this.timeFromChange}>
							{timeFrom.map((value, index) => {
								return <option value={value} key={index}>{value}</option>
							})}
						</select>
					</div>
					<div className="col-sm-4 col-md-4 col-lg-4">
						<select id="timeto" onChange={this.timeToChange}>
							{timeTo.map((value, index) => {
								return <option value={value} key={index}>{value}</option>
							})}
						</select>
					</div>
					<div className="col-sm-4 col-md-4 col-lg-4" style={{ paddingRight: 0 }}>
						<select id="interval" onChange={this.IntervalChange}>
							{Interval.map((value, index) => {
								return <option value={value} key={index}>{value}</option>
							})}
						</select>
					</div>
				</div>
				<div className="row buttons">
					<div className="col-sm-6 col-md-6 col-lg-6 clear">
						<button onClick={this.clear}>Очистить</button>
					</div>
					<div className="col-sm-6 col-md-6 col-lg-6 update">
						<button onClick={this.apply}>Обновить</button>
					</div>
				</div>
			</div>
		)
	}
}

export default Filters;
