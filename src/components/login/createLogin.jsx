import axios from "axios";
import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


export default function CreateLogin() {


  const navigate = useNavigate()
  
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

    try {

     const res = await axios.post('https://api-notes-k22z.onrender.com/signup', dataForm)

    Cookies.set('token', res.data , {expires: 1})

     navigate('/create')
      
    } catch (error) {
      console.log(error.message)
    }

  
  }

  return (
    <div className="login">
      <div className="login-cont">
        <main className="login-main">
          <div>
            CRIE SUA CONTA:
          </div>
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
                name="password"
                placeholder="Senha:"
                onChange={HandleChange}
              />
            </div>
          </form>

          <div>
            <button onClick={PostDados}>CADASTRAR</button>
          </div>
        </main>
      </div>
    </div>
  );
}
