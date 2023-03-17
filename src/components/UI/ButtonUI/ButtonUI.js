import { Button } from "antd";
import {Link} from "react-router-dom";

export const ButtonUI = ({ to, label, urlTo , style, className, size = 'small', type = 'primary', onClick }) => {
    return to ? (
        <Link to={to}>
            <Button className={className} type={type} size={size} style={style} onClick={onClick}>
                {label}
            </Button>
        </Link>
    ) : urlTo ? (
        <a href={urlTo}>
            <Button className={className} type={type} size={size} style={style} onClick={onClick}>
                {label}
            </Button>
        </a>
    ) : (
        <Button className={className} type={type} size={size} style={style} onClick={onClick}>
            {label}
        </Button>
    );
};
