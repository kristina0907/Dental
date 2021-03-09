import React from 'react'
import {BrowserRouter as Router, NavLink} from "react-router-dom";

function NavigationCRM() {

  const navlist = [
      {
          "url": "/crm/history",
          "title": "История сообщений",
      },
      {
          "url": "/crm/tasks",
          "title": "Задачи для обзвона",
      },
      {
          "url": "/crm/newsletters",
          "title": "Рассылки",
      },
      {
          "url": "/crm/waitingList",
          "title": "Лист ожидания",
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

export default NavigationCRM;
