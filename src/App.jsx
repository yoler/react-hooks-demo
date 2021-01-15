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

import { useTranslation, Trans } from "react-i18next";

import TagCloud1 from 'react-tag-cloud';
import randomColor from 'randomcolor';

import { TagCloud } from 'react-tagcloud'
import WordCloud3d from 'react-d3-cloud';



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

  const { t, i18n } = useTranslation('page')

  const data = [
    { value: '方法', count: 38 },
    { value: '的发v的', count: 30 },
    { value: '白板笔', count: 28 },
    { value: ' 所处的菜市场', count: 25 },
    { value: '与的发v的', count: 33 },
    { value: '万二恶女', count: 18 },
    { value: '预约反对党', count: 20 },
  ]

  const customRenderer = (tag, size, color) => {
    return (
      <span key={tag.value} style={{ color: color, fontSize: size, borderColor: color }} className={`tag-${size} tag-item`}>
        #{tag.value}
      </span>
    )
  }

  const data2 = [
    { text: '的发v到访', value: 1000 },
    { text: '个方便更方便', value: 200 },
    { text: '发该不该发布', value: 800 },
    { text: '付办公费', value: 1000000 },
    { text: '股份不规范', value: 10 },
  ];
   
  const fontSizeMapper = word => Math.log2(word.value) * 5;
  const rotate = word => word.value % 360;

  useEffect(() => {
    var options = {
      "list": [
          ['的发v到访', 10],
          ['发v', 9],
          ['说说', 7],
          ['报备', 6],
          ['问问', 4],
          ['VB广发', 5],
          ['寂寞寂寞', 4],
          ['咯loloil是的发v', 3],
          ['是发大V发v到访', 3]
      ],
      "gridSize": 6, // size of the grid in pixels
      "weightFactor": 4, // number to multiply for size of each word in the list
      "fontWeight": 'normal', // 'normal', 'bold' or a callback
      "fontFamily": '微软雅黑', // font to use
      "color": (word, weight, fontSize, distance, theta) => {
        return 'red'
      }, // 'random-dark' or 'random-light'
      "backgroundColor": '#fff', // the color of canvas
      "minRotation": 90,
      "maxRotation": 90,
      "shape": "diamond",
      "shuffle": "",
      "rotateRatio": 0.5,
  }
    var canvas = document.getElementById('canvas');
    window.WordCloud(canvas, options);
    }, [])
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
        {/* {t('description.part1')} */}

        <Trans i18nKey="userMessagesUnread" t={t} count={3}>
        Hello <strong title={t('nameTitle')}>{{name: '发宏'}}</strong>, you have {{count: '3'}} unread message.
        </Trans>

        <h2>{t('title', {name: '亢亢'})}</h2>

        <button onClick={() => i18n.changeLanguage('en')}>英文</button>
        <button onClick={() => i18n.changeLanguage('zh')}>中文</button>
        <TagCloud1 
          style={{
            fontFamily: '微软雅黑',
            fontSize: 12,
            padding: 5,
            color: () => randomColor(),
            width: '300px',
            height: '300px'
          }}>
        {data.map((item, index) => <div key={index} style={{fontSize: item.count}}>{item.value}</div>)}
      </TagCloud1>

      <TagCloud
          className="tag-box"
          minSize={12}
          maxSize={28}
          tags={data}
          renderer={customRenderer}
          onClick={tag => alert(`'${tag.value}' was selected!`)}
        />

      <div id="canvas-container" align="center">
          <canvas id="canvas" width="600px" height="400px"></canvas>
      </div>

      <WordCloud3d
        data={data2}
        fontSizeMapper={fontSizeMapper}
        rotate={rotate}
        padding={4}
        font='微软雅黑'
      />
      
      </div>
      
    </ThemeProvider>
  );
}

export default App;
