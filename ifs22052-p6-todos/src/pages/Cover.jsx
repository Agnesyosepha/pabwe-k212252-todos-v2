import React from "react";
import { useNavigate } from "react-router-dom";

const Cover = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/home");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20%" }}>
      <h1>Welcome to the App!</h1>
      <p>
        Todo App PABWE 6 - 2024.
        <br /> Click below to continue.
      </p>
      <button
        onClick={handleContinue}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Continue
      </button>
    </div>
  );
};

export default Cover;
