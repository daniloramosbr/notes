import "./createbutton.css";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const navigate = useNavigate();

  function CreateNote() {
    navigate("/create");
  }
  return (
    <button className="button-create" onClick={CreateNote}>
      <ion-icon name="add-circle-outline"></ion-icon>
    </button>
  );
}
