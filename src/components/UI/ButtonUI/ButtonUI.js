import {Button} from 'antd';

export const ButtonUI = ({label, onClick}) => {
    return(
        <Button type="primary" size='small' onClick={onClick}>{label}</Button>
    )
}