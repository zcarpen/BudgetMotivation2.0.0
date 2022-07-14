import {useState} from 'react';
import {Link} from 'react-router-dom';
import styles from 'styled-components';
import Button from '../core/button';
import axios from 'axios';

const SignUp = () => {
    const [userData, setUserData]: [any, Function] = useState({
        username: '',
        income: null,
        budget: null,
        password: '',
        confirm: '',
    })
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [incomeError, setIncomeError] = useState(false)
    const [budgetError, setBudgetError] = useState(false)

    const updateUserData = (e: any) => {
        const currentField = e.target.id;
        const value = e.target.value
        setUserData({
            ...userData,
            [currentField]: value
        })
        if (currentField === 'username') {
            setUsernameError(value.length < 6)
        } else if (currentField === 'confirm') {
            setPasswordError(value !== userData.password)
        } else if (currentField === 'password') {
            setPasswordError(value.lenth < 6)
        } else if (currentField === 'income') {
            setIncomeError(Number(value) <= 0 || Number(value) !== Number(Number(value).toFixed(2)))
        } else if (currentField === 'budget') {
            setBudgetError(Number(value) <= 0 || Number(value) !== Number(Number(value).toFixed(2)))
        }
    }
    const handleUserData = async (e: any) => {
        e.preventDefault();

        // restrict form being sent if there is an error with inputs
        if (usernameError || passwordError || incomeError || budgetError) return;

        // removes passwordConfirmation
        const newUser = {
            username: userData.username,
            income: userData.income,
            budget: userData.budget,
            password: userData.password
        }

        console.log(newUser)

        try {
            const result = await axios({
                method: 'post',
                url: 'http://localhost:3001/sign-up',
                data: newUser
            })
            console.log(result)
        } catch(err) {
            console.log('error: ', err)
        }

    }

    return (
        <Form onSubmit={handleUserData}>
            <InputContainer>
                <Label htmlFor="username">Create a Username:</Label>
                <Input value={userData.username} type="text" id="username" onChange={(e) => updateUserData(e)} />
                {usernameError && <ErrorMessage >***username must exceed 5 characters***</ErrorMessage>}
            </InputContainer>
            <InputContainer>
                <Label htmlFor="income">Projected monthly income:</Label>
                <Input value={userData.income} type="number" id="income" onChange={updateUserData} />
                {incomeError && <ErrorMessage >***income must be greater than 0 and only have 2 decimal places***</ErrorMessage>}
            </InputContainer>
            <InputContainer>
                <Label htmlFor="budget">Desired monthly budget:</Label>
                <Input value={userData.budget} type="number" id="budget" onChange={updateUserData} />
                {budgetError && <ErrorMessage >***income must be greater than 0 and only have 2 decimal places***</ErrorMessage>}
            </InputContainer>
            <InputContainer>
                <Label htmlFor="password">Password:</Label>
                <Input value={userData.password} type="password" id="password" onChange={updateUserData} />
                {passwordError && <ErrorMessage >***password must exceed 5 characters and match***</ErrorMessage>}
            </InputContainer>
            <InputContainer>
                <Label htmlFor="confirm">Confirm Password:</Label>
                <Input value={userData.confirm} type="password" id="confirm" onChange={updateUserData} />
                {passwordError && <ErrorMessage >***password must exceed 5 characters and match***</ErrorMessage>}
            </InputContainer>
            <ButtonContainer>
                <Button primary type="submit">Submit</Button>
                <Link to="/login">
                    <Button secondary type="submit">Login</Button>
                </Link>
            </ButtonContainer>
        </Form>
    )
}

const InputContainer = styles.div({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: "40px",
    width: "80%",
    position: "relative",
})

const ButtonContainer = styles.div({
    display: "flex",
    gap: "2rem",

})

const Form = styles.form({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    width: "80%",
})

const ErrorMessage = styles.p({
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

const Input = styles.input({
    alignSelf: "center",
    width: "80%",
    padding: "5px",
})

const Label = styles.label({
    padding: "0 0 5px 0",
})

export default SignUp
