import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Modal(props) {
    const {title, children, visible, close, confirm} = props
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