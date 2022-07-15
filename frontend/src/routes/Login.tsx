import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
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

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const [error, setError] = useState(false)

  const navigate = useNavigate();

  
  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const result = await axios({
        method: 'post',
        url: 'http://localhost:3001/login',
        data: formData,
      })
      console.log(result.data)
      window.localStorage.setItem("accessToken", result.data.accessToken)
      navigate('/home', { replace: true})
      // save data into global context
      // redirect to main page
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
