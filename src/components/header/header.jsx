import { jwtDecode } from "jwt-decode";
import "./header.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const user = Cookies.get("token");
  const decode = jwtDecode(user);

  const LogoutNotes = () => {
    Cookies.remove("token");
    navigate("/notes/signin");
  };

  return (
    <div className="header">
      <h1 className="title">BLOCO DE NOTAS</h1>

      <div className="user">
        <div className="user-icon">
          <ion-icon name="person-circle-outline"></ion-icon>
          <h4>Olá {decode.user}</h4>
        </div>

        <div>
          <button onClick={LogoutNotes}>SAIR</button>
        </div>
      </div>
    </div>
  );
}
