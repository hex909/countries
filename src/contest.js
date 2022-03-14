import React, { useContext,  useEffect,  useReducer, useRef, useState} from "react";

const AppContest = React.createContext()

const urls = {regionUrl: 'https://restcountries.com/v3.1/region/', nameUrl: 'https://restcountries.com/v3.1/name/', allUrl: 'https://restcountries.com/v3.1/all', listCode: 'https://restcountries.com/v3.1/alpha?codes='}

function reducer(state, action) {
    if (action.type === 'CHANGE_THEME') {
      return {...state, isDark: !state.isDark }
    }

    else if (action.type === 'SHOW_BY_REGION') {
      return {...state, region: action.region }
    }
    else if (action.type === 'TO_ALL') {
      return {...state, region: 'all' }
    }
    return state
  }
  
  
  const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, {isDark: false, region: ''})
    const [countryList, setCountryList] = useState([])
    const [message, setMessage] = useState('Loading')
    const body = useRef(document.querySelector('body'))
        
    async function fetchData(url) {
      setMessage('Loading...')
      try {
        const responce = await fetch(url)
        if (responce.ok) {
          const data = await responce.json()
          setCountryList(data)
        }else {
          setMessage('Not Found')
          throw new Error('Not Found')
        }
      }
      catch {
        setCountryList([])
      }
    }

    function fetchDataByName(method) {
      let url = urls.nameUrl + method
      fetchData(url)
      dispatch({type: 'TO_ALL'})
    }

    function fetchByRegion(region) {
      let url = urls.regionUrl + region
      if (region === 'all') {
        fetchData(urls.allUrl)
        return
      }
      fetchData(url)
    }

  useEffect(() => {
    fetchData(urls.allUrl)
  },[])

  useEffect(() => {
    body.current.className = `${state.isDark ? 'dark': 'light'}`  
  },[state.isDark])

  return <AppContest.Provider value={{state, dispatch, countryList, fetchDataByName, message, fetchByRegion, urls, setMessage}}>{children}</AppContest.Provider>
}

const useGlobal = () => {
    return useContext(AppContest)
}

export {useGlobal, AppProvider}