import { useState } from "react";
import "./create.css";
import axios from "axios";

export default function Create() {
  const [dataForm, setDataForm] = useState({
    titulo: "",
    texto: "",
  });

  const HandleChange = (event) => {
    setDataForm((dataForm) => ({
      ...dataForm,
      [event.target.name]: event.target.value,
    }));
   
  };

  async function CreateNote() {

    try {

      const res = await axios.post("https://api-notes-k22z.onrender.com/notes", {
        title: 'teste',
        note: 'note test'
      })

      console.log(res.data)
   
    } catch (error) {
      console.log(error.message);
    }
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
        </div>
      </div>
    </div>
  );
}
