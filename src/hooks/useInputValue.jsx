import {useState, useCallback} from 'react';

function useInputValue(initialValue) {
    let [value, setValue] = useState(initialValue)

    let onChange = useCallback((e) => {
        setValue(e.currentTarget.value)
    }, [])

    let clear = useCallback((e) => {
        setValue('')
    }, [])

    return {
        value,
        onChange,
        clear
    }
}

export default useInputValue