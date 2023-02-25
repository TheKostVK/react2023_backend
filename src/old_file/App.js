import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from "react";

// function App() {
//   const obj = {
//     name: "Vlad",
//     age: "19"
//   }
//   function getName() {
//     return obj.name
//   }
//
//   return (
//     <div>
//       <h3 style={{color: 'red'}}>Hello {getName()} / {obj.age}</h3>
//     </div>
//   );
// }

// export default App;


// Функциональный компонент - четкий, модный, молодежный
function App1() {
    const [name, setName] = useState('Vlad')

    const updateName = (name) => {
        setName(name)
    }

    // Выводит в консоль сообщение во время того как что-то обновляется (Страница или триггер)
    // Квадратные скобки фукусируют на изменение определенного объекта\состояния
    useEffect(() => {
        console.log('upd')
        //Для вызова после демонтирования страницы, здесь очиащаются состояния
        // return (() => {
        //     setName('VLad')
        // })
    }, [name])

    return (
        <>
            <h1>{name}</h1>
            <button type='' onClick={() => {
                updateName('Vladik')
            }}>Update name
            </button>
        </>
    )
}

const App2 = () => {
    return (
        <>App2</>
    )
}

// Классовый компонент, утаревший относительно функционального
class App3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Name',
            secondName: 'SecondName',
            array: [
                {},
                {},
                {}
            ]
        }
    }

    // Обработчик ошибок, может кидать редирект 404 и т д
    componentDidCatch(error, errorInfo) {

    }
    // Ловит обновление состояний при условии, что страница загрузилась
    componentDidMount() {

    }
    // Ловит изменения состояний и информирует об этом
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    // Чистит кеш при уходе со страницы
    componentWillUnmount() {

    }

    render() {
        // Нужно следить за тем чтобы не потереть данные из state, тк вызов сбрасывает все значения по умолчанию
        // и обновляет только тот который сделал вызов
        const updateName = (name) => {
            const state = this.state
            this.setState({...state, name: name})
        }

        const updateSecondName = (SecondName) => {
            this.setState({SecondName: SecondName})
        }

        return (
            <>
                <p>{this.state.name}</p>
                <button type="" onClick={() => updateName('NewName')}>Upd name</button>
            </>
        )
    }
}

export default App1;