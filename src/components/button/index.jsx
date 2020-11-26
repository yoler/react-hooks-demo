import React, { useState, useRef } from "react";
import styled from "styled-components"
import { useTranslation } from 'react-i18next'

export const Warp = styled.div`
    background: ${props => props.theme.background};
    color: ${props => props.theme.color};
    padding: 20px;
    text-align: center;
    border-radius: 4px;
    margin: 30px auto;
    cursor: pointer;
`

function Button(props) {
  const {
    className,
    onClick,
    children
  } = props;

  const buttonRef = useRef()
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  const { t, i18n } = useTranslation();

  return (
    <Warp onClick={handleClick} ref={buttonRef} className={className}>
    {children} 
    <div>
      {t('Welcome to React')}
    </div>
    </Warp>
  );
}

export default React.memo(Button);
