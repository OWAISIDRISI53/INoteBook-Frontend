import React from "react";
import Capitalize from "../components/Capitalize";
import Notes from "../components/note/Notes";

const Home = () => {
  const userName = localStorage.getItem("user-name");
  // const name = userName.charAt(0).
  return (
    <main className="container my-3">
      {userName && <h1>hello {Capitalize(userName)}</h1>}
      <Notes />
    </main>
  );
};

export default Home;
