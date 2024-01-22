import Header from "../../header/header";
import Onecontent from "../onecontent/onecontent";
import "./content.css";
import Create from "../createbutton/createbutton";
import { useEffect, useState } from "react";
import ApiController from "../../controllers/ApiController";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Content() {
  const navigate = useNavigate();
  const cookie = Cookies.get("token");
  const decode = jwtDecode(cookie);
  const { id, user } = decode;

  const [showNotes, setShowNotes] = useState(false);
  const [showNothing, setNothing] = useState(false);
  const [showLoading, setLoading] = useState(false);
  const [notes, setNotes] = useState(false);

  const [res, setRes] = useState({});

  useEffect(() => {
    const url = window.location.href;

    if (url != `http://localhost:3000/notes/${user}`) {
      navigate("/error");
      return;
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
  }, []);

  console.log(res.length);
  return (
    <div className="content">
      <Header />
      <div className="cont-content">
        <div className="content-main">
          <Create />

          <div className="my-notes">
            <h1 hidden={notes}>SUAS NOTAS:</h1>
          </div>

          {showLoading ? <h3>CARREGANDO...</h3> : ""}

          {showNothing ? <h3>VOCÊ AINDA NÃO TEM NOTAS</h3> : ""}

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
