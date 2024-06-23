import "./content.scss";
import Header from "../header/header";
import Onecontent from "./onecontent";
import { useEffect, useState } from "react";
import ApiController from "../controllers/ApiController";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ion-icon": any;
    }
  }
}

export default function Content() {
  const navigate = useNavigate();

  const token: any = Cookies.get("token");

  const decoded: any = token ? jwtDecode(token) : null

  const { id } = decoded && decoded;

  const [showNotes, setShowNotes] = useState(false);
  const [showNothing, setNothing] = useState(false);
  const [showLoading, setLoading] = useState(false);
  const [notes, setNotes] = useState(false);

  const [res, setRes] = useState([]);

  useEffect(() => {
    async function GetDados() {
      if (token == undefined) {
        //só entra se tiver logado
        navigate("/notes/signin");
      }

      setLoading(true);

      try {
        const ress: any = await ApiController.GetNotes(id);
        setRes(ress.data);
        setLoading(false);
        setShowNotes(true);

        if (ress.data.length == 0) {
          setNothing(true);
          setNotes(true);
        }
      } catch (error) {
        console.log(error);
      }
    }

    GetDados();
  }, []);

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
          {showLoading && (
            <div className="load">
              <div className="spinner"></div>
            </div>
          )}
          {showNothing && <h3>VOCÊ AINDA NÃO TEM NOTAS</h3>}

          {showNotes &&
            res.map((note: any) => {
              return (
                <Onecontent
                  key={note._id}
                  id={note._id}
                  title={note.title}
                  note={note.note}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
