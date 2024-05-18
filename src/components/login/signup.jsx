import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import ApiController from "../controllers/ApiController";

export default function SignUp() {
  const [error, setError] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [dataForm, setDataForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const HandleChange = (event) => {
    setDataForm((dataForm) => ({
      ...dataForm,
      [event.target.name]: event.target.value,
    }));
  };

  async function PostDados() {
    if (!dataForm.email || !dataForm.password || !dataForm.username) {
      setError(false);

      setTimeout(() => {
        setError(true);
      }, 3000);
      return;
    }

    setLoading(true)

    try {
      const res = await ApiController.PostUser(dataForm);

      Cookies.set("token", res.data, { expires: 1 });
      setLoading(false)
      navigate("/create");
    } catch (error) {
      console.log(error.message);
    }
  
  }

  function GoSignIn() {
    navigate("/notes/signin");
  }

  return (
    <div className="login">
      <div className="login-cont">
        <main className="login-main">
          <h2 className="title">CRIE SUA CONTA:</h2>
          <form onSubmit={HandleChange}>
            <div>
              <input
                name="username"
                placeholder="Usuário:"
                onChange={HandleChange}
              />
            </div>
            <div>
              <input
                name="email"
                placeholder="Email:"
                onChange={HandleChange}
              />
            </div>
            <div>
              <input
                name="password" type="password"
                placeholder="Senha:"
                onChange={HandleChange}
              />
            </div>
          </form>
          {!error && (
            <div className="error">
              <span> ERRO, PREENCHA TODOS OS CAMPOS!</span>
            </div>
          ) }
         {loading && <div className="load"><div class="spinner"></div></div> }
          <div className="buttons">
            <button onClick={PostDados}>CADASTRAR</button>
            <button onClick={GoSignIn}>JÁ TEM CONTA? </button>
          </div>
        </main>
      </div>
    </div>
  );
}
