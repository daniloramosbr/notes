import Header from "../header/header";
import Onecontent from "./onecontent";
import "./content.css";
import { useEffect, useState } from "react";
import ApiController from "../controllers/ApiController";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Content() {
  
  const navigate = useNavigate()
  const cookie = Cookies.get("token");
  const decode = jwtDecode(cookie);
  const { id, user } = decode;

  console.log(user)

  const [showNotes, setShowNotes] = useState(false);
  const [showNothing, setNothing] = useState(false);
  const [showLoading, setLoading] = useState(false);
  const [notes, setNotes] = useState(false);

  const [res, setRes] = useState({});

  useEffect(() => {

    if (!user) {
      navigate('/notes/signin')
    }
  

    async function GetDados() {
      setLoading(true);

      try {
        const res = await ApiController.GetNotes(id);
        setRes(res.data);
        setLoading(false);
        setShowNotes(true);

        if (res.data.length == 0) {
          setNothing(true);
          setNotes(true);
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    GetDados();
  }, [])

  function CreateNote() {
    navigate("/create");
  }

  return (
    <div className="content">
      <Header />
      <div className="cont-content">
        <div className="content-main">
        <button className="button-create" onClick={CreateNote}>
      <ion-icon name="add-circle-outline"></ion-icon>
    </button>

          <div className="my-notes">
            <h2 hidden={notes}>SUAS NOTAS:</h2>
          </div>

          {showLoading &&<div className="load"><div class="spinner"></div></div> }

          {showNothing && <h3>VOCÊ AINDA NÃO TEM NOTAS</h3> }

          {showNotes
            ? res.map((note) => {
                return (
                  <Onecontent
                    key={note._id}
                    id={note._id}
                    title={note.title}
                    note={note.note}
                  />
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
}
