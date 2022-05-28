import React,{useState} from 'react'
import * as FaIcon from "react-icons/fa";
import * as AiIcon from "react-icons/ai";
import { Link } from 'react-router-dom'
import "./Navbar.css"
import {SidebarData} from './SidebarData'
import {IconContext} from 'react-icons'

function Navbar() {
  
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <IconContext.Provider value={{color: 'fff'}}>
      <div className="navbar">
        <Link to= "#" className='menu-bars' onClick={showSidebar}>
        <FaIcon.FaBars onClick={showSidebar}/>
        </Link>
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <div className='test'>
        <ul className='nav-menu-item' onClick={showSidebar}>
          <li className='nav-toggle'>
            <Link to="#" className='menu-bars'>
              <AiIcon.AiOutlineClose/>
            </Link>
          </li>
          {SidebarData.map((item,index) =>{
            return(
              <li key={index} className={item.cName} >
                <Link to ={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
        </div>
      </nav>
      </IconContext.Provider>
    </>
  )
}

export default Navbar