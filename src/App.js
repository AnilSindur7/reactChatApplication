import React, { useState, useRef } from "react";
import "./App.css";
import { Auth } from "./components/Auth";
import { auth } from "./firebase-config";
import Cookies from "universal-cookie";
import { Chat } from "./components/Chat";
import { signOut } from "firebase/auth";
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRomm] = useState(null);

  const romminputRef = useRef(null);

  const SignUserOut = async () => {
    await signOut(auth);

    cookies.remove("auth-token");

    setIsAuth(false);

    setRomm(null);
  };

  if (!isAuth) {
    return (
      <div className="App">
        <h1>Hellow</h1>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <>
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="room ">
          <label>Enter Rome Name:</label>
          <input type="text" ref={romminputRef} />
          <button onClick={() => setRomm(romminputRef.current.value)}>
            Enter Chat
          </button>
        </div>
      )}
      <div className="sign-out">
        <button onClick={SignUserOut}>Sign Out</button>
      </div>
    </>
  );
}

export default App;
