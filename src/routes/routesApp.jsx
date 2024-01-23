import { BrowserRouter, Routes, Route } from "react-router-dom"
import Create from "../components/create/create"
import Info from "../components/info/info"
import Content from "../components/content/contentOfc/content"
import Edit from "../components/edit/edit"
import SignUp from "../components/login/signup"
import Signin from "../components/login/signin"
import ErrorUrl from "../components/Error/error"
import Home from "../components/home/home"

export default function RoutesApp() {
  
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/notes" element={<Home/>} />
    <Route path="/notes/:user" element={<Content/>} />
    <Route path="/info/:title" element={<Info/>} />
    <Route path="/create" element={<Create/>} />
    <Route path="/edit/:title" element={<Edit/>} />
    <Route path="/notes/signup" element={<SignUp/>} />
    <Route path="/notes/signin" element={<Signin/>} />
    <Route path="/error" element={<ErrorUrl/>} />

  </Routes>
  </BrowserRouter>
  )
}
