import React, {useState, useEffect, useMemo, useCallback, useReducer} from 'react';
import './App.css';
import Modal from './components/modal';
import Input from './components/input';
import useInputValue from './hooks/useInputValue'

function App() {
    const [visible, setVisible] = useState(false)
    const momeVisible = useMemo(() => visible, [visible])
    const [count, setCount] = useState(0)
    
    const handleClose = useCallback(()=>{
        setVisible(false)
    },[visible])

    const handleConfirm = useCallback(()=>{
        setVisible(false)
        alert('确定')
    },[visible])

    const name = useInputValue('xxx')

    
    const reducer = (state, action) => {
        switch (action.type) {
            case 'increment':
                return {number: state.number + 1}
            case 'decrement':
                return {number: state.number - 1}
            default:
                throw new Error()
        }
    }

    const [state, dispatch] = useReducer(reducer, {number: 0})

    return (
        <div className="App">
            <button onClick={() => setVisible(true)}>弹框</button>
            <button onClick={() => setCount(count +1)}>{count}</button>
            Count: {state.number}
            <button onClick={() => dispatch({type: 'increment'})}>+</button>
            <button onClick={() => dispatch({type: 'decrement'})}>-</button>
            <div>
                <Input {...name} />
                <button onClick={() => {
                    console.log(name.value)
                }}>获取值</button>
            </div>
            
            <div>
                <Modal 
                    visible={momeVisible}
                    title="标题bgfbf"
                    close={handleClose}
                    confirm={handleConfirm}
                />
            </div>
        </div>
    );
}

export default App;
