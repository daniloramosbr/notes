import Header from "../../header/header";
import Onecontent from "../onecontent/onecontent";
import "./content.css";
import Create from "../createbutton/createbutton";
import { useEffect, useState } from "react";
import api from "../../api/api";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function Content() {

  const cookie = Cookies.get('token')
  const decode = jwtDecode(cookie);
  const {id} = decode

  const [res, setRes] = useState({});

  useEffect(() => {

    async function GetDados() {
      try {
        const res = await api.GetNotes(id);
        setRes(res.data);
        
      } catch (error) {

        console.log(error.message);
      }
    }

    GetDados();
  }, []);

console.log(cookie)

  return (
    <div className="content">
      <Header />
      <div className="cont-content">
        <div className="content-main">
          <Create />

          <div className="my-notes">
            <h1>SUAS NOTAS:</h1>
          </div>

          {res.length > 0 ? (
            res.map((note) => {
              return (
                <Onecontent
                  key={note._id}
                  id={note._id}
                  title={note.title}
                  note={note.note}
                />
              );
            })
          ) : (
            <h3
              style={{
                color: "green",
              }}
            >
              VOCE NAO TEM NOTAS...
            </h3>
          )}

        </div>
      </div>
    </div>
  );
}
