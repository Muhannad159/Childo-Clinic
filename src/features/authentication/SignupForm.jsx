import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
// import Input from '../../ui/Input';
import { useSignup } from './useSignup';
import { styled } from 'styled-components';

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-indigo-700);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
  color: var(--color-grey-100);
  width: 355px;
`;

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  console.log(errors);
  const { signup, isLoading } = useSignup();
  const role = 'patient';

  function onSubmit({
    email,
    firstName,
    lastName,
    password,
    passwordConfirm,
    phoneNumber,
    userName,
  }) {
    signup(
      {
        firstName,
        lastName,
        userName,
        phoneNumber,
        email,
        password,
        passwordConfirm,
        role,
      },
      { onSettled: () => reset() }
    );
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='First name' error={errors?.fullName?.message}>
        <Input
          type='text'
          disabled={isLoading}
          id='firstName'
          {...register('firstName', { required: 'This field is required' })}
        />
      </FormRow>
      <FormRow label='Last name' error={errors?.fullName?.message}>
        <Input
          type='text'
          disabled={isLoading}
          id='lastName'
          {...register('lastName', { required: 'This field is required' })}
        />
      </FormRow>
      <FormRow label='User name' error={errors?.fullName?.message}>
        <Input
          type='text'
          disabled={isLoading}
          id='userName'
          {...register('userName', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label='Email address' error={errors?.email?.message}>
        <Input
          type='email'
          disabled={isLoading}
          id='email'
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please enter a valid email address',
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Password (min 8 characters)'
        error={errors?.password?.message}
      >
        <Input
          type='password'
          disabled={isLoading}
          id='password'
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters',
            },
          })}
        />
      </FormRow>

      <FormRow label='Repeat password' error={errors?.passwordConfirm?.message}>
        <Input
          type='password'
          disabled={isLoading}
          id='passwordConfirm'
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              value === getValues().password || 'Passwords need to match',
          })}
        />
      </FormRow>

      <FormRow label='Phone Number' error={errors?.phoneNumber?.message}>
        <Input
          type='text'
          disabled={isLoading}
          id='phoneNumber'
          {...register('phoneNumber', {
            required: 'This field is required',
            pattern: {
              value: /^\+?(\d[\d-. ]+)?(\([\d-. ]+\))?[\d-. ]+\d$/,
              message: 'Please enter a valid phone number',
            },
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          disabled={isLoading}
          variation='secondary'
          type='reset'
          onClick={reset}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
