import {useContext, useRef} from "react";
import {MyContext} from "../../context/myContext";
import { ButtonUI } from "../../components/"


export const HelloWorld = (props) => {
    const context = useContext(MyContext)
    console.log('context', context)

    const myRef = useRef()

    const submit = () => {
        console.log('myRef', myRef)
        console.log('Succes! Value: ', myRef.current.value)
    }
    return(
        <div style={{margin: 15}}>
            <p>{context.text}</p>
            <input ref={myRef} name="" placeholder='email'></input>
            <ButtonUI label={'Click'}/>
        </div>
    )
}