import { useContext, useState } from "react";
import "./info.css";
import { ContextJsx } from "../../context/context";
import Header from "../header/header";
import api from "../api/api"; 
import ButtonEdit from "../buttonedit/buttonedit";

export default function Info() {

  const { data } = useContext(ContextJsx);
  const [info, setInfo] = useState(true);

  async function DeleteNote() {
    try {

      api.DeleteNotes(data.id)
      
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
           
            <ButtonEdit title={data.title}/>
          
            <h1>{data.title}</h1>
            <div>{data.note}</div>
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
