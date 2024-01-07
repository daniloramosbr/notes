import Header from "../header/header";
import Onecontent from "./onecontent/onecontent";
import "./content.css";
import Create from "./createbutton/createbutton";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Content() {

const [res, setRes] = useState({})

useEffect(()=> {
  

async function GetDados() {

  try {

    const data = await axios.get('https://api-notes-k22z.onrender.com/notes')
    
    setRes(data.data)
    
  } catch (error) {
    console.log(error)
  }
}

GetDados()

},[])


  return (
    <div className="content">
      <Header />
      <div className="cont-content">

        <div className="content-main">
        <Create/>

        <div className="my-notes">
          <h1>SUAS NOTAS:</h1>
        </div>
         {res.length > 1 ? res.map((note)=> {

                return (
                  <Onecontent key={note._id} title={note.title} note={note.note}/>
                )
              }) : <h3 style={{
                color: 'green'
              }
              }>CARREGANDO NOTAS...</h3>}
        
        </div>
      
      </div>
    </div>
  );
}
