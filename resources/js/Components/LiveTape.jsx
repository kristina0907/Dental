import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Axios from 'axios';
import Event from '@material-ui/icons/Event';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
}));
const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export default function ScrollableTabsButtonPrevent() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [livepatient, setLivepatient] = useState(false);

  useEffect(() => {
    if(!livepatient){
      getLiveFeed();

    }
  },[]);

  const getLiveFeed = async () => {
    let eventsPatient =  await Axios.get("/api/shedule/get/livefeed");

    setLivepatient(eventsPatient.data);
	}

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [expanded, setExpanded] = useState('');

  const handleChangeAccord = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="container_live_tape">
    <div className={classes.root}>
      <AppBar position="static" className="live_appBar">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="off"
          aria-label="scrollable prevent tabs example"
          className="live_appBar_tabs"
        >
          <Tab icon={<Event />} aria-label="favorite" {...a11yProps(1)} />
          <Tab icon={<PhoneIcon />} aria-label="phone" {...a11yProps(0)} />

        </Tabs>
      </AppBar>
      <TabPanel value={value} index={1}>
      <div className="excellent_receptions">
        <div className="item_life_patient postponed">
            <div className="">
                <div>Ткачева Антонина</div>
                <div>+7 (123) 456-78-90</div>
                <div className="item_cancel">
                  <div>Отказ от преёма:</div>
                  <div>Перенесли в лист ожидания:</div>
                </div>
            </div>
            <div className="">
                <div><b>Дата:</b><span>29.08.20</span></div>
                <div><b>Время:</b><span>11:05-11:15</span></div>
                <div><b>Врач:</b><span>Иванов И.И.</span></div>
            </div>
        </div>
      </div>
      <div className="excellent_receptions">
        <div className="item_life_patient add_error">
            <div className="">
                <div>Ткачева Антонина</div>
                <div>+7 (123) 456-78-90</div>
                <div className="item_cancel">
                  <div>Отказ от преёма:</div>
                  <div>Перенесли в лист ожидания:</div>
                </div>
            </div>
            <div className="">
                <div><b>Дата:</b><span>29.08.20</span></div>
                <div><b>Время:</b><span>11:05-11:15</span></div>
                <div><b>Врач:</b><span>Иванов И.И.</span></div>
            </div>
        </div>
      </div>
      <div className="excellent_receptions">
        <div className="item_life_patient canceled_doctor">
            <div className="">
                <div>Ткачева Антонина</div>
                <div>+7 (123) 456-78-90</div>
                <div className="item_cancel">
                  <div>Отказ от преёма:</div>
                  <div>Перенесли в лист ожидания:</div>
                </div>
            </div>
            <div className="">
                <div><b>Дата:</b><span>29.08.20</span></div>
                <div><b>Время:</b><span>11:05-11:15</span></div>
                <div><b>Врач:</b><span>Иванов И.И.</span></div>
            </div>
        </div>
      </div>
      <div className="excellent_receptions">
        <div className="item_life_patient renouncement">
            <div className="">
                <div>Ткачева Антонина</div>
                <div>+7 (123) 456-78-90</div>
                <div className="item_cancel">
                  <div>Отказ от преёма:</div>
                  <div>Перенесли в лист ожидания:</div>
                </div>
            </div>
            <div className="">
                <div><b>Дата:</b><span>29.08.20</span></div>
                <div><b>Время:</b><span>11:05-11:15</span></div>
                <div><b>Врач:</b><span>Иванов И.И.</span></div>
            </div>
        </div>
      </div>
      </TabPanel>
      <TabPanel value={value} index={0}>
      <div>
      {livepatient ? (
          Object.keys(livepatient).map((id) => {
              return (

                <Accordion className="typography_live" square expanded={expanded === 'panel'+id} onChange={handleChangeAccord('panel'+id)}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                  <Typography component={'div'}>
                    <div className="item_life_patient">
                        <div className="">
                            <div>{livepatient[id].name}</div>
                            <div>{livepatient[id].phone}</div>
                        </div>
                        <div className="">
                            <div><b>Дата:</b><span>{livepatient[id].date}</span></div>
                            <div><b>Время:</b><span>{livepatient[id].time}</span></div>
                            <div><b>Врач:</b><span>{livepatient[id].doctorname}</span></div>
                        </div>
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="item_btn_life_patient">
                  <Typography component={'div'}>
                    <div className="btn_life_patient">
                      <div>Оповестить</div>
                      <div>Отменить приём</div>
                      <div className="live_link_card">К Карточке</div>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              )
          })
      ): (null)
      }
     </div>
      </TabPanel>

    </div>
    </div>
  );
}
