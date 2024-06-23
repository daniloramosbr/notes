import { useContext } from "react";
import { ContextJsx } from "../../context/context";
import { useState } from "react";
import ApiController from "../controllers/ApiController";
import './edit.scss'
import Header from "../header/header";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export default function Edit() {

  const cookie: any = Cookies.get("token");
  const decode: any = jwtDecode(cookie);
  const { user } = decode;
  const [loading, setLoading] = useState(false)


  const navigate = useNavigate()
  const [showError, setShowError] = useState(true);

  const { data } = useContext(ContextJsx);

  const [dataForm, setDataForm] = useState({
    titulo: data.title,
    texto: data.note,
  });

  const HandleChange = (event: any) => {
    setDataForm((dataForm) => ({
      ...dataForm,
      [event.target.name]: event.target.value,
    }));
  };

  async function UpdateText() {
    if (!dataForm.texto || !dataForm.titulo) {
      setShowError(false);

      setTimeout(() => {
        setShowError(true);
      }, 3000);

      return;
    }

    try {
      setLoading(true)
      await ApiController.PatchNotes(dataForm.titulo, dataForm.texto, data.id);
      navigate(`/notes/${user}`);
    } catch (error) {
      console.log(error);
    }
  }

  async function DeleteNote() {

    try {
     await ApiController.DeleteNotes(data.id);
      
      navigate(`/notes/${user}`)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="edit-cont">
       <Header/>
      <div className="edit-main">
       
        <div className="cont-main-edit">
          <h1>EDITAR NOTA:</h1>
          <form onSubmit={HandleChange} className="inputs-note">
            <div>
              <label htmlFor="titulo">TITULO DA NOTA:</label>
              <input
                name="titulo"
                value={dataForm.titulo}
                onChange={HandleChange}
              />
            </div>
            <div>
              <label htmlFor="texto">TEXTO:</label>
              <textarea
              className="text-input"
                name="texto"
                value={dataForm.texto}
                onChange={HandleChange}
              />
            </div>
                
              </form >
              {loading &&<div className="load"><div className="spinner"></div></div> }
          {!showError && (
            <div className="error">
              <span>ERRO: PREECHA TODOS OS CAMPOS!</span>
            </div>
          ) }
          <div className="edit-note">
            <button onClick={UpdateText}>EDITAR NOTA</button>
          </div>
          <div className="delete-note">
  <button onClick={DeleteNote}>APAGAR NOTA</button>
</div>
          
        </div>
      </div>
    </div>
  );
}
