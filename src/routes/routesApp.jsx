import { BrowserRouter, Routes, Route } from "react-router-dom"
import Create from "../components/create/create"
import Info from "../components/info/info"
import Content from "../components/content/contentOfc/content"
import Edit from "../components/edit/edit"
import CreateLogin from "../components/login/createLogin"
import Signin from "../components/login/signin"

export default function RoutesApp() {
  
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/notes/:user" element={<Content/>} />
    <Route path="/info/:title" element={<Info/>} />
    <Route path="/create" element={<Create/>} />
    <Route path="/edit/:title" element={<Edit/>} />
    <Route path="/signup" element={<CreateLogin/>} />
    <Route path="/signin" element={<Signin/>} />

  </Routes>
  </BrowserRouter>
  )
}
