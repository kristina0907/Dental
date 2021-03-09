import React from "react";
import Close from "../media/Close";
import "./addNewRecord.css";
import InputMask from "react-input-mask";

class AddNewRecord extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: this.props.patient.id,
			family: this.props.patient.family,
			name: this.props.patient.name,
			surname: this.props.patient.surname,
			med_card_id: this.props.patient.medCard||'',
			city: "",
			street: "",
			house: "",
			building: "",
			flat: "",
			comment: "",
			birthday: this.props.patient.birthday,
			gender: "",
			phone: this.props.patient.phone,
			email: "",
			parent: "",
			marketing: "",
			insurance: "",
			insuranceFrom: "",
			insuranceUntill: "",
			description: "",
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		// при открытиии данной формы закрывается popBox
		this.props.popbox.closeClicked();
	}

	handleSubmit(e) {
		e.preventDefault();
		return false;
	}
	handleChange(e) {
		const input = e.target;
		this.setState(() => {
			return { [input.name]: input.value };
		});
	}
	render() {
		let appoint = this.props.appoint,
			patient = this.props.patient;
		return (
            (appoint.doctor)?
                <div className="add-new-record">
                    <form
                        id="newPatient"
                        action="/api/shedule/addrecord"
                        method="post"
                        onSubmit={(e) => {
                            e.preventDefault();
                            this.handleSubmit(e);
                        }}
                    >
                        <div className="col-lg-12">
                            <div className="container">
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="col-lg-1 offset-lg-11">
                                            <Close closeClicked={this.props.addNewPatientClose} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-lg-3 mb-lg-3 headers">
                                    <div className="col-lg-4 input-name">
                                        <span>Врач:</span>
                                        <strong>{appoint.doctor}</strong>
                                    </div>
                                    <div className="col-lg-4 input-name">
                                        <span>Дата:</span>
                                        <strong>{appoint.date}</strong>
                                    </div>
                                    <div className="col-lg-4 input-name">
                                        <span>Время:</span>
                                        <strong>
                                            {appoint.time} - {appoint.nextTime} (0:30)
                                        </strong>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-5 left-col">
                                        <div className="col-lg-12 mb-lg-3 med-card">
                                            <span>Номер медкарты:</span>
                                            <strong>{patient.medCard}</strong>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-4 input-name">Фамилия</div>
                                            <div className="col-lg-8">
                                                <input
                                                    onChange={(e) => this.handleChange(e)}
                                                    name="family"
                                                    value={this.state.family || patient.family}
                                                    className="add-new-record-input mb-lg-2"
                                                    type="text"
                                                    placeholder="Александрова"
                                                    form="newPatient"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-4 input-name">Имя</div>
                                            <div className="col-lg-8">
                                                <input
                                                    value={this.state.name}
                                                    onChange={(e) => this.handleChange(e)}
                                                    name="name"
                                                    className="add-new-record-input mb-lg-2"
                                                    type="text"
                                                    placeholder="Александра"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-4 input-name">Отчество</div>
                                            <div className="col-lg-8">
                                                <input
                                                    value={this.state.surname}
                                                    onChange={(e) => this.handleChange(e)}
                                                    name="surname"
                                                    className="add-new-record-input mb-lg-2"
                                                    type="text"
                                                    placeholder="Александровна"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="row mt-lg-2">
                                            <div className="col-lg-4 input-name">Город</div>
                                            <div className="col-lg-8">
                                                <input
                                                    value={this.state.city}
                                                    onChange={(e) => this.handleChange(e)}
                                                    name="city"
                                                    className="add-new-record-input mb-lg-2"
                                                    type="text"
                                                    placeholder="Краснодар"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-4 input-name">Улица</div>
                                            <div className="col-lg-8">
                                                <input
                                                    value={this.state.street}
                                                    onChange={(e) => this.handleChange(e)}
                                                    name="street"
                                                    className="add-new-record-input mb-lg-2"
                                                    type="text"
                                                    placeholder="Красная"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="row splitted">
                                            <div className="col-lg-4">
                                                <div className="row" style={{ marginLeft: "5px" }}>
                                                    <div className="col-lg-4 input-name">Дом</div>
                                                    <div className="col-lg-8">
                                                        <input
                                                            value={this.state.house}
                                                            onChange={(e) => this.handleChange(e)}
                                                            name="house"
                                                            className="add-new-record-input"
                                                            type="text"
                                                            placeholder="209a"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4" style={{ marginLeft: "16px" }}>
                                                <div className="row">
                                                    <div className="col-lg-5 input-name">Корпус</div>
                                                    <div className="col-lg-7">
                                                        <input
                                                            value={this.state.building}
                                                            onChange={(e) => this.handleChange(e)}
                                                            name="building"
                                                            className="add-new-record-input"
                                                            type="text"
                                                            placeholder="209"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-4 input-name">Квартира</div>
                                            <div className="col-lg-4">
                                                <input
                                                    value={this.state.flat}
                                                    onChange={(e) => this.handleChange(e)}
                                                    name="flat"
                                                    className="add-new-record-input mb-lg-2"
                                                    type="text"
                                                    placeholder="208"
                                                />
                                            </div>
                                        </div>
                                        <div className="row mt-lg-2">
                                            <div className="col-lg-4 input-name">Комментарий</div>
                                            <div className="col-lg-8">
                                                <input
                                                    value={this.state.comment}
                                                    onChange={(e) => this.handleChange(e)}
                                                    name="comment"
                                                    className="add-new-record-input comment mb-lg-2"
                                                    type="text"
                                                    placeholder="Информация отсутствует"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-7 right-col">
                                        <div className="col-lg-12 mb-lg-1">
                                            <div className="row">
                                                <div className="col-lg-4 input-name">Дата рождения</div>
                                                <div className="col-lg-8">
                                                    <InputMask
                                                        value={this.state.birthday}
                                                        onChange={(e) => this.handleChange(e)}
                                                        name="birthday"
                                                        mask="99.99.9999"
                                                        className="add-new-record-input"
                                                        type="text"
                                                        placeholder="дд.мм.гггг"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row gender">
                                            <div className="col-lg-4 input-name">Пол</div>
                                            <div className="col-lg-8 input-name-row">
                                                <div className="row">
                                                    <div className="col-lg-4 man">
                                                        <input
                                                            value='М'
                                                            onChange={(e) => this.handleChange(e)}
                                                            type="radio"
                                                            name="gender"
                                                            id="man"
                                                            required
                                                        />
                                                        <span>Мужской</span>
                                                    </div>
                                                    <div className="col-lg-6 woman">
                                                        <input
                                                            value="Ж"
                                                            onChange={(e) => this.handleChange(e)}
                                                            type="radio"
                                                            name="gender"
                                                            id="woman"
                                                        />
                                                        <span>Женский</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-lg-1">
                                            <div className="col-lg-4 input-name">Мобильный телефон</div>
                                            <div className="col-lg-8">
                                                <InputMask
                                                    value={this.state.phone}
                                                    onChange={(e) => this.handleChange(e)}
                                                    name="phone"
                                                    className="add-new-record-input mb-lg-2"
                                                    type="text"
                                                    mask="+7(999)999-99-99"
                                                    placeholder="+7 (***) ***-**-**"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-4 input-name">Email</div>
                                            <div className="col-lg-8">
                                                <input
                                                    value={this.state.email}
                                                    onChange={(e) => this.handleChange(e)}
                                                    name="email"
                                                    className="add-new-record-input mb-lg-2"
                                                    type="email"
                                                    placeholder="email@examle.com"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="row mt-lg-2">
                                            <div className="col-lg-4 input-name">Родитель</div>
                                            <div className="col-lg-8">
                                                <input
                                                    value={this.state.parent}
                                                    onChange={(e) => this.handleChange(e)}
                                                    name="parent"
                                                    className="add-new-record-input mb-lg-2"
                                                    type="text"
                                                    placeholder="Александрова Алла Игоревна"
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-4 input-name">Откуда узнал</div>
                                            <div className="col-lg-8">
                                                <input
                                                    value={this.state.marketing}
                                                    onChange={(e) => this.handleChange(e)}
                                                    name="radio"
                                                    className="add-new-record-input mb-lg-2"
                                                    type="text"
                                                    placeholder="рекомендации друзей"
                                                />
                                            </div>
                                        </div>
                                        <div className="row mt-lg-2">
                                            <div className="col-lg-4 input-name">
                                                Страховая компания
                                            </div>
                                            <div className="col-lg-8">
                                                <input
                                                    value={this.state.insurance}
                                                    onChange={(e) => this.handleChange(e)}
                                                    name="insurance"
                                                    className="add-new-record-input mb-lg-2"
                                                    type="text"
                                                    placeholder="СПАС"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-4 input-name">Действителен с</div>
                                            <div className="col-lg-8">
                                                <input
                                                    value={this.state.insuranceFrom}
                                                    onChange={(e) => this.handleChange(e)}
                                                    name="insuranceFrom"
                                                    className="add-new-record-input mb-lg-2"
                                                    type="date"
                                                    placeholder="12.09.2010"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-4 input-name">Действителен до</div>
                                            <div className="col-lg-8">
                                                <input
                                                    value={this.state.insuranceUntill}
                                                    onChange={(e) => this.handleChange(e)}
                                                    name="insuranceUntill"
                                                    className="add-new-record-input mb-lg-2"
                                                    type="date"
                                                    placeholder="12.09.2010"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-4 input-name">Описание</div>
                                            <div className="col-lg-8">
                                                <input
                                                    value={this.state.description}
                                                    onChange={(e) => this.handleChange(e)}
                                                    name="description"
                                                    className="add-new-record-input mb-lg-2"
                                                    type="text"
                                                    placeholder="пусто"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 offset-lg-4 mt-lg-3">
                                        <button
                                            onClick={this.props.saveRecord.bind(
                                                this,
                                                this.state,
                                                appoint
                                            )}
                                            className="save-button"
                                            type="submit"
                                        >
                                            {(patient)? 'Записать':'Сохранить'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>:null
		);
	}
}

export default AddNewRecord;
