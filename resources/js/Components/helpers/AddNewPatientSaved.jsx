import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

export default function AddNewPatientSaved({close, patient}) {
    const classes = useStyles();

    return(
        (patient?
            <div className={`record-saved ${classes.root}`}>
                <div className={`container`}>
                    <div className={"row"}>
                        <div className={`col-lg-12 ${classes.justifyEnd}`}>
                            <IconButton
                                disableFocusRipple={true}
                                disableRipple={true}
                                aria-haspopup="false"
                                edge="end"
                                size={'small'}
                                onClick={close}
                                className={classes.close}
                            >
                                <CloseIcon />
                            </IconButton>
                        </div>
                    </div>
                    <div className="row">
                        <div className="row green-box">
                            <div className="succs-img">
                                {/*<Check />*/}
                            </div>
                            <div className="appoint">Запись создана</div>
                        </div>
                        <div className="row left-box">
                            <div className="col-lg-12">
                                <strong className="patient-name">{patient.name}</strong>
                            </div>
                            <div className="col-lg-7">
                                <div className="row">
                                    <div className="col-lg-12">Карта № {patient.card.id}</div>
                                    <div className="col-lg-12">{patient.card.born_date}</div>
                                    <div className="col-lg-12 phone">Телефон <strong>{patient.contacts.phone}</strong></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<Close />*/}
                </div>
            </div>
            :null)
    )
}
const useStyles = makeStyles(() => ({
    root: {
        position: 'initial',
        width: '500px',
        "& .container": {
            padding: "0 15px !important",
        }
    },
    close: {
        marginTop: '15px',
    },
    headers: {
        marginTop: 0,
        marginBottom: '25px',
    },
    alignCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    justifyEnd: {
        display: 'flex',
        justifyContent: 'flex-end',
    }
}))
