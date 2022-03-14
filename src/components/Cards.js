import React from 'react'
import { useGlobal } from '../contest'
import { Link } from 'react-router-dom'
import Loading from './Loading'

export default function Cards() {
  const { countryList } = useGlobal()

  if (countryList.length === 0 ) {
    return <Loading/>
  } 
  return (
    <section className='cards'>
      {countryList.length > 0 && countryList.map((country, index) => {
         return <section className="card" key={index}>
         <div className="img-container">
           <Link to={`/country/${country.name.common}`}>
              <img src={country.flags.png} alt={country.name.common} />
           </Link>
         </div>
         <div className="footer">
           <Link to={`/country/${country.name.common}`}><h3 className="footer-title">{country.name.common}</h3></Link>
           <p className='population'>Population: {country.population}</p>
           <p className='region'>Region: {country.region}</p>
           <p className='capital'>{country.capital ? 'Capital: ' + country.capital : ''}</p>
         </div>
       </section>
     })}
    </section>
  )
}
