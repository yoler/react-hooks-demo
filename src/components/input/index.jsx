import React, {useState, useEffect} from 'react';
import './index.css';

function Input(props) {
    const {type, value, onChange, clear} = props
    console.log('input render')

    return (
        <div>
            <input className='custom-input' type={type} value={value} onChange={onChange} />
            <button onClick={clear}>清除</button>
        </div>
        
    )
    
}

export default React.memo(Input);