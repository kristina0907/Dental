import $ from "jquery";
import React from "react";
import LiveSearch from "../LiveSearch/LiveSearch";
import "../popbox.css";
import InputBase from "@material-ui/core/InputBase";

class SearchPatientsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchActive: false,
            notFound: false,
            patients: [],
            selectedPatient: {},
        };
        this.TOhandler = 0;
        this.searchPatientsChange = this.searchPatientsChange.bind(this);
        this.searchActiveOn = this.searchActiveOn.bind(this);
        this.searchActiveOff = this.searchActiveOff.bind(this);
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
        return (
            (this.props.search !== 'clean') ?
                <div className={`position_relative z-index-10`}>
                    <div className={"col-lg-12 input_container"}>
                        <InputBase
                            onChange={this.searchPatientsChange}
                            onFocus={this.searchActiveOn}
                            onBlur={this.searchActiveOff}
                            className={this.props.className !== undefined ? this.props.className + " patient-appoint-form-input " : "patient-appoint-form-input"}
                            type={"text"}
                            placeholder={
                                this.props.placeholder !== undefined ? this.props.placeholder : "Начните вводить номер карточки,ФИО или номер телефона"
                            }
                        />
                    </div>
                    {
                        /* если нажали Добавить и есть пациенты, открываем окно Поиска */
                        this.state.searchActive && this.state.patients.length ? (
                                <LiveSearch patients={this.state.patients} parent={this} />
                            ) : /* если нажали Добавить и не найдено пациентов */
                            this.state.searchActive && this.state.notFound ? (
                                <div className="col-lg-12 search_results empty">
                                    <div className="title">Совпадений не найдено</div>
                                    {/*<div>*/}
                                    {/*    <button onClick={this.addNewPatientClick}>*/}
                                    {/*        Добавить нового пациента*/}
                                    {/*    </button>*/}
                                    {/*</div>*/}
                                </div>
                            ) : null
                    }
                </div>:
                <div className={`position_relative z-index-10`}>
                    <div className={"col-lg-12 input_container"}>
                        <InputBase
                            onChange={this.searchPatientsChange}
                            onFocus={this.searchActiveOn}
                            onBlur={this.searchActiveOff}
                            className={this.props.className !== undefined ? this.props.className + " patient-appoint-form-input " : "patient-appoint-form-input"}
                            type={"text"}
                            placeholder={
                                this.props.placeholder !== undefined ? this.props.placeholder : "Начните вводить номер карточки,ФИО или номер телефона"
                            }
                        />
                        <div className="search_icon_cards">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0)">
                                    <path d="M4.41768 3.64122C4.18693 3.41028 3.81256 3.41028 3.58181 3.64122C2.72506 4.49797 2.30397 5.69147 2.42634 6.91591C2.45687 7.22094 2.71384 7.44832 3.01393 7.44832C3.03365 7.44832 3.05353 7.44732 3.07325 7.44535C3.39818 7.41285 3.63522 7.12297 3.60272 6.79825C3.51562 5.9281 3.81278 5.082 4.41768 4.47706C4.64862 4.24635 4.64862 3.87194 4.41768 3.64122Z" fill="#868789"/>
                                    <path d="M6.75863 0C3.03191 0 0 3.03191 0 6.75863C0 10.4853 3.03191 13.5173 6.75863 13.5173C10.4853 13.5173 13.5173 10.4853 13.5173 6.75863C13.5173 3.03191 10.4853 0 6.75863 0ZM6.75863 12.335C3.68375 12.335 1.18228 9.8335 1.18228 6.75863C1.18228 3.68375 3.68375 1.18228 6.75863 1.18228C9.83331 1.18228 12.335 3.68375 12.335 6.75863C12.335 9.8335 9.8335 12.335 6.75863 12.335Z" fill="#868789"/>
                                    <path d="M15.8268 14.991L11.5312 10.6954C11.3003 10.4645 10.9263 10.4645 10.6954 10.6954C10.4644 10.9262 10.4644 11.3005 10.6954 11.5313L14.991 15.8269C15.1064 15.9423 15.2575 16 15.4089 16C15.5602 16 15.7114 15.9423 15.8268 15.8269C16.0577 15.5961 16.0577 15.2217 15.8268 14.991Z" fill="#868789"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0">
                                        <rect width="16" height="16" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                    </div>
                    {
                        /* если нажали Добавить и есть пациенты, открываем окно Поиска */
                        this.state.searchActive && this.state.patients.length ? (
                                <LiveSearch search={this.props.search} patients={this.state.patients} parent={this} />
                            ) : /* если нажали Добавить и не найдено пациентов */
                            this.state.searchActive && this.state.notFound ? (
                                <div className="col-lg-12 search_results empty">
                                    <div className="title">Совпадений не найдено</div>
                                    {/*<div>*/}
                                    {/*    <button onCl ick={this.addNewPatientClick}>*/}
                                    {/*        Добавить нового пациента*/}
                                    {/*    </button>*/}
                                    {/*</div>*/}
                                </div>
                            ) : null
                    }
                </div>
        );
    }
}

export default SearchPatientsForm;
