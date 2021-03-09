import $ from "jquery";
import React from "react";
import AddNewRecord from "./AddNewRecord/addNewRecord";
import LiveSearch from "./LiveSearch/LiveSearch";
import RecordSaved from "./RecordCreated/RecordSaved";
import Close from "./media/Close";
import "./popbox.css";

class Popbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchActive: false,
            notFound: false,
            patients: [],
            addNewPatientClicked: false,
            recordSaved: false,
            selectedPatient: {},
        };
        this.TOhandler = 0;
        this.searchPatientsChange = this.searchPatientsChange.bind(this);
        this.searchActiveOn = this.searchActiveOn.bind(this);
        this.searchActiveOff = this.searchActiveOff.bind(this);
        this.addNewPatientClick = this.addNewPatientClick.bind(this);
        this.addNewPatientClose = this.addNewPatientClose.bind(this);
        this.saveRecordClick = this.saveRecordClick.bind(this);
        this.saveRecordClose = this.saveRecordClose.bind(this);
        this.closeClicked = this.closeClicked.bind(this);
    }

    searchPatientsChange(evt) {
        evt.preventDefault();
        let input = evt.target.value,
            self = this;
        if (input.length < 3) {
            return this.setState({
                patients: [],
                notFound: false,
            });
        }
        clearTimeout(this.TOhandler);
        // запрос отправляем не сразу, а только через 0,2 сек после завершения ввода
        this.TOhandler = setTimeout(() => {
            $.post("/api/patients/search", { search: input }, function (response) {
            }).done(function (response){
                let result = response;
                console.log(result);
                self.setState({
                    patients: result,
                    notFound: !result.length,
                });
            });
        }, 200);
    }

    searchActiveOn() {
        this.setState(() => {
            return { ...this.state, searchActive: true };
        });
    }
    searchActiveOff() {
        if (this.state.patients.length || this.state.notFound) return;
        this.setState(() => {
            return { ...this.state, searchActive: false };
        });
    }
    addNewPatientClick(evt) {
        this.setState({
            selectedPatient: {},
            addNewPatientClicked: true,
            searchActive: false,
        });
    }
    addNewPatientClose() {
        this.setState(() => {
            return { addNewPatientClicked: false };
        });
    }
    saveRecordClick(form, appoint, evt) {
        let self = this;
        form.doctor = appoint.doctor_id;
        form.date = appoint.date;
        form.appointTime = appoint.time;
        $.post("api/shedule/add/record", form, function (response) {
            let result = response;
            if (result.type != "ok") console.log(result.errors);
            else {
                if (!form.id) form.id = result.id;
                self.setState({
                    addNewPatientClicked: false,
                    recordSaved: true,
                    selectedPatient: form
                });
            }
        });
        return false;
    }

    saveRecordClose() {
        this.setState({
            recordSaved: false
        });
        // обновляем расписание
        let form = this.props.AppointForm
        form.getCurrentShedule(form.state.currentDate, form.state.medDirection)
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState) {}

    closeClicked(evt) {
        this.setState({
            patients: [],
            notFound: false,
        });
        this.props.closeClicked(evt);
    }

    render() {
        let appoint = this.props.appoint;
        return (
            <div>
                {this.props.clicked ? (
                    <div className={"patient-appoint-form"}>
                        <div className="container">
                            <Close closeClicked={this.closeClicked} />
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className={"text col-lg-4 mt-lg-4"}>
                                            <p style={{ marginLeft: "40px" }}>
                                                Врач: <strong>{appoint.doctor}</strong>
                                            </p>
                                        </div>
                                        <div className={"text col-lg-4 mt-lg-4"}>
                                            <p>
                                                Дата: <strong>{appoint.date}</strong>
                                            </p>
                                        </div>
                                        <div className={" text col-lg-4 mt-lg-4"}>
                                            <p>
                                                Время:{" "}
                                                <strong>
                                                    {appoint.time} - {appoint.nextTime} (0:30)
                                                </strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={"col-lg-12 input_container"}>
                            <input
                                onChange={this.searchPatientsChange}
                                onFocus={this.searchActiveOn}
                                onBlur={this.searchActiveOff}
                                className={"patient-appoint-form-input"}
                                type={"text"}
                                placeholder={
                                    "Начните вводить номер карты / Фамилию или номер телефона"
                                }
                            ></input>
                        </div>
                        <div className="col-lg-12 popbox_buttons">
                            <div className="row">
                                <div className={"offset-lg-3 col-lg-3 button_appoint"}>
                                    <button>Записать на прием</button>
                                </div>
                                <div className={"col-lg-4 button_add_patient"}>
                                    <button onClick={() => this.addNewPatientClick()}>
                                        Добавить нового пациента
                                    </button>
                                </div>
                            </div>
                        </div>
                        {
                            /* если нажали Добавить и есть пациенты, открываем окно Поиска */
                            this.state.searchActive && this.state.patients.length ? (
                                    <LiveSearch patients={this.state.patients} parent={this} />
                                ) : /* если нажали Добавить и не найдено пациентов */
                                this.state.searchActive && this.state.notFound ? (
                                    <div className="col-lg-12 search_results empty">
                                        <div className="title">Совпадений не найдено</div>
                                        <div>
                                            <button onClick={this.addNewPatientClick}>
                                                Добавить нового пациента
                                            </button>
                                        </div>
                                    </div>
                                ) : null
                        }
                    </div>
                ) : null}
                {this.state.addNewPatientClicked ? (
                    <div>
                        <AddNewRecord
                            closed={this.addNewPatientClose}
                            addNewPatientClose={this.addNewPatientClose}
                            saveRecord={this.saveRecordClick}
                            appoint={this.props.appoint}
                            patient={this.state.selectedPatient}
                            popbox={this}
                        />
                    </div>
                ) : null}
                {this.state.recordSaved ? (
                    <RecordSaved closeSaveRecord={this.saveRecordClose} patient={this.state.selectedPatient} appoint={this.props.appoint}/>
                ) : null}
            </div>
        );
    }
}

export default Popbox;
