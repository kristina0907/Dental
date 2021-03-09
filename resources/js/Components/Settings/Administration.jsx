import React, {useEffect} from "react";
import {
    Grid,
    Accordion,
    AccordionSummary,
    Button,
    MenuItem,
    Menu,
    Checkbox,
    FormControlLabel,
    SvgIcon, IconButton
} from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import store from "../../store";
import { getBranches, branchCreate } from "../../actions/settingsActions";
import BranchDetail from "./BranchDetail";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

function MoreIcon({index, branch_id}) {
    const handleRemoveBranch = (branch_id) => {
        axios
            .get(`/api/settings/branch/delete/${branch_id}`)
            .then(response => {
                store.dispatch(getBranches());
            });
    }

    return(
        <PopupState variant="popover" popupId={`menu_${index}`}>
            {(popupState) => (
                <React.Fragment>
                    <IconButton disableRipple disableFocusRipple component="div">
                        <SvgIcon width={4} height={16} viewBox={"0 0 4 16"} {...bindTrigger(popupState)}>
                            <circle cx="2" cy="2" r="2" fill="#B0BAC5"/>
                            <circle cx="2" cy="8" r="2" fill="#B0BAC5"/>
                            <circle cx="2" cy="14" r="2" fill="#B0BAC5"/>
                        </SvgIcon>
                    </IconButton>
                    <Menu {...bindMenu(popupState)}>
                        <MenuItem onClick={() => handleRemoveBranch(branch_id)}>Удалить</MenuItem>
                    </Menu>
                </React.Fragment>
            )}
        </PopupState>
    )
}

function Administration({branches, loading}){
    const { register, handleSubmit, watch, errors } = useForm();
    const onBranchCreate = data => store.dispatch(branchCreate(data));

    useEffect(() => {
        store.dispatch(getBranches());
    }, []);

    return(
        <Grid container spacing={4}>
            <Grid item xs={12} md={3} lg={3} xl={2} />
            <Grid item xs={12} md={9} lg={9} xl={10}>
                <div className="block">
                    <h2 className={"block__title"}>Филиалы и кабинеты</h2>
                    <div className={"block__settings branch-create"}>
                        <form onSubmit={handleSubmit(onBranchCreate)}>
                            <input ref={register({ required: true })} type={"text"} name={"name"} placeholder={"Название филиала"}/>
                            <input ref={register({ required: true })} type={"text"} name={"address"} placeholder={"Адрес"}/>
                            <button className={"primary"} type={"submit"}>Сохранить филиал</button>
                        </form>
                    </div>

                        {!loading && branches && branches.length?
                            <div className="block__settings branch-list">
                                {branches.map((branch, index) => {
                                    return(
                                        <Accordion className={"branch-item"}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls={`content_${index}`}
                                                className={"branch-item__title"}
                                                id={`branch_content_${index}`}
                                            >
                                                <div className="branch">
                                                    <div className="branch-name">{branch.title}</div>
                                                    <div className="branch-address">{branch.adress}</div>
                                                    <div className="branch-turn">Количество смен: {branch.smenas.length}</div>
                                                    <div className="branch-more">
                                                        <FormControlLabel
                                                            onClick={(event) => event.stopPropagation()}
                                                            onFocus={(event) => event.stopPropagation()}
                                                            control={<MoreIcon index={index} branch_id={branch.id} />}
                                                        />
                                                    </div>
                                                </div>
                                            </AccordionSummary>
                                            <BranchDetail branch={branch} />
                                        </Accordion>
                                    )
                                })}
                            </div>
                            :
                            branches && branches.length ?
                                <div className="block__settings branch-list">
                                    {branches.map(branch => {
                                        return(
                                            <Accordion className={"branch-item"}>
                                                <AccordionSummary
                                                    expandIcon={<Skeleton animation="wave"/>}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                    className={"branch-item__title"}
                                                >
                                                    <div className="branch">
                                                        <div className="branch-name"><Skeleton animation="wave" width="60%"/></div>
                                                        <div className="branch-address"><Skeleton animation="wave" width="60%"/></div>
                                                        <div className="branch-turn"><Skeleton animation="wave" width="60%"/></div>
                                                    </div>
                                                </AccordionSummary>
                                            </Accordion>
                                        )
                                    })}
                                </div>
                                :
                                <div className="block__settings branch-list">
                                    <Accordion className={"branch-item"}>
                                        <AccordionSummary
                                            expandIcon={<Skeleton animation="wave"/>}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            className={"branch-item__title"}
                                        >
                                            <div className="branch">
                                                <div className="branch-name"><Skeleton animation="wave" width="60%"/></div>
                                                <div className="branch-address"><Skeleton animation="wave" width="60%"/></div>
                                                <div className="branch-turn"><Skeleton animation="wave" width="60%"/></div>
                                            </div>
                                        </AccordionSummary>
                                    </Accordion>
                                    <Accordion className={"branch-item"}>
                                        <AccordionSummary
                                            expandIcon={<Skeleton animation="wave"/>}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            className={"branch-item__title"}
                                        >
                                            <div className="branch">
                                                <div className="branch-name"><Skeleton animation="wave" width="60%"/></div>
                                                <div className="branch-address"><Skeleton animation="wave" width="60%"/></div>
                                                <div className="branch-turn"><Skeleton animation="wave" width="60%"/></div>
                                            </div>
                                        </AccordionSummary>
                                    </Accordion>
                                    <Accordion className={"branch-item"}>
                                        <AccordionSummary
                                            expandIcon={<Skeleton animation="wave"/>}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            className={"branch-item__title"}
                                        >
                                            <div className="branch">
                                                <div className="branch-name"><Skeleton animation="wave" width="60%"/></div>
                                                <div className="branch-address"><Skeleton animation="wave" width="60%"/></div>
                                                <div className="branch-turn"><Skeleton animation="wave" width="60%"/></div>
                                            </div>
                                        </AccordionSummary>
                                    </Accordion>
                                </div>
                        }

                </div>
            </Grid>
        </Grid>

    )
}
const mapStateToProps = (state) => ({
    branches: state.settings.branches,
    loading: state.settings.loading
});
export default connect(mapStateToProps, {getBranches})(Administration);
