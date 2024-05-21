import { useForm } from "react-hook-form";
// import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
// import Input from '../../ui/Input';
import { useSignup } from "./useSignup";
import styled, { css } from "styled-components";
import { useState } from "react";
const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-900);
    background-color: var(--color-indigo-700);

    &:hover {
      background-color: var(--color-brand-900);
      color: var(--color-indigo-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-100);
    background: var(--color-indigo-700);
    border: 1px solid var(--color-grey-200);

    &:hover {
      color: var(--color-brand-900);
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};
const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  color: var(--color-blue-100);
  background-color: var(--color-brand-900);
  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]}
`;

const Select = styled.select`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-blue-100);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
  color: var(--color-brand-900);
  width: 355px;
`;

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-blue-100);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
  color: var(--color-brand-900);
  width: 355px;
`;

const Message = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  padding: 10px;
  border-radius: 5px;
  z-index: 1000;
  animation: fadeIn 0.5s, fadeOut 0.5s 2.5s;
  opacity: 0.9;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.9;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 0.9;
    }
    to {
      opacity: 0;
    }
  }
`;

const SuccessMessage = styled(Message)`
  background-color: #dff0d8; // Light green for success
  color: #3c763d;
`;

const ErrorMessage = styled(Message)`
  background-color: #f2dede; // Light red for error
  color: #a94442;
`;

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  console.log(errors);
  const { signup, isLoading } = useSignup();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  let token = localStorage.getItem("token");
  console.log("el success", showSuccess);
  console.log("el error", showError);
  function onSubmit({
    email,
    firstName,
    lastName,
    userName,
    password,
    passwordConfirm,
    phoneNumber,
    role,
  }) {
    if (!token) {
      role = "USER";
    }
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
        setShowSuccess,
        setShowError,
      },
      { onSettled: () => reset() }
    );
  }
  return (
    <div>
      {/* Conditional rendering for success and error messages */}
      {showSuccess && <SuccessMessage>Signup successful!</SuccessMessage>}
      {showError && (
        <ErrorMessage>Signup failed. Please try again.</ErrorMessage>
      )}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="First name" error={errors?.fullName?.message}>
          <Input
            type="text"
            disabled={isLoading}
            id="firstName"
            {...register("firstName", { required: "This field is required" })}
          />
        </FormRow>
        <FormRow label="Last name" error={errors?.fullName?.message}>
          <Input
            type="text"
            disabled={isLoading}
            id="lastName"
            {...register("lastName", { required: "This field is required" })}
          />
        </FormRow>
        <FormRow label="User name" error={errors?.fullName?.message}>
          <Input
            type="text"
            disabled={isLoading}
            id="userName"
            {...register("userName", { required: "This field is required" })}
          />
        </FormRow>

        <FormRow label="Email address" error={errors?.email?.message}>
          <Input
            type="email"
            disabled={isLoading}
            id="email"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please enter a valid email address",
              },
            })}
          />
        </FormRow>

        <FormRow
          label="Password (min 8 characters)"
          error={errors?.password?.message}
        >
          <Input
            type="password"
            disabled={isLoading}
            id="password"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            })}
          />
        </FormRow>

        <FormRow
          label="Repeat password"
          error={errors?.passwordConfirm?.message}
        >
          <Input
            type="password"
            disabled={isLoading}
            id="passwordConfirm"
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                value === getValues().password || "Passwords need to match",
            })}
          />
        </FormRow>

        <FormRow label="Phone Number" error={errors?.phoneNumber?.message}>
          <Input
            type="text"
            disabled={isLoading}
            id="phoneNumber"
            {...register("phoneNumber", {
              required: "This field is required",
              pattern: {
                value: /^\+?(\d[\d-. ]+)?(\([\d-. ]+\))?[\d-. ]+\d$/,
                message: "Please enter a valid phone number",
              },
            })}
          />
        </FormRow>
        {token && (
          <FormRow label="Role">
            <Select
              id="role"
              disabled={isLoading}
              {...register("role", { required: "This field is required" })}
            >
              <option value="">Select a role</option>4
              <option value="ADMIN">Admin</option>
              <option value="DOCTOR">Doctor</option>
              <option value="NURSE">Nurse</option>
            </Select>
            {/* {errors.role && <span>{errors.role}</span>} */}
          </FormRow>
        )}
        <FormRow>
          <Button
            disabled={isLoading}
            size="medium"
            variation="secondary"
            type="reset"
            onClick={reset}
          >
            Cancel
          </Button>
          <Button size="medium" variation="secondary" disabled={isLoading}>
            Create new user
          </Button>
        </FormRow>
      </Form>
    </div>
  );
}

export default SignupForm;
