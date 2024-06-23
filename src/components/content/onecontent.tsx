import { useContext } from "react";
import { ContextJsx } from "../../context/context";
import { useNavigate } from "react-router-dom";

interface info {
  title: string;
  note: string;
  id: string;
}


export default function Onecontent({ title, note, id }: info) {
  const navigate = useNavigate();

  const { setData } = useContext(ContextJsx);

  return (
    <div className="one-container"
      
      onClick={() => {
        const dat = {
          title: title,
          note: note,
          id: id,
        };

        setData(dat);
        navigate(`/edit/${title}`);
      }}
    >
      <h2>{title}</h2>
    </div>
  );
}