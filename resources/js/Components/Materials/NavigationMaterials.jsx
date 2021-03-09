import React from 'react'
import {BrowserRouter as Router, NavLink} from "react-router-dom";

function NavigationMaterials() {

  const navlist = [
      {
          "url": "/materials/add/moving",
          "title": "Добавить",
      },
      {
          "url": "/materials/journal",
          "title": "Журнал движения материалов",
      },
      {
          "url": "/materials/reports",
          "title": "Отчеты",
      },
      {
          "url": "/materials/directory",
          "title": "Справочник материалов",
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

export default NavigationMaterials;
