import "./home.scss";
import { useNavigate } from "react-router-dom";
import Header from "../header/header";

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
       <Header/>
      <div className="cont-home">
     
        <main className="home-main">
         
          <h1>BLOCO DE NOTAS <ion-icon name="reader-outline"></ion-icon></h1>

          <div className="buttons">
            <button onClick={GoSignIn}>FAZER LOGIN</button>
            <button onClick={GoSignUp}>CRIAR CONTA</button>
          </div>

        </main>
      </div>

    </div>
  );
}
