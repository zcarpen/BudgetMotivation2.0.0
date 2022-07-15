import styles from "styled-components";

export default function ErrorMessage({children}: any) {
    return <Message>{children}</Message>
}

const Message = styles.p({
    fontSize: "8px",
    color: "red",
    letterSpacing: "0.7px",
    position: "absolute",
    bottom: "-2rem",
    left: "50%",
    width: "100%",
    textAlign: "center",
    transform: "translate(-50%, 0)",
})