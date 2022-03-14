import React from 'react'
import {BsFillMoonFill, BsFillSunFill} from 'react-icons/bs'
import { Link, Outlet } from 'react-router-dom'
import { useGlobal } from '../contest'

export default function Navbar() {

  const {state, dispatch} = useGlobal()

  return <>
    <nav>
        <ul className='link-container'>
            <li className="items"><Link to='/' className='logo-link'>Where in the world?</Link></li>
            <li className='items'><button className='btn-theme' onClick={() => dispatch({type: 'CHANGE_THEME'})}>{state.isDark ? <BsFillSunFill className="theme-icon"/> : <BsFillMoonFill className="theme-icon"/>} <span className='theme-text'>{state.isDark ? 'light mode' : 'dark mode'}</span></button></li>
        </ul>
        
    </nav>
    <Outlet />
  </>
}
