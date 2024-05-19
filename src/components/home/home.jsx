import "./home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate()

  function GoSignIn() {
    navigate("/notes/signin");
  }

  function GoSignUp() {
    navigate("/notes/signup");
  }

  return (
    <div className="home">

      <div className="cont-home">

        <main className="home-main">

          <h1>BLOCO DE NOTAS</h1>

          <div className="buttons">
            <button onClick={GoSignIn}>FAZER LOGIN</button>
            <button onClick={GoSignUp}>CRIAR CONTA</button>
          </div>

        </main>
      </div>

    </div>
  );
}
