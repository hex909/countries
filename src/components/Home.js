import React, { useState } from 'react'
import Cards from './Cards';
import Search from './Search'

export default function Home() {
    const [countryName, setCountryName] = useState('')
    return (
        <main>
        <Search countryName={countryName} setCountryName={setCountryName}/>
        <Cards  />
        </main>
    )
}
