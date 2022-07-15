import styles from 'styled-components';

export default function Label({children}: any) {
    return <Container>{children}</Container>
}

const Container = styles.label({
        padding: "0 0 5px 0",
})