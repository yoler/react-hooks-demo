import styled from "styled-components"

export const Button = styled.div`
    background: ${props => props.theme.background};
    color: ${props => props.theme.color};
    height: 80px;
    width: 200px;
    display: flex;
    justify-content: space-between;
    margin: 30px auto;
`
