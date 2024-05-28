import "./login.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import ApiController from "../controllers/ApiController";
import Header from "../header/header";

export default function Signin() {
  const [error, setError] = useState(false);
  const [ErrLogin, setErrLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const HandleChange = (event) => {
    setDataForm((dataForm) => ({
      ...dataForm,
      [event.target.name]: event.target.value,
    }));
  };

  async function GetSignin() {
    if (!dataForm.email || !dataForm.password) {
      setError(true);

      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }

    setLoading(true);

    try {
      const res = await ApiController.ValidLogin(
        dataForm.email,
        dataForm.password
      );

      Cookies.set("token", res.data, { expires: 1 });

      const decode = jwtDecode(res.data);

      const { user } = decode;

      navigate(`/notes/${user}`);

      setLoading(false);
    } catch (error) {
      if (error) {
        setErrLogin(true);
        setLoading(false);

        setTimeout(() => {
          setErrLogin(false);
        }, 3000);
      }
    }
  }

  function GoSignUp() {
    navigate("/notes/signup");
  }

  return (
    <div className="login">
      <Header/>
      <div className="login-cont">
        <main className="login-main">
          <h2 className="title">FAZER LOGIN:</h2>
          <form onSubmit={HandleChange} className="form-input">
            <div> <ion-icon name="mail-outline"></ion-icon>
              <input
                name="email"
                placeholder="Email:"
                onChange={HandleChange}
              />
            </div>
            <div> <ion-icon name="lock-closed-outline"></ion-icon>
              <input
                name="password" type="password"
                placeholder="Senha:"
                onChange={HandleChange}
              />
            </div>
          </form>
          {error && (
            <div className="error">
              <span> ERRO, PREENCHA TODOS OS CAMPOS!</span>
            </div>
          )}
          {ErrLogin && (
            <div className="error">
              <span> ERRO: SENHA OU USUARIO INCORRETOS!</span>
            </div>
          ) }
          {loading && <div className="load"><div class="spinner"></div></div> }
          <div className="buttons">
            <button onClick={GetSignin}>ENTRAR</button>
            <button onClick={GoSignUp}> CRIAR NOVA CONTA</button>
          </div>
        </main>
      </div>
    </div>
  );
}
