import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";

function PageNav()
{
    return <nav className={styles.nav}>
        <Logo/>
        {/* through this all pages are linked and no refresh happens */}
        <ul>
            
           
            <li>
                {/* instead of link we can use NavLink so that whichever page is active it gets a active class that can be later selected and css can be written accroding ton that */}
                {/* <Link to="/pricing">Pricing</Link> */}
                <NavLink to="/pricing">Pricing</NavLink>
                
            </li>
            <li>
                <NavLink to="/product">Product</NavLink>
                
            </li>
            <li>
                <NavLink to="/login" className={styles.ctaLink}>Login</NavLink>
               
            </li>
        </ul>
    </nav>
} export default PageNav;