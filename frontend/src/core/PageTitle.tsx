import styles from 'styled-components';


export default function({children}: any) {
    return <Title>{children}</Title>
}

const Title = styles.h1({
    textAlign: "center",
    fontSize: "2rem",
    color: "blue",
    marginBottom: "1rem"
})