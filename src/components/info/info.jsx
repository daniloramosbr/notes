import { useContext, useState } from "react";
import "./info.css";
import { ContextJsx } from "../../context/context";
import Header from "../header/header";
import ApiController from "../controllers/ApiController";
import ButtonEdit from "../buttonedit/buttonedit";

export default function Info() {
  const { data } = useContext(ContextJsx);
  const [info, setInfo] = useState(true);

  async function DeleteNote() {
    try {
      ApiController.DeleteNotes(data.id);

      setInfo(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="cont-info">
      <Header />

      <div className="main-info">
        {info ? (
          <div className="cont-main-info">
            <ButtonEdit title={data.title} />

           <div className="title-info"> <h1 >{data.title}</h1></div>

            <div className="note-info">{data.note}</div>
            <div>
              <button onClick={DeleteNote}>APAGAR NOTA</button>
            </div>
          </div>
        ) : (
          "APAGADO COM SUCESSO!"
        )}
      </div>
    </div>
  );
}
