import { useState } from "react";
import "./App.css";
import Usercard from "./components/Usercard";
import TweetFeed from "./components/TweetFeed";

function App() {
  return (
    <>
      <TweetFeed
        userNumber={35271042}
        name="Name1"
        userName="username"
        tweetText="
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem natus, deserunt deleniti eaque eos quam est velit itaque nulla consequuntur aut fuga cumque, facilis quo possimus provident modi. Odio maiores, culpa at quisquam deleniti pariatur. Nesciunt, magnam. Natus, quisquam esse."
      ></TweetFeed>
    </>
  );
}

export default App;
