import styled from "styled-components";

import React from 'react'

type ButtonProps = {
    children: any,
    onClick: (e: any) => void,
    secondary?: boolean //flag
}

export default function Button({ children, onClick, secondary }: ButtonProps) {
  return (
    <StyledButton secondary={secondary} onClick={onClick}>
        {children}
    </StyledButton>
  )
}

const StyledButton = styled.button((props: ButtonProps) => ({
    padding: "8px 12px",
    borderRadius: "10px",
    backgroundColor: props.secondary ? "blue" : "green",
    color: "#fff",
    width: "5rem",
}))