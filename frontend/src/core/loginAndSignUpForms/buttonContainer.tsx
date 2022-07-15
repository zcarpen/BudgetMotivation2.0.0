import styles from 'styled-components';

export default function ButtonContainer({children}: any) {
    return <Container>{children}</Container>
}

const Container = styles.div({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
})