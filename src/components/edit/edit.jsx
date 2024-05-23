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

  const cookie = Cookies.get("token");
  const decode = jwtDecode(cookie);
  const { user } = decode;


  const navigate = useNavigate()
  const [showError, setShowError] = useState(true);

  const [update, setUpdate] = useState(false);

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
    if (!dataForm.texto || !dataForm.titulo) {
      setShowError(false);

      setTimeout(() => {
        setShowError(true);
      }, 3000);

      return;
    }

    try {
      ApiController.PatchNotes(dataForm.titulo, dataForm.texto, data.id);

      setUpdate(true);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="edit-cont">
       <Header/>
      <div className="edit-main">
       
        <div className="cont-main-edit">
          <h2>EDITAR NOTA:</h2>
          <form onSubmit={HandleChange}>
            <div>
              <label htmlFor="titulo">TITULO:</label>
              <input
                name="titulo"
                value={dataForm.titulo}
                onChange={HandleChange}
              />
            </div>
            <div>
              <label htmlFor="texto">TEXTO:</label>
              <input
                name="texto"
                value={dataForm.texto}
                onChange={HandleChange}
              />
            </div>
          </form >
          {!showError && (
            <div className="error">
              <span>ERRO: PREECHA TODOS OS CAMPOS!</span>
            </div>
          ) }
          <div className="edit-note">
            <button onClick={UpdateText}>EDITAR NOTA</button>
          </div>
          {update && (
            <h3
              style={{
                color: "#fffff",
              }}
            >
              <div className="edit-note">
              NOTA ATUALIZADA COM SUCESSO!
              <button onClick={(()=>{
                navigate(`/notes/${user}`)
              })}>VOLTAR</button>

              </div>
             
            </h3>
          ) }
        </div>
      </div>
    </div>
  );
}
