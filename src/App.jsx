import React, {
  useState, useEffect, useMemo, useCallback, useReducer,
} from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import styled, { ThemeProvider } from 'styled-components'
import "./App.css";
import Modal from "./components/modal";
import Input from "./components/input";
import Button from "./components/button/index";
import useInputValue from "./hooks/useInputValue";
import { textState, theme } from "./store/atom";

import { useTranslation } from "react-i18next";


function App() {
  const [visible, setVisible] = useState(false);
  const momeVisible = useMemo(() => visible, [visible]);
  const [count, setCount] = useState(0);

  const [text, setText] = useRecoilState(textState);


  const [themeObj, setThemeObj] = useRecoilState(theme);

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  const handleConfirm = useCallback(() => {
    setVisible(false);
    alert("确定");
  }, []);

  const name = useInputValue("xxx");
  const name2 = useInputValue("xxx2");

  const reducer = (state, action) => {
    switch (action.type) {
      case "increment":
        return { number: state.number + 1 };
      case "decrement":
        return { number: state.number - 1 };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, { number: 0 });

  const setTheme = () => {
    setThemeObj({
      color: 'green',
      background: '#dedede'
    })
  }

  const handleClick = (e) => {
    console.log(e)
  }

  const { t, i18n } = useTranslation()

  

  return (
    
    <ThemeProvider theme={themeObj}>
      <div className="App">
        <button type="button" onClick={() => setVisible(true)}>弹框</button>
        <button type="button" onClick={() => setCount(count + 1)}>{count}</button>
        Count:
        {" "}
        {state.number}
        <button type="button" onClick={() => dispatch({ type: "increment" })}>+</button>
        <button type="button" onClick={() => dispatch({ type: "decrement" })}>-</button>
        <div>
          <Input {...name} />
          <Input {...name2} />

          <Button onClick={handleClick}>vdfv</Button>

          <button
            type="button"
            onClick={() => {
              console.log(text);
            }}
          >
            获取值
          </button>
          <button onClick={setTheme}>主题切换</button>
        </div>

        <input
          type="text"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />

        <Modal
          visible={momeVisible}
          title="标题bgfbf"
          close={handleClose}
          confirm={handleConfirm}
        />
        {t('Welcome to React')}
        <h2>{t('title', {name: '亢亢'})}</h2>
        <button onClick={() => i18n.changeLanguage('en')}>英文</button>
        <button onClick={() => i18n.changeLanguage('zh')}>中文</button>
      </div>
    </ThemeProvider>
  );
}

export default App;
