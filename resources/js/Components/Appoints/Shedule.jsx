import { format } from "date-fns";
import ru from "date-fns/locale/ru";
import React from "react";
import "./Appoint.css";
import Vector from "./media/Vector";
import CancelRecord from "./PatientPopboxInfo/CancelRecord/CancelRecord";
import ChangeRecord from "./PatientPopboxInfo/ChangeRecord/ChangeRecord";
import PatientPopboxInfo from "./PatientPopboxInfo/PatientPopboxInfo";
import Popbox from "./popbox";

class Shedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addAppoint: {},
      appointButtonClicked: false,
      hideBtnClicked: false,
      patientInfoBtnClicked: false,
      changeRecordBtnClicked: false,
      cancelRecordBtnClicked: false,
      currentDate: this.props.currentDate,
      medDirection: this.props.medDirection,
      selectedPatient: {},
    };
    this.callChange = this.callChange.bind(this);
    this.timeChange = this.timeChange.bind(this);
    this.clickEvent = this.clickEvent.bind(this);
    this.addAppoint = this.addAppoint.bind(this);
    this.closePopbox = this.closePopbox.bind(this);
    this.hideShedule = this.hideShedule.bind(this);
    this.showShedule = this.showShedule.bind(this);
    this.closePatientInfo = this.closePatientInfo.bind(this);
    this.getNearestTime = this.getNearestTime.bind(this);
    this.selectPatient = this.selectPatient.bind(this);
    this.setPatientProps = this.setPatientProps.bind(this);
    this.parent = this.props.parent;
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  callChange(calls) {}

  timeChange(time) {}

  clickEvent() {}

  addAppoint(props, stage, evt) {
    evt.preventDefault();
    props = this.setPatientProps(props, stage);
    this.setState({
      addAppoint: props,
      appointButtonClicked: true,
    });
  }
  closePopbox() {
    this.setState(() => {
      return { appointButtonClicked: false };
    });
  }

  showShedule() {
    this.setState(() => {
      return { hideBtnClicked: false };
    });
  }

  hideShedule() {
    this.setState((prevState) => {
      return { hideBtnClicked: true };
    });
  }

  selectPatient(props, stage, evt) {
    evt.preventDefault();
    props = this.setPatientProps(props, stage);
    this.setState({
      selectedPatient: props,
      patientInfoBtnClicked: true,
    });
  }

  closePatientInfo() {
    this.setState(() => {
      return { patientInfoBtnClicked: false };
    });
  }

  // выдаёт ближайшее свободное время в сетке
  getNearestTime(doctorId, stage) {
    let records = this.parent.state.records[stage],
      doctorRecords = records[doctorId];
    if (!doctorRecords || !doctorRecords.length)
      return stage == "I" ? "09:00" : "14:30";
    let nextTime = "";
    for (let idx in this.parent.intervals[stage]) {
      let time = this.parent.intervals[stage][idx],
        existing = doctorRecords.filter(function (record) {
          return record.appointedtime == time && !record.patient_id;
        });
      if (existing.length) {
        nextTime = time;
        break;
      }
    }
    console.log(nextTime);
    return nextTime;
  }

  setPatientProps(props, stage) {
    let doctor = this.parent.state.doctors.filter(function (doctor) {
      return doctor.id == props.doctor_id;
    });
    props.doctor = doctor[0].name;
    // если время не обозначено (нижняя кнопка), выбираем ближайшее
    if (!props.time) props.time = this.getNearestTime(props.doctor_id, stage);
    let intervals = [...this.parent.intervals[stage]], // делаем копию, чтоб не сломать this.parent.intervals[stage]
      interval = intervals.indexOf(props.time),
      nextTime,
      customIntervals = this.parent.state.customIntervals;
    // если были добавлены новые интевалы учитываем
    if (customIntervals[props.doctor_id]) {
      for (let newInterval of customIntervals[props.doctor_id]) {
        for (let idx in intervals) {
          if (intervals[idx] > newInterval) {
            intervals.splice(idx, 0, newInterval);
            break;
          }
        }
      }
    }
    if (interval == intervals.length)
      nextTime = stage == "I" ? "14:30" : "20:00";
    else nextTime = intervals[interval + 1];
    props.nextTime = nextTime;
    props.date = this.parent.state.currentDate.toLocaleDateString();
    return props;
  }

  render() {
    let date = new Date(),
      today = date.getDate(),
      thisMonth = date.getMonth(),
      doctors = this.parent.state.doctors,
      stage = this.props.stage,
      records = this.parent.state.records[stage],
      customIntervals = this.parent.state.customIntervals;
    return (
      <div className="main-schedule ui-block col-lg-12">
        {this.state.hideBtnClicked ? null : (
          <div className="hide-shedule-btn">
            <button onClick={() => this.hideShedule()}></button>
          </div>
        )}

        {!this.state.hideBtnClicked ? (
          <div className="main-schedule-title">
            <div className="top-row">
              <strong>
                {format(this.state.currentDate, "do MMMM u", {
                  locale: ru,
                }).replace(/-е/, "")}
                <span>|</span>
                {this.props.stage} смена
              </strong>
            </div>
            <div className="doctors-shedule row">
              {doctors.map((value, index) => {
                return (
                  <div className="col-sm-3 col-md-3 col-lg-3" key={index}>
                    <div className="name">{value.name}</div>
                    <div className="branch">{value.branch}</div>
                  </div>
                );
              })}
            </div>
            <div className="patients-shedule row">
              {doctors.length>0 ?
                  doctors.map((doctor, doctorIndex) => {
                      // если были добавлены пользовательские интевалы, вставляем их в записи текущего врача
                      if (customIntervals[doctor.id]) {
                        let record;
                        for (let newInterval of customIntervals[doctor.id]) {
                          // для каждого нового интервала создаём пустую запись и вставляем в расписание
                          for (let idx in records[doctor.id]) {
                            record = records[doctor.id][idx];
                            if (record.appointedtime == newInterval) break; // защита если уже есть
                            if (record.appointedtime > newInterval) {
                              records[doctor.id].splice(idx, 0, {
                                patient_id: null,
                                appointedtime: newInterval,
                              });
                              break;
                            }
                          }
                        }
                      }
                      return (
                          <div
                              className="col-sm-3 col-md-3 col-lg-3 patient-squad"
                              key={doctorIndex}
                          >
                            {records[doctor.id]
                                ? records[doctor.id].map((record, recordIndex) => {
                                  record.doctor_id = doctor.id;
                                  record.time = record.appointedtime;
                                  return !record.patient_id ? (
                                      <div
                                          className="patient-shedule-wrap blanked"
                                          key={recordIndex}
                                      >
                                        <div className="patient-time">
                                          {record.appointedtime}
                                        </div>
                                        <button
                                            className="patient-empty-block"
                                            onClick={this.addAppoint.bind(
                                                this,
                                                record,
                                                this.props.stage
                                            )}
                                        ></button>
                                      </div>
                                  ) : (
                                      <div
                                          className="patient-shedule-wrap"
                                          key={recordIndex}
                                      >
                                        <div className="patient-time">
                                          {record.appointedtime}
                                        </div>
                                        <div
                                            className={
                                              "patient-shedule-block " +
                                              (record.canceled
                                                  ? "canceled"
                                                  : record.status || "")
                                            }
                                            onClick={this.selectPatient.bind(
                                                this,
                                                record,
                                                this.props.stage
                                            )}
                                        >
                                          <div className="patient-name">
                                            {record.patient}
                                          </div>
                                          <ul className="patient-actions">
                                            {record.actions[0]
                                                ? record.actions.map(
                                                    (action, actionIndex) => {
                                                      return (
                                                          <li
                                                              className={action}
                                                              key={actionIndex}
                                                          ></li>
                                                      );
                                                    }
                                                )
                                                : ""}
                                          </ul>
                                        </div>
                                      </div>
                                  );
                                })
                                : null}
                            <button
                                onClick={this.addAppoint.bind(
                                    this,
                                    {
                                      doctor_id: doctor.id,
                                      time: null,
                                    },
                                    this.props.stage
                                )}
                                className={"patient-appoint"}
                            >
                              Записать
                            </button>
                          </div>
                      );
                    })
                  : null}
            </div>
          </div>
        ) : (
          <div className="show-shedule-btn pb-4">
            <div className="row">
              <div className="col-lg-5 offset-lg-1 left-line">
                {" "}
                <hr />
              </div>
              <div className="col-lg-1 circle-btn">
                <button onClick={() => this.showShedule()}>
                  <Vector />
                </button>
              </div>
              <div className="col-lg-5 right-line">
                <hr />
              </div>
            </div>
          </div>
        )}
        <Popbox
          closeClicked={this.closePopbox}
          clicked={this.state.appointButtonClicked}
          appoint={this.state.addAppoint}
          AppointForm={this.parent}
        />
        {this.state.patientInfoBtnClicked ? (
          <PatientPopboxInfo
            closePatientInfo={this.closePatientInfo}
            patient={this.state.selectedPatient}
            parent={this}
          />
        ) : null}
        {this.state.changeRecordBtnClicked ? (
          <ChangeRecord
            patient={this.state.selectedPatient}
            doctors={this.parent.state.doctors}
            records={this.parent.state.records[this.props.stage]}
            parent={this}
          />
        ) : null}
        {this.state.cancelRecordBtnClicked ? (
          <CancelRecord patient={this.state.selectedPatient} parent={this} />
        ) : null}
      </div> // прописать под <Popbox /> модалку для редактирования юзеров
    );
  }
}

export default Shedule;
