import PageNav from "../Components/PageNav";
import { useAuth } from "../contexts/FakeAuthContext";
import styles from "./Homepage.module.css";
import { Link } from "react-router-dom";

export default function Homepage() {
  const { isAuthenticated } = useAuth();
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        {isAuthenticated ? (
          <Link to="/app" className="cta">START TRACKING NOW</Link>
        ) : (
          <Link to="/login" className="cta">First Login to Visit</Link>
        )}
      </section>
    </main>
  );
}