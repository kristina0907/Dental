import React, {useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Vector from "../Appoints/media/Vector";
import categorySettings from "../media/json/categorySettings.json";
import {Box, SvgIcon} from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';


const AntSwitch = withStyles((theme) => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
        margin: 'auto',
    },
    switchBase: {
        padding: 2,
        color: "#ffffff",
        '&$checked': {
            transform: 'translateX(12px)',
            color: "#F4F7FA",
            '& + $track': {
                opacity: 1,
                backgroundColor: "#3B80D6",
                borderColor: "#3B80D6",
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid #DFE6EE`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: "#F4F7FA",
    },
    checked: {},
}))(Switch);

export default function AccessRights() {
    const mainStyles = useMainStyles();
    const [hideBtnClicked, sethideBtnClicked] = useState({
        "block_1": false,
        "block_2": false,
        "block_3": false,
        "block_4": false,
    });
    const [category, setcategory] = React.useState();
    const setCategoryActive = (activeCategry) => {
        setcategory(activeCategry);
    }
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedC: true,
        checked1:false
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md={3} lg={3} xl={2}>
                <Grid item xs={12} className={mainStyles.wrapper_component}>
                    <div className="filter_material">
                        {hideBtnClicked.block_3 ? null : (
                            <div className="hide-shedule-btn">
                                <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_3: true})}/>
                            </div>
                        )}
                        {!hideBtnClicked.block_3? (
                            <div>
                                <div className="title_filter">Фильтр</div>
                                <form action="">
                                    <select name="" id="">
                                        <option value="1">Филиал</option>
                                    </select>
                                    <select name="" id="">
                                        <option value="1">Роль</option>
                                    </select>
                                    <select name="" id="">
                                        <option value="1">Все</option>
                                    </select>
                                    <div className="container_btn_filter">
                                        <button type={"submit"} className="btn_filter">Применить</button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className={`show-shedule-btn`}>
                                <div className={`row ${mainStyles.center}`}>
                                    <div className="col-lg-5 left-line">
                                        <hr />
                                    </div>
                                    <div className="col-lg-1 circle-btn">
                                        <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_3: false})}>
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
            <Grid item xs={12} md={9} lg={9} xl={10}>
                <Grid item xs={12} className={mainStyles.wrapper_component}>
                    <div className={`contaoner-info`}>
                                {hideBtnClicked.block_1 ? null : (
                                    <div className="hide-shedule-btn">
                                        <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_1: true})}/>
                                    </div>
                                )}
                                {!hideBtnClicked.block_1? (
                                    <div>
                                        <div className="title_show_block">Категории</div>
                                        <div className="category_list_settings">

                                            {
                                                Object.keys(categorySettings).map((group) => {
                                                    let groupList = categorySettings[group];
                                                    return (
                                                        <div>
                                                            <div className={`item_category_setting ${category && category.id === groupList.id ? 'active' : ''}`} onClick={() => setCategoryActive(groupList)} >
                                                                <div className="image_category_material">
                                                                    {
                                                                        Object.keys(groupList.buttons).map((id) => {
                                                                            let button = groupList.buttons[id];
                                                                            return(

                                                                                <SvgIcon className="post_svg" viewBox={groupList.viewBox}>
                                                                                    {
                                                                                        Object.keys(button.icon).map((id) => {
                                                                                            let icon = button.icon[id];
                                                                                            return(
                                                                                                <path d={icon.d} fill={icon.fill}/>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </SvgIcon>

                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                                <div>{groupList.label}</div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                    </div>
                                ) : (
                                    <div className={`show-shedule-btn`}>
                                        <div className={`row ${mainStyles.center}`}>
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
                            </div>
                </Grid>
                <Grid item xs={12} className={mainStyles.wrapper_component}>
                    <div className={`contaoner-info`}>
                        {hideBtnClicked.block_2 ? null : (
                            <div className="hide-shedule-btn">
                                <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_2: true})}/>
                            </div>
                        )}
                        {!hideBtnClicked.block_2? (
                            <div>

                                <TableContainer className="table_settings">
                                    <Table
                                        aria-labelledby="tableTitle"
                                        aria-label="enhanced table"
                                    >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell />
                                                <TableCell>Иванов И.И.</TableCell>
                                                <TableCell>Иванов И.И.</TableCell>
                                                <TableCell>Иванов И.И.</TableCell>
                                                <TableCell>Иванов И.И.</TableCell>
                                                <TableCell>Иванов И.И.</TableCell>
                                                <TableCell>Иванов И.И.</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="category_settings_title">Картотека</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checked1} onChange={handleChange} name="checked1" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checked1} onChange={handleChange} name="checked1" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checked1} onChange={handleChange} name="checked1" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checked1} onChange={handleChange} name="checked1" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checked1} onChange={handleChange} name="checked1" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checked1} onChange={handleChange} name="checked1" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Просмотр всех пациентов</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="category_settings_title_bold">Редактирование карты пациента</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Изменение начального остатка</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Просмотр адресов пациентов</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Просмотр документов пациента</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="category_settings_title_bold">Просмотр фотографий</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Управление фотографиями в карточке</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="category_settings_title">Просмотр своего расписания</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checked1} onChange={handleChange} name="checked1" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checked1} onChange={handleChange} name="checked1" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checked1} onChange={handleChange} name="checked1" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checked1} onChange={handleChange} name="checked1" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checked1} onChange={handleChange} name="checked1" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checked1} onChange={handleChange} name="checked1" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Сменить врача</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checked1} onChange={handleChange} name="checked1" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checked1} onChange={handleChange} name="checked1" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checked1} onChange={handleChange} name="checked1" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checked1} onChange={handleChange} name="checked1" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checked1} onChange={handleChange} name="checked1" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checked1} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Управление приёмами</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checked1} onChange={handleChange} name="checked1" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checked1} onChange={handleChange} name="checked1" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checked1} onChange={handleChange} name="checked1" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checked1} onChange={handleChange} name="checked1" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checked1} onChange={handleChange} name="checked1" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checked1} onChange={handleChange} name="checked1" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="category_settings_title">Просмотр всех врачей</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Сменить врача</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="category_settings_title">Картотека</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="category_settings_title">Просмотр прейскуранта</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Редактирование услуг в прейскуранте</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>


                                            <TableRow>
                                                <TableCell className="category_settings_title">Просмотр раздела "Финансы"</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Редактирование счета</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Возврат по гарантии</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Просмотр оплат</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Разблокировка скидки на любую услугу</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                            <TableCell className="category_settings_title">Просмотр раздела "Отчеты"</TableCell>
                                            <TableCell>
                                                <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                            </TableCell>
                                            <TableCell> <Typography component="div">
                                                <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                            </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                            <TableRow>
                                                <TableCell className="category_settings_title_bold">Просмотр подраздела "Маркетинг"</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                            <TableCell>Пациенты</TableCell>
                                            <TableCell>
                                                <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                            </TableCell>
                                            <TableCell> <Typography component="div">
                                                <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                            </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                            <TableRow>
                                                <TableCell>Скидки</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="category_settings_title_bold">Просмотр подраздела "Финансы"</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Счета и оплаты</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Оказанные услуги</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Выручка по направлениям</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="category_settings_title_bold">Просмотр подраздела "Приёмы"</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Добавленные приёмы</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Завершенные приёмы</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="category_settings_title">Отмененные приёмы</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Предварительная запись</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Эффективность консультаций</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Загрузка вврачей</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Редактирование графика работы врачей</TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell> <Typography component="div">
                                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography component="div">
                                                        <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>


                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        ) : (
                            <div className={`show-shedule-btn`}>
                                <div className={`row ${mainStyles.center}`}>
                                    <div className="col-lg-5 left-line">
                                        <hr />
                                    </div>
                                    <div className="col-lg-1 circle-btn">
                                        <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_2: false})}>
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
const useMainStyles = makeStyles(() => ({
    flex: {
        display: 'flex',
    },
    mright: {
        marginRight: '25px',
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    grid: {
        margin: '10px 0',
    },
    paperLeft: {
        padding: '0 15px 0 0',
    },
    paperRight: {
        padding: '0 0 0 15px',
    },
    rpaper: {
        display: 'flex',
        justifyContent: 'center',
    },
    inputGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '30px 0 0 0 !important',
    },
    textArea: {
        minHeight: '60px',
    },
    textLabel: {
        fontSize: '.9rem',
    },
    buttonSave: {
        marginTop: '30px',
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#F6F7F8',
        background: '#3B80D6',
        borderRadius: '25px',
        border: 'none',
        padding: '8px 13px',
    },
    buttonGroup: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '40px !important',
    },

    card_container_left: {
        margin: '0 25px 25px 0',
    },
    card_container_right: {
        margin: '0 0 25px 25px',
    },
    wrapper_component: {
        marginBottom: "20px"
    }
}));
