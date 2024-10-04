import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton() {
  const navigate = useNavigate(); // Move useNavigate inside the component
  return (
    <Button type="back" onClick={(e) => { e.preventDefault(); navigate(-1); }}>
      &larr; BACK
    </Button>
  );
}

export default BackButton;
