import Grid from "@material-ui/core/Grid";
import React from "react";
import "../../../css/Dental.css";
import {
  BrowserRouter as Router
} from "react-router-dom";
import $ from "jquery";
import TableCards from "./TableCards";
import Vector from "../Appoints/media/Vector";

import { connect } from 'react-redux';
import { getPatients } from "../../actions/patientActions";
import PropTypes from 'prop-types';
import {Box} from "@material-ui/core";
import Calendar from "../Index/Calendar";
import SheduleFilter from "../Index/SheduleFilter";
import Shedule from "../Index/Shedule";
import LiveTape from "../Index/LiveTape";
import Header from "../helpers/Header";
import {makeStyles} from "@material-ui/core/styles";
import HeaderRight from "../helpers/HeaderRight";
import IncomingCall from "../IncomingCall";
// import mapStateToProps from "react-redux/lib/connect/mapStateToProps";



class MedicalCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideBtnClicked: false,
      pageName:"allCard",
      medicalCards: [],
      idPatient:"",
    };
  }

  componentDidMount() {
    this.getMedicalCard();
    this.props.getPatients();
  }

getMedicalCard = async () => {
  let res = await $.get("/api/patients/get");
  this.setState({medicalCards: res});
}
getItdPatient = async (id) => {
  this.setState({idPatient: id});
}
  hideShedule() {
    this.setState((prevState) => {
      return { hideBtnClicked: true };
    });
  }
  showShedule() {
    this.setState(() => {
      return { hideBtnClicked: false };
    });
  }
  goToPage = (value) => {
    this.setState({ pageName: value })
  }

  render() {
      const { patients } = this.props.patients;
      return (
          <Grid container spacing={4}>
              <Grid item xs={12} md={3} lg={3} xl={2}>
                  <Grid item xs={12}>
                      <IncomingCall />
                  </Grid>
              </Grid>
              <Grid item xs={12} md={9} lg={9} xl={10}>
                  <Grid item xs={12} className={"wrapper_component"}>
                      <Grid item xs={12} md={9} xl={9}>
                          <Box>
                              <Header breadcrumb={
                                  {
                                      "pageTitle": "Картотека",
                                      "links":[
                                          {"url": "/", "title": "Главная"},
                                          {"url": "/cards", "title": "Картотека"}
                                      ]
                                  }
                              }/>
                          </Box>
                      </Grid>
                      <Grid item xs={12} md={3} xl={3}>
                          <Box>
                              <HeaderRight />
                          </Box>
                      </Grid>
                  </Grid>
                  <Grid item xs={12}>
                      <div className="contaoner-info">
                          {this.state.hideBtnClicked ? null : (
                              <div className="hide-shedule-btn">
                                  <button onClick={() => this.hideShedule()}></button>
                              </div>
                          )}

                          {!this.state.hideBtnClicked && this.state.medicalCards.length != 0 ? (
                              <div className="main-schedule-title">
                                  <TableCards goToPage={this.goToPage} medicalCards={this.state.medicalCards} getItdPatient={this.getItdPatient}/>
                              </div>
                          ) : (
                              <div className="show-shedule-btn pb-4">
                                  <div className="row">
                                      <div className="col-lg-5 offset-lg-1 left-line">
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
                      </div>
                  </Grid>
              </Grid>
          </Grid>
      );
  }
}

MedicalCard.propTypes = {
    getPatients: PropTypes.func.isRequired,
    patients: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    patients: state.patients
});

export default connect(mapStateToProps, { getPatients })(MedicalCard);
