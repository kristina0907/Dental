import React, {useEffect, useState} from "react";
import {Grid, Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import NotificationIcon from "../media/header/notification.svg";
import {cutInitials} from "./helpers";

import store from "../../store";
import { connect } from 'react-redux';
import {logout} from "../../actions/authActions";

const handleLogout = () => {
    store.dispatch(logout());
}

function HeaderRight({account}) {
    const [getVisibleMenu,setVisibleMenu] = useState(false);

    const styles = useStyles();
    return(
        <Grid container alignItems={"center"} className={styles.header} justify={"space-between"}>
            {/*<Box className={styles.notification}>*/}
            {/*    <img src={NotificationIcon} alt="notification_icon"/>*/}
            {/*</Box>*/}
            <Box className={styles.user} onClick={()=>setVisibleMenu(!getVisibleMenu)}>
                <img className={styles.avatar} src={`/storage/${account.photo}`}/>
                <Box className={styles.info}>
                    <Box className={styles.fio}>{cutInitials(account.name)}</Box>
                    <Box className={styles.role}>{account.roles[0].name_ru}</Box>
                </Box>
                <Box className={styles.arrow}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0)">
                            <path d="M6.32926 9.09683L11.8704 3.55571C12.0475 3.37227 12.0425 3.07995 11.859 2.90279C11.6801 2.72995 11.3964 2.72995 11.2175 2.90279L6.0028 8.11745L0.788142 2.90279C0.60784 2.72251 0.315523 2.72251 0.135221 2.90279C-0.0450554 3.08312 -0.0450554 3.3754 0.135221 3.55571L5.67634 9.09683C5.85667 9.27711 6.14896 9.27711 6.32926 9.09683Z" fill="black"/>
                        </g>
                        <defs>
                            <clipPath id="clip0">
                                <rect width="12" height="12" fill="white" transform="translate(12) rotate(90)"/>
                            </clipPath>
                        </defs>
                    </svg>
                </Box>
            </Box>
            {getVisibleMenu?
                <Box className={"header_right_menu"}>
                    <Box className={"button"} onClick={() => handleLogout()}>Выйти</Box>
                </Box>
                :null}
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    account: state.auth.user
});

export default connect(mapStateToProps, {})(HeaderRight)

const useStyles = makeStyles((theme) => ({
    header: {minHeight: "80px",position:"relative"},
    notification: {paddingLeft: "10px", cursor: "pointer"},
    user: {display: "flex", flexWrap: "nowrap", cursor: "pointer"},
    arrow:{
        marginTop:"6px",
        marginLeft:"23px"
    },
    avatar: {
        width: "40px",
        height: "40px",
        borderRadius: "100%",
        marginRight: "15px",
        objectFit: "cover",
        maxWidth: "40px",
        maxHeight: "40px"
    },
    info: {display: "flex", flexDirection: "column"},
    fio: {
        // fontFamily: "AvantGardeCTT",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "16px",
        lineHeight: "20px",
        color: "#000000"
    },
    role: {
        // fontFamily: "AvantGardeCTT",
        fontStyle: "normal",
        fontSize: "12px",
        lineHeight: "20px",
        color: "#000000"
    }
}))
