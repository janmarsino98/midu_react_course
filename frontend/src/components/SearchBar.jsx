import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import FollowCard from "./FollowCard";
import { MdDepartureBoard } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import BACK_ADRESS from "../../back_address";

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [input, setInput] = useState("");
  const [debounceTimeoutId, setDebounceTimeoutId] = useState(null);
  const [users, setUsers] = useState([]);

  const handleChange = (event) => {
    setInput(event.target.value);

    if (debounceTimeoutId) {
      clearTimeout(debounceTimeoutId);
    }

    setDebounceTimeoutId(
      setTimeout(() => {
        searchUsers(event.target.value);
      }, 500)
    );
  };

  const searchUsers = async (input) => {
    try {
      const response = await fetch(
        `${BACK_ADRESS}/users_by_text?text=${input}`
      );
      const newUsers = await response.json();
      setUsers(newUsers);
    } catch (error) {
      console.error("There was an error while fetching user by text: ", error);
    }
  };

  return (
    <>
      <div
        className="flex flex-row items-center border border-transparent bg-searchbar-bg mb-2 rounded-3xl focus-within:border-blue-main relative "
        onFocus={() => setIsFocused(!isFocused)}
        onBlur={() => setIsFocused(!isFocused)}
      >
        <div className="mx-3">
          <IoSearch color={isFocused ? "rgb(29,155,240)" : "white"} />
        </div>
        <input
          placeholder="Buscar"
          type="text"
          className="bg-transparent p-3 decoration-none pl-0 text-white w-full h-11 text-tweet focus:outline-none"
          onChange={handleChange}
        />
        <div className="px-3">
          {isFocused && (
            <IoMdCloseCircle
              size="20px"
              color="rgb(29,155,240)"
            ></IoMdCloseCircle>
          )}
        </div>

        <div className="block absolute top-12 z-90 shadow-searchbar-results rounded-xl w-full ">
          {users &&
            users.map((user) => {
              return (
                isFocused && (
                  <FollowCard
                    key={user._id}
                    name={user.name}
                    username={user.username}
                    avatar={user.avatar}
                    is_verified={user.is_verified}
                  ></FollowCard>
                )
              );
            })}
        </div>
      </div>
    </>
  );
};

export default SearchBar;
