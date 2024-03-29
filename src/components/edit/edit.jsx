import { useContext } from "react";
import { ContextJsx } from "../../context/context";
import { useState } from "react";
import ApiController from "../controllers/ApiController";

export default function Edit() {
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

      console.log(res);
    } catch (error) {
      console.log(error);
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
          </form>
          {!showError ? (
            <div className="error">
              <span>ERRO: PREECHA TODOS OS CAMPOS!</span>
            </div>
          ) : (
            ""
          )}
          <div>
            <button onClick={UpdateText}>EDITAR NOTA</button>
          </div>
          {update ? (
            <div
              style={{
                color: "green",
              }}
            >
              NOTA ATUALIZADA COM SUCESSO!
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
