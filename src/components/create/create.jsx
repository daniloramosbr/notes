import { useState } from "react";
import "./create.css";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function Create() {

  const cookie = Cookies.get('token')
  const decode = jwtDecode(cookie);
  const {id, user} = decode

  const navigate = useNavigate()

  const [dataForm, setDataForm] = useState({
    user: id,
    titulo: "",
    texto: "",
  });

  const [create, setCreate] = useState(false)
  const [error, setError] = useState(false)


  const handleReset = () => {

    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    )

    setDataForm({
      user: "",
      titulo: "",
      texto: "",
    })

  };

  const HandleChange = (event) => {
    setDataForm((dataForm) => ({
      ...dataForm,
      [event.target.name]: event.target.value,
    }));
   
  };

  async function CreateNote() {

    if (!dataForm.titulo || !dataForm.texto) {

       setError(true)

       setTimeout(()=> {
        setError(false)
      }, 3000)

      return
    }


    try {

     const res = await api.PostNotes(dataForm.user, dataForm.titulo, dataForm.texto)

    console.log(dataForm)

      setCreate(true)

      setTimeout(()=> {
        setCreate(false)
      }, 3000)

      navigate(`/notes/${user}`)
    

    } catch (error) {
      console.log(error.message);
    }

    handleReset()
  
  }

  return (
    <div className="create-cont">
      <div className="create-main">
        <div className="cont-main-create">
          <h2>CRIAR NOVA NOTA</h2>

          <form onSubmit={HandleChange}>
            <div>
              <label htmlFor="titulo">TITULO:</label>
              <input name="titulo" onChange={HandleChange} />
            </div>
            <div>
              <label htmlFor="texto">TEXTO:</label>
              <input name="texto" onChange={HandleChange} />
            </div>
          </form>
          
          <div>
            <button onClick={CreateNote}>CRIAR NOTA</button>
          </div>
          {create ? <div style={{
            color: 'green'
          }}>
            NOTA CRIADA COM SUCESSO!
           </div> : ''}
           {error ? <div style={{
            color: 'red'
           }}>
          ERRO, PREENCHA TODOS OS CAMPOS!
           </div> : ''}

        
        </div>
      </div>
    </div>
  );
}
