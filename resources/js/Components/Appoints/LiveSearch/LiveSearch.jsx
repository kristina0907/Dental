import React from "react";
import "./LiveSearch.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";

class LiveSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patients: this.props.patients,
        };
        this.selectPatient = this.selectPatient.bind(this);
        this.parent = this.props.parent;
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState(nextProps);
    }

    selectPatient(props, evt) {
        this.parent.setState({
            selectedPatient: props,
            addNewPatientClicked: true,
            searchActive: false,
        });
    }

    render() {
        return (
            (this.props.search !== 'clean') ?
                <div className={"col-lg-12 search_results"}>
                    <div className="row">
                        <div className="col-lg-2 first-col">
                            <p><strong>Номер карты</strong></p>
                        </div>
                        <div className="col-lg-4">
                            <p><strong>ФИО</strong></p>
                        </div>
                        <div className="col-lg-2 birthday-col">
                            <p><strong>Дата рождения</strong></p>
                        </div>
                        <div className="col-lg-2">
                            <p><strong>Номер телефона</strong></p>
                        </div>
                    </div>
                    {this.state.patients.map((el, index) => {
                        console.log(el)
                        return <div className="row" key={index} onClick={this.selectPatient.bind(this, {
                            id:			el.user_id,
                            medCard:	el.card_number,
                            family: 	el.surname,
                            name:		el.name,
                            surname:	el.patronymic,
                            birthday: 	el.born_date,
                            phone: 		el.contacts,
                        })}>
                            <div className="col-lg-2 first-col">{el.card_number}</div>
                            <div className="col-lg-4">{el.name} {el.patronymic} {el.surname}</div>
                            <div className="col-lg-2 birthday-col">{el.born_date}</div>
                            <div className="col-lg-2">{el.contacts}</div>
                        </div>
                    })
                    }
                </div>:
                <div className={"col-lg-12 search_results"}>
                    <div className="row">
                        {/*<div className="col-lg-2 first-col">*/}
                        {/*    <p><strong>Номер карты</strong></p>*/}
                        {/*</div>*/}
                        {/*<div className="col-lg-4">*/}
                        {/*    <p><strong>ФИО</strong></p>*/}
                        {/*</div>*/}
                        {/*<div className="col-lg-2 birthday-col">*/}
                        {/*    <p><strong>Дата рождения</strong></p>*/}
                        {/*</div>*/}
                        {/*<div className="col-lg-2">*/}
                        {/*    <p><strong>Номер телефона</strong></p>*/}
                        {/*</div>*/}
                    </div>
                    {this.state.patients.map((el, index) => {
                        let med_card = el.card_number;
                        // если номер < 8 знаков, дополняем сначала нулями
                        return <Link onClick={() => this.parent.setState({
                            searchActive: false,
                        })} to={`/cards/${el.user_id}`} className="row" key={index}>
                            <div className="col-lg-2 first-col">
                                {el.card_number}
                            </div>
                            <div className="col-lg-4">{el.name}</div>
                            <div className="col-lg-2 birthday-col">{el.born_date}</div>
                            <div className="col-lg-2">
                                {el.phone}
                            </div>
                        </Link>
                    })
                    }
                </div>
        );
    }
}

export default LiveSearch;
