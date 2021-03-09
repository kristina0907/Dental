import React from 'react'
import {BrowserRouter as Router, NavLink} from "react-router-dom";

function NavigationReports() {

    const navlist = [
        {
            "url": "/reports/marketing/patient",
            "title": "Маркетинг",
        },
        {
            "url": "/reports/finance/payment",
            "title": "Финансы",
        },
        {
            "url": "/reports/receptions",
            "title": "Приёмы",
        },
    ]
    return (
        <div className="navigation_materials">
            <ul>
                {(navlist).map((link, key) => {
                    return(
                        <li key={key}>
                            <NavLink
                                to={link.url}
                                activeClassName="active">
                                {link.title}
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default NavigationReports;
