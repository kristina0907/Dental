import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import React, {useState, useEffect} from "react";
import {
	BrowserRouter as Router,

	Route, Switch
} from "react-router-dom";
import Appoint from "../Appoints/Appoint";
import "../Appoints/Appoint.css";
import SearchPatientsForm from "../Appoints/Search/SearchPatientsForm";
import MedicalCard from "../MedicalCard/MedicalCard";
import PatientCard from "../MedicalCard/PatientCard/PatientCard";
import Navigation from "../Navigation";
import NotFound from '../NotFound';
import IconButton from '@material-ui/core/IconButton';
import Notifications from '@material-ui/icons/Notifications';
import Prices from "../Prices/Prices";
import CRMHistory from "../CRM/CRMHistory";
import CRMTasks from "../CRM/CRMTasks";
import CRMAssignedTask from "../CRM/CRMAssignedTask";
import CRMNewsletters from "../CRM/CRMNewsletters";
import CRMWaitingList from "../CRM/CRMWaitingList";
import MaterialsMoving from "../Materials/AddMaterals/MaterialsMoving";
import MaterialsWaybill from "../Materials/AddMaterals/MaterialsWaybill";
import JournalMaterials from "../Materials/JournalMaterials";
import ReportsMaterial from "../Materials/ReportsMaterial";
import DirectoryMaterials from "../Materials/DirectoryMaterials";
import ReportsMarketingPatients from "../Reports/Marketing/Patients";
import ReportsAdminConversion from "../Reports/Marketing/AdminConversion";
import ReportsBillsPayment from "../Reports/Finance/BillsPayment";
import AdvertisingChannels from "../Reports/Marketing/AdvertisingChannels";
import Cashbox from "../Cashbox/Cashbox";
import Login from "../Auth/Login";
import {Box, CircularProgress} from "@material-ui/core";

import Personnel from "../Personnel/Personnel";
import {connect} from "react-redux";
import {loadUser, login} from "../../actions/authActions";
import store from "../../store";
import {createMuiTheme, makeStyles, ThemeProvider} from "@material-ui/core/styles";
import PersonnelCard from "../Personnel/PersonnelCard";
import CreatePersonnelCard from "../Personnel/CreatePersonnelCard";
import Settings from "../Settings/Settings";

import Index from '../Index/Index'


const Fundament = ({ isAuthenticated, isLoading, user, roles }) => {
    const [loading, setLoading] = useState(true);
    const mainStyles = useMainStyles();

    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    useEffect(() => {
        if (isAuthenticated !== null){
            setLoading(false);
        }
    }, [isAuthenticated]);

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <Router>
                    {!isLoading && !loading ?
                        isAuthenticated ?
                            <Grid container>
                                    <Navigation />
                                    <Box className={mainStyles.root}>
                                        <Grid container className="content">
                                            {/*Route list start*/}
                                            <Switch>
                                                <Route exact path="/" component={Index} />
                                                {/*<Route exact path="/">*/}
                                                {/*    <Appoint />*/}
                                                {/*</Route>*/}
                                                <Route exact path="/cards">
                                                    <MedicalCard/>
                                                </Route>
                                                <Route exact path="/cards/:patientId">
                                                    <PatientCard/>
                                                </Route>
                                                <Route exact path="/prices">
                                                    <Prices />
                                                </Route>
                                                <Route exact path="/cashbox">
                                                    <Cashbox />
                                                </Route>
                                                <Route exact path="/reports/marketing/patient">
                                                    <ReportsMarketingPatients />
                                                </Route>
                                                <Route exact path="/reports/marketing/adminConversion">
                                                    <ReportsAdminConversion />
                                                </Route>
                                                <Route exact path="/reports/marketing/advertisingChannels">
                                                    <AdvertisingChannels />
                                                </Route>
                                                <Route exact path="/reports/finance/payment">
                                                    <ReportsBillsPayment />
                                                </Route>
                                                <Route exact path="/crm/history">
                                                    <CRMHistory />
                                                </Route>
                                                <Route exact path="/crm/tasks">
                                                    <CRMTasks />
                                                </Route>
                                                <Route exact path="/crm/tasks/assigned">
                                                    <CRMAssignedTask />
                                                </Route>
                                                <Route exact path="/crm/newsletters">
                                                    <CRMNewsletters />
                                                </Route>
                                                <Route exact path="/crm/waitingList">
                                                    <CRMWaitingList />
                                                </Route>
                                                <Route exact path="/materials/add/moving">
                                                    <MaterialsMoving />
                                                </Route>
                                                <Route exact path="/materials/add/waybill">
                                                    <MaterialsWaybill />
                                                </Route>
                                                <Route exact path="/materials/journal">
                                                    <JournalMaterials />
                                                </Route>
                                                <Route exact path="/materials/reports">
                                                    <ReportsMaterial />
                                                </Route>
                                                <Route exact path="/materials/directory">
                                                    <DirectoryMaterials />
                                                </Route>
                                                <Route exact path="/personnel">
                                                    <Personnel />
                                                </Route>
                                                <Route exact path="/personnel/create">
                                                    <CreatePersonnelCard />
                                                </Route>
                                                <Route exact path="/personnel/:employeId">
                                                    <PersonnelCard/>
                                                </Route>
                                                <Route exact path="/settings">
                                                   <Settings />
                                                </Route>
                                                <Route path="*">
                                                    <NotFound />
                                                </Route>
                                            </Switch>
                                        </Grid>
                                    </Box>
                                </Grid>: <Login />
                            :<Grid container className={mainStyles.container}>
                                <Grid item xs={12} sm={12} className={mainStyles.center}>
                                    <CircularProgress color="primary" />
                                </Grid>
                            </Grid>
                    }
                </Router>
            </ThemeProvider>
        </React.Fragment>
    );
}
const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#3B80D6"
        }
    }
});
const useMainStyles = makeStyles(() => ({
    root: {
      flexGrow: 1
    },
    container: {
        minHeight: '100vh',
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

}));
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
    user: state.auth.user,
    roles: state.auth.roles,
});
export default connect(mapStateToProps, { login })(Fundament);
