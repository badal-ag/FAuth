import './App.css';
import { useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase-config';

function App() {

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  // User Register

  const registerUser = async () => {

    try {
        const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
        alert("User Registered Successfully!")
    } catch (error) {
      alert("Oops! User not Registered. Check the Email & Try Again.")
    }

  };

  // User Login

  const loginUser = async () => {

    try {
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      alert("User Logged In Successfully!")
    } catch (error) {
    alert("Oops! User not Logged In. Check the Credentials & Try Again.")
    }

  };

  // User Logout

  const logoutUser = async () => {

    await signOut(auth);
    user?alert("User Signed Out Successfully!"):alert("No User is Logged In!");

  };

  return (
    <div className="App">
      
      <div>
        <h3>Register New User</h3>
        <input type="text" placeholder="Enter Email..." onChange={(event) => {setRegisterEmail(event.target.value); }} />
        <input type="password" placeholder="Set Password.." onChange={(event) => {setRegisterPassword(event.target.value); }} />
        <button onClick={registerUser}>Create New User</button>
      </div>

      <div>
        <h3>Login</h3>
        <input type="text" placeholder="Enter Email..." onChange={(event) => {setLoginEmail(event.target.value); }}/>
        <input type="password" placeholder="Enter Password.." onChange={(event) => {setLoginPassword(event.target.value); }}/>
        <button onClick={loginUser}>Login</button>
      </div>

      <h4>User Logged In</h4>
      {user?.email}

      <button onClick={logoutUser}>Sign Out</button>

    </div>
  );
}

export default App;
