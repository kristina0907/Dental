import Moment from 'react-moment';
import moment from 'moment/min/moment-with-locales';
import 'moment/locale/ru';
import {now} from "moment";

export const diffDate = (first_date, last_date) => {
    let first = moment(first_date).unix();
    let last = moment(last_date).unix();
    return first > last;
}

export const cutInitials = (string) => {
    let newString = '';
    let stringArray = string.split(" ");
    stringArray.map((value, index) => {
        index === 0 ? newString += value+' ': newString += value.charAt(0)+'.';
    });

    return newString;
}

export const intervals = (smena) => {
    let list = [
        {
            "smena": 1,
            "times": [
                "09:00",
                "09:30",
                "10:00",
                "10:30",
                "11:00",
                "11:30",
                "12:00",
                "12:30",
                "13:00",
                "13:30",
                "14:00",
            ]
        },
        {
            "smena": 2,
            "times": [
                "14:30",
                "15:00",
                "15:30",
                "16:00",
                "16:30",
                "17:00",
                "17:30",
                "18:00",
                "18:30",
                "19:00",
                "19:30",
            ]
        }
    ]

    if (smena){
        return list.filter(item => item.smena === smena)[0];
    } else {
        return list;
    }
}
export const findSmenaFromInterval = (interval) => {
    function withInterval(smena){
        let result;
        smena.times.forEach(time => {
            if (time === interval){
                result = smena;
            }
        });
        return result;
    }
    return intervals().find(withInterval);
}

export const getIntervalsAfterTime = (interval) => {
    let result = [];
    intervals().map(smena => {
       smena.times.map(time => {
          if (moment(interval,'HH:mm').unix() < moment(time, 'HH:mm').unix()){
              result.push(time);
          }
       });
    });
    return result;

}
