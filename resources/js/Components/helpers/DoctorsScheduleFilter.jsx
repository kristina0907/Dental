import React, {useEffect, useState} from "react";
import store from "../../store";
import { connect } from 'react-redux';
import {getDoctorsScheduleFilter} from '../../actions/doctorsScheduleActions';

import moment, {now} from "moment";
import Skeleton from "@material-ui/lab/Skeleton";
import Vector from "../Appoints/media/Vector";
import {useForm} from "react-hook-form";

function DoctorsScheduleFilter({user, filter, filterData}) {
    const { register, handleSubmit } = useForm();
    const [hideBtnClicked, sethideBtnClicked] = useState({
        "filter_1": false
    });

    useEffect(() => {
        store.dispatch(getDoctorsScheduleFilter({
            "branch_id": user.employer_infos.branch_id,
            "current_date": moment(now()).format("DD-MM-YYYY")
        }));
    }, []);

    const [currentBranch, setCurrentBranch] = useState(parseInt(user.employer_infos.branch_id));
    const [currentProfession, setCurrentProfession] = useState(filter.data.professions && filter.data.professions.length ? parseInt(filter.data.professions[0].id):1);

    const filterSubmit = (data) => {
        filterData(data);
    }
    return(
        <div className="filters">
            {hideBtnClicked.filter_1 ? null : (
                <div className="hide-schedule-btn">
                    <button onClick={() => sethideBtnClicked({...hideBtnClicked, filter_1: true})}/>
                </div>
            )}
            {!hideBtnClicked.filter_1? (
                <div>
                    <div className="title_filter">Фильтры</div>
                    <form onSubmit={handleSubmit(filterSubmit)}>
                        <input type="hidden" ref={register} name={"current_date"} value={moment(now()).format('DD-MM-YYYY')}/>
                        {filter.loading && !filter.data.branches.length?
                            <Skeleton width={"100%"} height={"40px"} animation={"wave"}/>
                            :
                            <select ref={register} name="branch_id" defaultValue={currentBranch} onChange={(e) => setCurrentBranch(parseInt(e.target.value))}>
                                {filter.data.branches.map(branch => {
                                    return(
                                        <option value={branch.id}>{branch.title}</option>
                                    )
                                })}
                            </select>
                        }

                        {filter && !filter.data.professions.length?
                            <Skeleton width={"100%"} height={"40px"} animation={"wave"}/>
                            :
                            <select ref={register} name="profession_id" defaultValue={currentProfession} onChange={(e) => setCurrentProfession(parseInt(e.target.value))}>
                                {filter.data.professions.map(profession => {
                                    return(
                                        <option value={profession.id}>{profession.name}</option>
                                    )
                                })}
                            </select>
                        }

                        {filter.loading && !filter.data.doctors.length?
                            <Skeleton width={"100%"} height={"40px"} animation={"wave"}/>
                            :
                            <select ref={register} multiple={true} name="doctor_id">
                                {filter.data.doctors
                                    .filter(
                                        doctor =>
                                            doctor.employer_infos && doctor.employer_infos.branch_id !== null && doctor.employer_infos.branch_id === currentBranch
                                    )
                                    .map(doctor => {
                                        return (
                                            doctor.employer_infos.professions.map(profession => {
                                                return(
                                                    profession.id === currentProfession ? <option value={doctor.id}>{doctor.name}</option> : null
                                                )
                                            })
                                        )
                                    })
                                }
                            </select>
                        }
                        <div className="container_btn_filter">
                            <button type={"submit"} className="btn_filter">Применить</button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className={'show-schedule-btn'}>
                    <div className={'row d-flex-center'}>
                        <div className="col-lg-5 left-line">
                            <hr />
                        </div>
                        <div className="col-lg-1 circle-btn">
                            <button onClick={() => sethideBtnClicked({...hideBtnClicked, filter_1: false})}>
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
    )
}

const mapStateToProps = (state) => ({
    filter: state.doctorsSchedules.filter,
    user:  state.auth.user
})

export default connect(mapStateToProps, {getDoctorsScheduleFilter})(DoctorsScheduleFilter);
