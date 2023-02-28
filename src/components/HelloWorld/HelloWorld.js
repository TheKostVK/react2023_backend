import {useContext, useRef} from "react";
import {MyContext} from "../../context/myContext";
import { ButtonUI } from "../../components/"


export const HelloWorld = () => {
    const context = useContext(MyContext);
    const myRef = useRef(null);

    const handleSubmit = () => {
        console.log('Succes! Value: ', myRef.current.value);
    };

    return (
        <div style={{ margin: 15 }}>
            <p>{context.text}</p>
            <input ref={myRef} name="email" placeholder="Enter email" />
            <ButtonUI onClick={handleSubmit} label="Submit" />
        </div>
    );
};
