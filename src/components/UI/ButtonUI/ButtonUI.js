import { Button } from "antd";
import {Link} from "react-router-dom";

export const ButtonUI = ({ to, label, urlTo , styles, size = 'small', type = 'primary', onClick }) => {
    return to ? (
        <Link to={to}>
            <Button type={type} size={size} style={styles} onClick={onClick}>
                {label}
            </Button>
        </Link>
    ) : urlTo ? (
        <a href={urlTo}>
            <Button type={type} size={size} style={styles} onClick={onClick}>
                {label}
            </Button>
        </a>
    ) : (
        <Button type={type} size={size} style={styles} onClick={onClick}>
            {label}
        </Button>
    );
};
