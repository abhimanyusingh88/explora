import PropTypes from 'prop-types';
import styles from "./Button.module.css";

function Button({ children, type, onClick }) {
    return (
      <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
        {children}
      </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,  // Ensures 'children' is a valid React node
    type: PropTypes.string,               // Ensures 'type' is a string
    onClick: PropTypes.func               // Ensures 'onClick' is a function
};

export default Button;
