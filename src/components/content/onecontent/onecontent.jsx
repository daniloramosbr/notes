import { useContext } from 'react'
import { ContextJsx } from '../../../context/context'
import './onecontent.css'
import { useNavigate } from 'react-router-dom'
export default function Onecontent({title, note}) {

  const navigate = useNavigate()

    const {setData} = useContext(ContextJsx)
  
  return (
    <div className="one-container" onClick={()=>{

      const dat = {
        title: title,
        note: note
      }
      
      setData(dat)
      navigate(`/info/${title}`)


    }}>
   <h2>{title}</h2>
    </div>
  )
}
