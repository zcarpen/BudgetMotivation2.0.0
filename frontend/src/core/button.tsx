import styled from "styled-components";

import React from 'react'

type ButtonProps = {
    children: any,
    onClick?: (e: any) => void,
    type: "button" | "submit" | "reset",
    secondary?: boolean //flag
}

export default function Button({children, ...props }: ButtonProps) {
  return (
    <StyledButton {...props}>
        {children}
    </StyledButton>
  )
}

const StyledButton = styled.button((props: ButtonProps) => ({
    padding: props.secondary ? "0": "8px 70px",
    borderRadius: props.secondary ? "": "10px",
    backgroundColor: props.secondary ? "transparent" : "green",
    border: props.secondary ? "none" : "",
    color: props.secondary ? "#000" : "#fff",
    boxShadow: props.secondary ? "none" : "3px 3px 3px rgba(0,0,0,0.5)",
}))
