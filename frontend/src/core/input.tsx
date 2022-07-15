import styles from 'styled-components';

type InputProps = {
    type: string,
    value: any,
    id: string,
    onChange: (e: any) => void,
}

export default function Input({...props}: InputProps) {
    return <StyledInput {...props}></StyledInput>
}

const StyledInput = styles.input((props: InputProps) => ({
    alignSelf: "center",
    width: "80%",
    padding: "5px",
}))