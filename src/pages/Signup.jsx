import styled from "styled-components";
import SignupForm from "./../features/authentication/SignupForm";
import Logo from "./../ui/Logo";
import Heading from "../ui/Heading";

const SignupLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-indigo-700);
`;

function Signup() {
  return (
    <SignupLayout>
      <Logo />
      <Heading as="h4">Create a new account</Heading>
      <SignupForm />
    </SignupLayout>
  );
}

export default Signup;
