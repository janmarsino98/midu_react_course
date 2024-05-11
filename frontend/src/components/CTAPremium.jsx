import React, { useState } from "react";
import { UserContext } from "./CurrentUserContext";
import { useContext } from "react";
import { GiConsoleController } from "react-icons/gi";
import BACK_ADRESS from "../../back_address";

const CTAPremium = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const handleClick = async () => {
    try {
      const response = await fetch(
        `${BACK_ADRESS}/verify_user/${currentUser.username}`,
        { method: "PUT" }
      );
      const data = await response.json();
      const newUser = { ...currentUser, is_verified: "true" };
      setCurrentUser(newUser);
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  return (
    currentUser &&
    !currentUser.is_verified && (
      <div className="CTAContainer">
        <h4>Verifica tu perfil</h4>
        <h1></h1>
        <p>
          Verifica tu perfil para desbloquear nuevas funciones y, si eres
          elegible, recibir un pago de cuota de ingresos por anuncios.
        </p>
        <div className="CTAButtonContainer">
          <button
            className="CTAButton"
            onClick={() => handleClick()}
            hidden={!currentUser || (currentUser && currentUser.is_verified)}
          >
            Verificar
          </button>
        </div>
      </div>
    )
  );
};

export default CTAPremium;
