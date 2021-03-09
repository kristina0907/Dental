import React from "react";
import {Box, Grid, Breadcrumbs, Link, Typography} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import LiveSearch from "./LiveSearch";

export default function Header({breadcrumb}) {
    const styles = useStyles();
    return(
        <Grid container alignItems={"center"} className={styles.header}>
            <Grid item xs={12} sm={6} md={5} className={styles.wrapper}>
                <Box className={styles.pageTitle}>{breadcrumb.pageTitle}</Box>
                <Breadcrumbs separator="•" aria-label="breadcrumb" classes={{root: styles.breadcrumbs, separator: styles.separator}}>
                    {"links" in breadcrumb &&
                    breadcrumb.links.map((link, index) => {
                        return(
                            breadcrumb.links.length !== index + 1 ?
                                <NavLink to={link.url} className={styles.breadcrumb_link}>{link.title}</NavLink>
                                :<Link className={styles.breadcrumb_link_fake}>{link.title}</Link>
                        )
                    })}
                </Breadcrumbs>
            </Grid>
            <Grid item xs={12} sm={6} md={6} className={styles.search}>
                <LiveSearch />
            </Grid>
        </Grid>
    )
}

const useStyles = makeStyles((theme) => ({
    header: {minHeight: "80px"},
    wrapper: {},
    pageTitle: {
        width: "100%",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "28px",
        lineHeight: "36px",
        letterSpacing: "4px",
        textTransform: "uppercase",
        color: "#3F4A56"

    },
    breadcrumbs: {
        display: "flex",
        alignItems: "center",
        flexWrap: "nowrap",
    },
    separator: {
        color: "#F08786",
        fontSize: "20px"
    },
    breadcrumb_link: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        lineHeight: "16px",
        color: "#F08786",
        textDecoration: "none",
        "&:hover": {
            textDecoration: "none",
            color: "#F08786"
        }
    },
    breadcrumb_link_fake: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        lineHeight: "16px",
        color: "rgb(134, 135, 137)",
        textDecoration: "none",
        "&:hover": {
            textDecoration: "none",
            color: "rgb(134, 135, 137)"
        }
    },
    search: {
        "& input": {
            height: "55px"
        },
        "& .searchResults": {
            top: "60px",
            zIndex: 999999,
            boxShadow: "0px 3px 2px rgba(0, 0, 0, 0.1)"
        }
    }
}));
