import {useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import UserContext from '../context/UserContext';
import TransactionContext from '../context/transactionContext';
import Form from '../core/loginAndSignUpForms/form';
import Label from '../core/loginAndSignUpForms/label';
import ButtonContainer from '../core/loginAndSignUpForms/buttonContainer';
import InputContainer from '../core/loginAndSignUpForms/inputContainer';
import styles from 'styled-components';
import Input from '../core/input';
import Button from '../core/button';
import axios from 'axios';
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*"

function Login() {
  const {handleLoginUserInfo} = useContext(UserContext)
  const {handleLoginTransactions} = useContext(TransactionContext)

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const [error, setError] = useState(false)

  const navigate = useNavigate();

  
  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const {data} = await axios({
        method: 'post',
        url: 'http://localhost:3001/login',
        data: formData,
      })
      
      window.localStorage.setItem("accessToken", data.accessToken)
      handleLoginUserInfo(data.user[0])
      handleLoginTransactions(data.transactions)

      // redirect to main page
      navigate('/', { replace: true})
    } catch (err) {
      console.log(err)
      setError(true);
      setTimeout(() => {
        setError(false)
      }, 3000)

    }
  }

  const handleFormUpdate = (e: any) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }


  return (
    <Container>
      <Form onSubmit={(e: any) => handleLogin(e)}>
        <InputContainer>
          <Label>Username:</Label>
          <Input value={formData.username} type="text" onChange={handleFormUpdate} id="username" />
        </InputContainer>
        <InputContainer>
          <Label>Password:</Label>
          <Input value={formData.password} type="password" onChange={handleFormUpdate} id="password" />
        </InputContainer>
        <ButtonContainer>
          <Button type="submit">Login</Button>
          <Link to="/sign-up">
            <Button type="button" secondary>Sign-up</Button>
          </Link>
        </ButtonContainer>
      </Form>
      {error && <Error>There was an error when processing your login information...</Error>}
    </Container>
  )
}

const Container = styles.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  height: "100%",
})

const Error = styles.h3({
  color: "red",
  textAlign: "center"

})

export default Login
