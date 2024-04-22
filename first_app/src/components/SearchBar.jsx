import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import FollowCard from "./FollowCard";
import { MdDepartureBoard } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";

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
        `http://localhost:5000/users_by_text?text=${input}`
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
        className="searchBar-container"
        onFocus={() => setIsFocused(!isFocused)}
        onBlur={() => setIsFocused(!isFocused)}
      >
        <div className="searchBar-iconContainer">
          <IoSearch color={isFocused ? "rgb(29,155,240)" : "white"} />
        </div>
        <input
          placeholder="Buscar"
          type="text"
          className="searchBar-input"
          onChange={handleChange}
        />
        <div className="searchBar-iconContainer">
          {isFocused && (
            <IoMdCloseCircle
              size="20px"
              color="rgb(29,155,240)"
            ></IoMdCloseCircle>
          )}
        </div>
      </div>
      <div className="searchBarResults-Container">
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
    </>
  );
};

export default SearchBar;
