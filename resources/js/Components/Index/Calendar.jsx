import React, {useState, useEffect} from "react";
//import DatePicker from "react-datepicker";

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/ru';
import {Box, Grid} from "@material-ui/core";
import store from "../../store";
import {getCalendar} from "../../actions/sheduleActions";
import { connect } from 'react-redux';
import moment from 'moment/min/moment-with-locales';
import {now} from "moment";
import {getLiveTape} from "../../actions/livetapeActions";
import {makeStyles} from "@material-ui/core/styles";

function Calendar({dateNow,dateCurrent,traffic}){
    const styles = useStyles();
    const [selectedDay, setSelectedDay] = useState();
    const handleDayClick = (day) => {
        setSelectedDay(day);
        dateCurrent(day)
    }
    const handleMonthChange = (day) => {
        store.dispatch(getCalendar({'current_date':moment(day).format('DD-MM-YYYY')}));
    }

    useEffect(() => {
        store.dispatch(getCalendar({'current_date':moment(now()).format('DD-MM-YYYY')}));
    }, [])


    const [getDays, setDays] = useState();
    useEffect(() => {
        let out = [];
        if (traffic && "loading" in traffic){
            traffic.loading.forEach((day) => {
                let color = "";
                if (day.loading <= 15){
                    color = "green";
                } else if (day.loading >= 16 && day.loading <= 50){
                    color = "yellow";
                } else if (day.loading > 50) {
                    color = "red";
                } else {
                    color = 'green';
                }

                out.push({
                    "day": moment(day.date).format("D"),
                    "color": color
                })
            })
            setDays(out);
        }
    },[traffic]);

    function exist(currentDay){
        let result = false;
        Object.keys(getDays).map((stateDay) => {
            let getDay = getDays[stateDay];
            if (parseInt(getDay.day) === parseInt(currentDay)){
                result = getDay;
            }
        })

        return result;
    }
    function renderDay(day){
        let currentDay = moment(day).format("D");
        let renderDay = exist(currentDay);
        return(
            renderDay?
                <div className={`day ${renderDay.color}`}>{renderDay.day}</div>
            :
                <div className={"day no-colors"}>{currentDay}</div>
        )
    }

    return (
        <Grid container className={styles.wrapper_component}>
            <Grid item xs={12}>
                {"loading" in traffic && getDays !== undefined &&
                <DayPicker
                    localeUtils={MomentLocaleUtils}
                    locale={'ru'}
                    onDayClick={handleDayClick}
                    onMonthChange={handleMonthChange}
                    selectedDays={selectedDay}
                    renderDay={renderDay}
                />}
            </Grid>
        </Grid>

    );

}


const mapStateToProps = (state) => ({
    traffic: state.shedule.calendar
});

export default connect(mapStateToProps, { getCalendar })(Calendar);
const useStyles = makeStyles((theme) => ({
    wrapper_component: {
        borderRadius: "10px",
        backgroundColor: "#ffffff",
        padding: "15px",
        fontSize: "13px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)"
    }
}))
