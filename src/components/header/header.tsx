import { jwtDecode } from "jwt-decode";
import "./header.scss";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

interface IntrinsicElements {
  "ion-icon": any;
}

export default function Header() {
  const navigate = useNavigate();

  const token: any = Cookies.get("token");

  const decoded: any = token && jwtDecode(token) 

  const { user } = decoded != undefined && decoded;

  const LogoutNotes = () => {
    Cookies.remove("token");
    navigate("/notes");
  };

  return (
    <div className="header">
      <h1 className="title">
        BLOCO DE NOTAS <ion-icon name="reader-outline"></ion-icon>
      </h1>

      {decoded && (
        <div className="user">
          <div className="user-icon">
            <ion-icon name="person-circle-outline"></ion-icon>
            <span>{user}</span>
          </div>
          <div className="logout">
            <button onClick={LogoutNotes}>SAIR</button>
          </div>
        </div>
      )}
    </div>
  );
}
