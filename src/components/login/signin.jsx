import './login.css'
import { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export default function Signin() {


  const navigate = useNavigate()

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
try {
  
const res = await api.ValidLogin(dataForm.email, dataForm.password)

Cookies.set('token', res.data, {expires: 1})

const decode = jwtDecode(res.data)

const {user} = decode

navigate(`/notes/${user}`)

console.log(res.data)


} catch (error) {
  console.log(error.message)
}


  }

  return (
    <div className="login">
      <div className="login-cont">
        <main className="login-main">
          <div>
            FAZER LOGIN:
          </div>
          <form onSubmit={HandleChange}>
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
            <button onClick={GetSignin}>ENTRAR</button>
          </div>
        </main>
      </div>
    </div>
  )
}
