import styles from 'styled-components';

export default function InputContainer({children}: any) {
    return <Container>{children}</Container>
}

const Container = styles.div({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: "40px",
    width: "80%",
    position: "relative",
})