import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import { useGlobal } from '../contest'
import Loading from './Loading'

export default function Country() {
    const {urls, setMessage} = useGlobal()
    const [country, setCountry] = useState([])
    const param = useParams()
    const [loader, setLoader] =useState(true)
    const [borderCommon, setBorderCommon] = useState([])

    const fetchBorder = async (url) => {
        const res = await fetch(url)
    if (res.ok) {
        const borderName = await res.json()
        setBorderCommon(borderName)
    }else {
        throw new Error('Not Found in Border')
    }
}

const fetchSingle = useCallback(async (nameUrl, type= null) => {
    try {
        if (type === null) {
            let url =  await nameUrl + param.country.toLowerCase() + '?fullText=true'
            const res = await fetch(url)
            const data = await res.json()
            setLoader(false)
            setCountry(data)
            let borders = await data[0]?.borders

            if (borders) {
                await fetchBorder(urls.listCode + borders.join(','))
            }
        }
        else {
            console.log('err');
            throw new Error('Not Found in Single')
        }
    }catch (err){
        console.log(err);
        setLoader(true)
        setMessage("Not Found")
        setCountry([])
    }}, [param.country, setMessage, urls.listCode])
    

    useEffect(() => {
        fetchSingle(urls.nameUrl)
    }, [fetchSingle, urls.nameUrl])

    function back() {
        window.history.back()
    }

  return <main>
        <div className="btn-container">
            <Link to={'#'} onClick={back} className={'btn btn-back'}><AiOutlineArrowLeft /> Back</Link>
        </div>

       {loader ? <Loading />: country.map( (data, index) => {
           const nativeNames = Object.keys(data.name.nativeName)
           const currencies = Object.keys(data.currencies)
           const languages = Object.values(data.languages)

        return <section className="single-country" key={index}>
            <div className="single-img-country">
                <img src={data.flags.png} alt={data.name.common} />
            </div>
            <div className="details">
                <h1 className='datails-title'>{data.name.common}</h1>
                <div className="more-details">
                    <p>Native Name: <span className='details-info'> {data.name.nativeName[nativeNames[0]].common}</span></p>
                    <p>Population: <span className='details-info'> {data.population}</span></p>
                    <p>Region: <span className='details-info'> {data.region}</span></p>
                    <p>Sub Region: <span className='details-info'> {data.subregion}</span></p>
                    <p>Capital: <span className='details-info'> {data.capital}</span></p>
                    <p>Top Level Domain: <span className='details-info'> {data.tld}</span></p>
                    <p>Currencies: <span className='details-info'> {data.currencies[currencies[0]].name}</span></p>
                    <p>Languages: <span className='details-info'> {languages.join(', ')}</span></p>
                </div>
                <div className="border">
                    <h5 className='border-title'>Border Countries: </h5>
                    {borderCommon.length > 0 ? borderCommon.map((border, i) => <Link className="btn btn-border" to={`/country/${border.name.common}`} key={i}>{border.name.common}</Link>) :<span className='details-info'>No Borders</span>}
                </div>
            </div>
        </section>})}
      </main>
    }


