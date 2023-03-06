import React, {useContext, useRef, useState} from "react";
import {MyContext} from "../../context/myContext";


export const HelloWorld = () => {
    const context = useContext(MyContext);
    const myRef = useRef(null);
    const [inputValue, setInputValue] = useState("");

    const handleClick = () => {
        console.log("Value: ", myRef.current.value);
        handleChange()
    };

    const handleChange = () => {
        setInputValue(myRef.current.value);
    };

    return (
        <>
            <div style={{ margin: 15 }}>
                <p>{context.text}</p>
                <input ref={myRef} name="email" placeholder="Enter email" />
                <button onClick={handleClick}>Кишмиш</button>
                {inputValue && <p style={{marginTop: 25}}>Вы ввели: {inputValue}</p>}
            </div>
        </>
    );
};