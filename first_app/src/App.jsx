import { useState } from 'react'
import './App.css'
import Usercard from './components/Usercard'

function App() {

  return (
    <>
    <div className='tw-followCard'>
      <h1>A quién seguir</h1>
      <Usercard name='kikobeats' userName='kikobeats' userNumber={35271041} />
      <Usercard name='midudev' userName='midudev' userNumber={35271042}/>
      <Usercard name='react' userName='react' userNumber={52205}/>
    </div>
    </>
  )
}

export default App
