import { Button } from "antd";
import {Link} from "react-router-dom";

export const ButtonUI = ({ to, label, urlTo , style, className, size = 'Default', type = 'primary', onClick, block }) => {
    return to ? (
        <Link to={to}>
            <Button className={className} type={type} size={size} style={style} onClick={onClick}>
                {label}
            </Button>
        </Link>
    ) : urlTo ? (
        <a href={urlTo}>
            <Button className={className} type={type} size={size} style={style} onClick={onClick}>
                1{label}
            </Button>
        </a>
    ) : block ? (
        <Button className={className} type={type} size={size} style={style} onClick={onClick} block>
            {label}
        </Button>
    ) : (
        <Button className={className} type={type} size={size} style={style} onClick={onClick}>
            {label}
        </Button>
    );
};
