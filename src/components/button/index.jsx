import React, { useState, useContext } from "react";
import { ThemeContext } from 'styled-components';
import * as styled from  "./styled.js";

function Button(props) {
  const {
    
  } = props;
  
  const theme = useContext(ThemeContext);


  return (
    <styled.Button theme={theme}>eeeeeeee</styled.Button>
  );
}

export default React.memo(Button);
