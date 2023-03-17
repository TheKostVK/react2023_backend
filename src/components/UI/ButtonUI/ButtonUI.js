import { Button } from "antd";

export const ButtonUI = ({ label, onClick, link, styles }) => {
    const buttonStyles = { ...styles };
    return link ? (
        <a href={link}>
            <Button style={buttonStyles} type="primary" size="small">
                {label}
            </Button>
        </a>
    ) : (
        <Button style={buttonStyles} type="primary" size="small" onClick={onClick}>
            {label}
        </Button>
    );
};
