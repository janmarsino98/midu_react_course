import { UserContext } from "./CurrentUserContext";
import { useContext } from "react";
import BACK_ADRESS from "../../back_address";

const CTAPremium = () => {
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
      <div className="border border-gray-main-borders rounded-xl mb-2 text-white px-4">
        <h4 className="text-tweet-message font-bold py-3">
          Verifica tu perfil
        </h4>
        <h1></h1>
        <p>
          Verifica tu perfil para desbloquear nuevas funciones y, si eres
          elegible, recibir un pago de cuota de ingresos por anuncios.
        </p>
        <div className="py-3">
          <button
            className="rounded-full px-4 py-2 font-bold bg-blue-main text-white "
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
