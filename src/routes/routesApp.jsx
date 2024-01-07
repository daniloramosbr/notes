import { BrowserRouter, Routes, Route } from "react-router-dom"
import Content from "../components/content/content"
import Create from "../components/create/create"
import Info from "../components/info/info"

export default function RoutesApp() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/notes" element={<Content/>} />
    <Route path="/info/:title" element={<Info/>} />
    <Route path="/create" element={<Create/>} />
  </Routes>
  </BrowserRouter>
  )
}
