import { useState } from "react";
import "./create.scss";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Header from "../header/header";
import ApiController from "../controllers/ApiController";

export default function Create() {
  
  const cookie = Cookies.get("token");
  const decode = jwtDecode(cookie);
  const { id, user } = decode;
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const [dataForm, setDataForm] = useState({
    user: id,
    titulo: "",
    texto: "",
  });

  const [error, setError] = useState(false);

  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );

    setDataForm({
      user: "",
      titulo: "",
      texto: "",
    });
  };

  const HandleChange = (event) => {
    setDataForm((dataForm) => ({
      ...dataForm,
      [event.target.name]: event.target.value,
    }));
  };

  async function CreateNote() {
    if (!dataForm.titulo || !dataForm.texto) {
      setError(true);

      setTimeout(() => {
        setError(false);
      }, 3000);

      return;
    }

    try {
      setLoading(true)
      await ApiController.PostNotes(
        dataForm.user,
        dataForm.titulo,
        dataForm.texto
      );
      setLoading(false)
      navigate(`/notes/${user}`);
    } catch (error) {
      console.log(error.message);
      setLoading(false)
    }

    handleReset();
  }

  return (
    <div className="create-cont">
      <Header />
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
              <input
                name="texto"
                onChange={HandleChange}
              />
            </div>
          </form>
          {loading &&<div className="load"><div class="spinner"></div></div> }
          <div className="button-create">
            <button onClick={CreateNote}>CRIAR NOTA</button>
          </div>
        
          {error && (
            <div
              style={{
                color: "red",
              }}
            >
              ERRO, PREENCHA TODOS OS CAMPOS!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
