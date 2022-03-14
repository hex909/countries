import React from 'react'
import { useGlobal } from '../contest'

export default function Loading() {
    const {message} = useGlobal()
  return (
    <div className='loading-container'>
        <h1>{message}</h1>
    </div>
  )
}
