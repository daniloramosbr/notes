import { useContext } from 'react'
import './info.css'
import { ContextJsx } from '../../context/context'
import Header from '../header/header'

export default function Info() {

  const {data} = useContext(ContextJsx)

  return (

    <div className="cont-info">
      <Header/>

     <div className='main-info'>

    <div className='cont-main-info'>
      <h1>
        {data.title}
      </h1>
      <div>
       {data.note}
      </div>
    </div>

     </div>

    </div>
  )
}
