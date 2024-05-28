import { jwtDecode } from "jwt-decode";
import "./header.scss";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Header() {

  const navigate = useNavigate();
 
  const token = Cookies.get("token");

  const decode = token != undefined && jwtDecode(token)   //se token for diferente de undefined, faz o decoded

  const {user} = decode && decode

  const LogoutNotes = () => {
    Cookies.remove("token");
    navigate("/notes");
  };

  return (
    <div className="header">
      <h1 className="title">BLOCO DE NOTAS</h1>

     
    {decode &&  <div className="user">
        <div className="user-icon">
          <ion-icon name="person-circle-outline"></ion-icon>
          <h4>Olá <span>{user}</span>  </h4>
        </div>

        <div className="logout">
          <button onClick={LogoutNotes}>SAIR</button>
        </div>
      </div>
      }
    </div>
  );
}
