import React from "react";
import {useForm} from "react-hook-form";
import store from "../../store";
import {cabinetCreate, getBranches} from "../../actions/settingsActions";
import { IconButton, SvgIcon } from '@material-ui/core';

export default function BranchDetail({branch}) {
    const { register, handleSubmit, watch, errors } = useForm();
    const onCabinetCreate = data => store.dispatch(cabinetCreate(data));
    const handleRemoveCabinet = (id) => {
        axios
            .get(`/api/settings/cabinet/delete/${id}`)
            .then(response => {
                store.dispatch(getBranches())
            })
    }
    return(
        <div className={"branch-item__content"}>
            <div className="block__settings cabinet-create">
                <form onSubmit={handleSubmit(onCabinetCreate)}>
                    <input ref={register} name={"branch_id"} value={branch.id} type={"hidden"}/>
                    <input ref={register({ required: true })} type={"text"} name={"name"} placeholder={"Номер кабинета"}/>
                    <select ref={register} name={"color"} placeholder={"Цвет"}>
                        <option value={"red"}>Красный</option>
                        <option value={"green"}>Зелёный</option>
                        <option value={"yellow"}>Жёлтый</option>
                    </select>
                    <button className={"primary"} type={"submit"}>Добавить кабинет</button>
                </form>
            </div>
            <div className="block__settings cabinet-list">
                {"cabinets" in branch && branch.cabinets.map(cabinet => {
                    return(
                        <div className="cabinet-item">
                            <div className="cabinet-item__name">{cabinet.name}</div>
                            <div className="cabinet-item__color">{cabinet.color}</div>
                            <IconButton disableRipple disableFocusRipple className={"cabinet-item__edit"} component="div">
                                <SvgIcon width={12} height={12} viewBox={"0 0 12 12"}>
                                    <g clip-path="url(#clip0)">
                                        <path d="M11.0301 4.33383L9.31506 2.68983L7.63506 1.00983L0.815063 7.82483L2.48456 9.49383L4.17556 11.1853L11.0301 4.33383Z" fill="#868789"/>
                                        <path d="M7.9886 0.656645L9.66859 2.33665L11.3761 3.97315C11.3781 3.97515 11.3791 3.97815 11.3811 3.98015L11.4606 3.90015C11.8101 3.55015 12.0026 3.08565 12.0011 2.59165C12.0001 2.10015 11.8076 1.63915 11.4601 1.29515L10.7061 0.541146C10.3611 0.192645 9.90009 0.000145508 9.40809 -0.000854492C9.40709 -0.000854492 9.40559 -0.000854492 9.40409 -0.000854492C8.91209 -0.000854492 8.44859 0.191145 8.0991 0.540645L7.9856 0.654646C7.9866 0.655645 7.9876 0.655645 7.9886 0.656645Z" fill="#868789"/>
                                        <path d="M0.64428 8.36084L0.0077803 11.5518C-0.0167197 11.6748 0.0212803 11.8018 0.11028 11.8903C0.18078 11.9608 0.27678 11.9998 0.37528 11.9998C0.39978 11.9998 0.42428 11.9973 0.44828 11.9923L3.63928 11.3558L0.64428 8.36084Z" fill="#868789"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0">
                                            <rect width="12" height="12" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </SvgIcon>
                            </IconButton>
                            <IconButton disableRipple disableFocusRipple onClick={() => handleRemoveCabinet(cabinet.id)} className={"cabinet-item__remove"} component="div">
                                <SvgIcon width={12} height={12} viewBox={"0 0 12 12"}>
                                    <g clip-path="url(#clip0)">
                                        <path d="M10.039 3.16991L9.77731 2.38554C9.72462 2.22767 9.57687 2.12122 9.41044 2.12122H2.58957C2.42314 2.12122 2.27539 2.22769 2.2227 2.38554L1.96098 3.16991C1.90168 3.34761 2.03394 3.53117 2.22127 3.53117H9.77872C9.96608 3.53117 10.0983 3.34761 10.039 3.16991Z" fill="#868789"/>
                                        <path d="M3.17853 11.5259C3.20853 11.7958 3.43671 12.0001 3.70835 12.0001H8.24862C8.52026 12.0001 8.74845 11.7958 8.77845 11.5259L9.58857 4.23499H2.36841L3.17853 11.5259Z" fill="#868789"/>
                                        <path d="M5.29431 1.00777C5.29431 0.839789 5.43097 0.703125 5.59895 0.703125H6.63463C6.8026 0.703125 6.93927 0.839789 6.93927 1.00777V1.4187H7.64239V1.00777C7.64239 0.452086 7.19031 0 6.63463 0H5.59895C5.04327 0 4.59119 0.452086 4.59119 1.00777V1.4187H5.29431V1.00777Z" fill="#868789"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0">
                                            <rect width="12" height="12" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </SvgIcon>
                            </IconButton>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
