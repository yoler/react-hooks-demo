import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {
    useRecoilState,
} from 'recoil';
import {textState} from '../../store/atom'
import './index.css';

function Modal(props) {
    const {title, children, visible, close, confirm} = props
    const [text, setText] = useRecoilState(textState);
    console.log('modal render')
    if (!visible) return null
    return ReactDOM.createPortal(
        <div className="modal" onClick={(e) => {
            if (e.target === e.currentTarget) {
                close()
            }
        }}>
            <div className="modal-content">
                <div>{title}</div>
                {text}
                {children}
                <div className="modal-btn">
                    <div onClick={confirm}>确定</div>
                    <div onClick={close}>取消</div>
                </div>
            </div>
        </div>,
        document.body
    );
    
}

export default React.memo(Modal);