import styles from 'styled-components';

type FormProps = {
    children: any,
    onSubmit: (e: any) => void,
}

export default function Form({children, ...props}: FormProps) {
    return <FormContainer {...props}>{children}</FormContainer>
}

const FormContainer = styles.form({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    width: "80%",
})