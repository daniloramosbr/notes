import './buttonedit.css'
import { useNavigate } from 'react-router-dom'

export default function ButtonEdit({title}) {

  const navigate = useNavigate()

  function EditNote() {
   
navigate(`/edit/${title}`)
    
  }

  return (
    <button className='edit' onClick={EditNote}>
      <ion-icon name="pencil-outline"></ion-icon>
    </button>
  )
}
