import Heading from '../ui/Heading';
import Row from '../ui/Row';
import UpdateUserDataForm from './../features/authentication/UpdateUserDataForm';
import UpdatePasswordForm from './../features/authentication/UpdatePasswordForm';
import { useUser } from '../features/authentication/useUser';

function Account() {
  const { user } = useUser();
  let fullName = user.firstName + ' ' + user.lastName;
  let role = user.role;
  // show a div with the user's name, role, and email
  return (
    <>
      <Heading as='h1'>Welcome{fullName}</Heading>
      <Heading as='h2'>Role: {role}</Heading>
      <Heading as='h2'>Email: {user.email}</Heading>

      <Row>
        <Heading as='h3'>Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as='h3'>Update password</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
