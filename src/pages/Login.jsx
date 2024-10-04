import { useNavigate } from "react-router-dom";
import PageNav from "../Components/PageNav";
import { useAuth } from "../contexts/FakeAuthContext";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import Message from "../Components/Message";
// import Button from "../Components/Button";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const [error, setError] = useState(false); // Track login errors

  const { login, isAuthenticated, FAKE_USER } = useAuth();
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    setError(false);
    if (email && password) {
      // Check if the user credentials match
      if (email === FAKE_USER.email && password === FAKE_USER.password) {
        login(email, password);
        setError(false); // Reset error on successful login
      } else {
        setError(true); // Show error if credentials don't match
      }
    }
  }

  useEffect(() => {
    // here replace does that it skips the login page and directly replace the login page in history stack with homepage or initial page
    if (isAuthenticated) navigate("/app",{replace:true});
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />
      
      {/* Conditionally render the error message */}
      {error ? (
        <Message message={"This user does not exist"} />
        
      ) : (
        <form className={styles.form}>
          <div className={styles.row}>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div>
            <button className={styles.btn} onClick={handleLogin}>Login</button>
          </div>
        </form>
      )}
    </main>
  );
}
