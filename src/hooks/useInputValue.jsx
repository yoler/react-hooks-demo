import { useState, useCallback } from "react";

function useInputValue(initialValue) {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback((e) => {
    setValue(e.currentTarget.value);
  }, []);

  const clear = useCallback((e) => {
    setValue("");
  }, []);

  return {
    value,
    onChange,
    clear,
  };
}

export default useInputValue;
