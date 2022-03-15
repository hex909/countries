import React, { useState } from 'react'
import { useGlobal } from '../contest'

import {BiSearch} from 'react-icons/bi'
import {MdKeyboardArrowDown} from 'react-icons/md'



export default function Search() {
    const {state, fetchDataByName, dispatch, fetchByRegion,countryName,setCountryName} = useGlobal()
    const [filterList, setFilterList] = useState(false)
    const regionList = ['all', 'africa','americas','asia','europe','oceania']
    
    function handleSub(e) {
        e.preventDefault()
        if (countryName !== '') {
            fetchDataByName(countryName)
        }
   }

    function showFilter() {
        setFilterList(s => !s)
    }

    function filterByRegion(id) {
        showFilter()
        dispatch({type: 'SHOW_BY_REGION', region: id})
        setCountryName('')
        fetchByRegion(id)
    }
    
    return (
    <section className="search-and-filter">
        <div className="search">
                <form onSubmit={handleSub} className='input-field'>
                    <BiSearch className='searchicon' />
                    <input className='input' placeholder='Search for a country...' type="text" onChange={e => setCountryName(e.target.value)} value={countryName}/>
                </form>    
        </div>

        <div className="filter">
        {/* Africa, Americas, Asia, Europe, Oceania */}
            <div className="filter-by" onClick={showFilter}>
                <h4>{ state.region || 'Filter By Region'}</h4>
                <MdKeyboardArrowDown className='downarrow'/>
            </div>
            <div className="filter-option">
                <ul className={`filter-list ${filterList && 'show'}`}>
                    {regionList.map((r, i) => <li key={i} id={r} onClick={(e) => filterByRegion(e.target.id)}>{r}</li>)}
                </ul>
            </div>
        </div>
    </section>
  )
}
