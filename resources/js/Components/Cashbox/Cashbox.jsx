import React, { useState, useEffect } from 'react';
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import { connect } from 'react-redux';
import {getDevices} from "../../actions/cashboxAction";
import Header from "../helpers/Header";
import HeaderRight from "../helpers/HeaderRight";
import IncomingCall from "../IncomingCall";
import Vector from "../Appoints/media/Vector";
import DepositMoney from "../helpers/DepositMoney";
import store from "../../store";


function Cashbox({devices}) {
    const styles = useStyles();
    const [hideBtnClicked, sethideBtnClicked] = useState({
        "block_1": false,
    });
    const [getVisibleDepositMoney,setVisibleDepositMoney] = useState(false);

    useEffect(() => {
        store.dispatch(getDevices());
    },[]);

    console.log(devices);

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md={3} lg={3} xl={2}>
                <Grid item xs={12} className={styles.wrapper_component}>
                    <IncomingCall />
                </Grid>
            </Grid>
            <Grid item xs={12} md={9} lg={9} xl={10}>
                <Grid item xs={12} className={"wrapper_component"}>
                    <Grid item xs={12} md={9} xl={9}>
                        <Box>
                            <Header breadcrumb={
                                {
                                    "pageTitle": "Касса",
                                    "links":[
                                        {"url": "/", "title": "Главная"},
                                        {"url": "/cashbox", "title": "Касса"}
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
                <Grid item xs={12} md={9} className={styles.wrapper_component}>
                    <Grid item className={`contaoner-info container_materials`}>
                        {hideBtnClicked.block_1 ? null : (
                            <div className="hide-shedule-btn">
                                <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_1: true})}/>
                            </div>
                        )}
                        {!hideBtnClicked.block_1? (
                            <>
                            <div className="title_material_table">Состояние работы</div>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} md={4} xl={4}>
                                        <div className="image_cashbox">
                                            <img src="/media/cashbox.png" alt=""/>
                                        </div>
                                        <div className="btn_container_cash">
                                            <button className={"btn_close_shift"}>Закрыть смену</button>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={4} xl={4}>
                                        <div className="form_container_cash">
                                            <select name="" id="">
                                                <option value="">АТОЛ СИГМА 10</option>
                                            </select>
                                            <select name="" id="">
                                                <option value="">Кассир</option>
                                            </select>
                                        </div>
                                        <div className="btn_container_cash">
                                            <button className={"btn_deposit_money"} onClick={() => setVisibleDepositMoney(true)}>Внести денежные средства</button>
                                        </div>
                                        <DepositMoney getVisible={getVisibleDepositMoney} visible={setVisibleDepositMoney}/>
                                    </Grid>
                                    <Grid item xs={12} md={4} xl={4}>
                                        <div className="form_container_cash">
                                            <select name="" id="">
                                                <option value="">Вид отчета</option>
                                            </select>
                                            <button className={"btn_print_report"}>Напечатать отчет</button>
                                        </div>
                                        <div className="btn_container_cash">
                                            <button className={"btn_give_out_money"}>Выдать денежные средства</button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </>
                        ) : (
                            <div className={`show-shedule-btn`}>
                                <div className={`row ${classes.center}`}>
                                    <div className="col-lg-5 left-line">
                                        <hr />
                                    </div>
                                    <div className="col-lg-1 circle-btn">
                                        <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_1: false})}>
                                            <Vector />
                                        </button>
                                    </div>
                                    <div className="col-lg-5 right-line">
                                        <hr />
                                    </div>
                                </div>
                            </div>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

const mapStateToProps = (state) => ({
    devices: state.cashbox.items
});

export default connect(mapStateToProps, { getDevices })(Cashbox);


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',

    },
    wrapper_component: {
        marginBottom: "20px"
    }
}));
