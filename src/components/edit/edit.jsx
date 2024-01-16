
import { useContext } from "react";
import { ContextJsx } from "../../context/context";
import { useState } from "react";
import api from "../api/api";

export default function Edit() {

    const [update, setUpdate] = useState(false)

    const { data } = useContext(ContextJsx);

    const [dataForm, setDataForm] = useState({
        titulo: data.title,
        texto: data.note,
      });


    const HandleChange = (event) => {
        
        setDataForm((dataForm) => ({
          ...dataForm,
          [event.target.name]: event.target.value,
        }));
       
      };

     async function UpdateText() {

     try {

        api.PatchNotes(dataForm.titulo, dataForm.texto, data.id)

        setUpdate(true)

        console.log(res)
      
        
     } catch (error) {
        console.log(error)
     }
      }


  return (
    <div className="create-cont">
      <div className="create-main">
        <div className="cont-main-create">
          <h2>EDITAR NOTA:</h2>
          <form onSubmit={HandleChange}>
            <div>
              <label htmlFor="titulo">TITULO:</label>
              <input name="titulo" value={dataForm.titulo}  onChange={HandleChange} />
            </div>
            <div>
              <label htmlFor="texto">TEXTO:</label>
              <input name="texto" value={dataForm.texto} onChange={HandleChange} />
            </div>
          </form>
          <div>
            <button onClick={UpdateText}>EDITAR NOTA</button>
          </div>
          {update ? <div style={{
            color: 'green'
          }}>
            NOTA ATUALIZADA COM SUCESSO!
           </div> : ''}

        
        </div>
      </div>
    </div>
  )
}
