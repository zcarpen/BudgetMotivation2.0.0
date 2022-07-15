import styled from 'styled-components';
import Select from './Select';

function Nav() {
    // only if loggedIn is true should the select menu be visible
  return (
    <NavContainer>
        <Title>Sign-up</Title>
        <Select />
    </NavContainer>
  )
}

const NavContainer = styled.div({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "10%",
    backgroundColor: "#bbb",
    width: "100%",
    padding: "0 1rem",
})

const Title = styled.h2({
    paddingLeft: "1rem",
    fontWeight: "700",
    color: "blue",
    boxShadow: "3px 3px 3px 0.5"
})


export default Nav
