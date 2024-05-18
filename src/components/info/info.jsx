import { useContext, useState } from "react";
import "./info.css";
import { ContextJsx } from "../../context/context";
import Header from "../header/header";
import ApiController from "../controllers/ApiController";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function Info() {

  const token = Cookies.get('token')
  const decode = jwtDecode(token)
  const {id, user} = decode

  const navigate = useNavigate();
  const { data } = useContext(ContextJsx);
  async function DeleteNote() {
    try {
      ApiController.DeleteNotes(data.id);
      navigate(`/notes/${user}`)
     
    } catch (error) {
      console.log(error);
    }
  }

  function EditNote() {
    navigate(`/edit/${data.title}`);
  }

  return (
    <div className="cont-info">
      <Header />
      <div className="main-info">
      <div className="cont-main-info">

<div className="title-info">

<button className="edit" onClick={EditNote}>
  <ion-icon name="pencil-outline"></ion-icon>
</button>
  <h1>{data.title}</h1>
  <h3 className="note-info">{data.note}</h3>
</div>
<div className="delete-note">
  <button onClick={DeleteNote}>APAGAR NOTA</button>
</div>
</div>
      </div>
    </div>
  );
}
