import React, { useState } from "react";
import UserContext from "./CurrentUserContext";
import { useContext } from "react";
import { GiConsoleController } from "react-icons/gi";

const CTAPremium = () => {
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = useContext(UserContext);
  const handleClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/verify_user/${currentUser.username}`,
        { method: "PUT" }
      );
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  return (
    <div className="CTAContainer">
      <h4>Verifica tu perfil</h4>
      <p>
        Verifica tu perfil para desbloquear nuevas funciones y, si eres
        elegible, recibir un pago de cuota de ingresos por anuncios.
      </p>
      <div className="CTAButtonContainer">
        <button className="CTAButton" onClick={() => handleClick()}>
          Verificar
        </button>
      </div>
    </div>
  );
};

export default CTAPremium;
