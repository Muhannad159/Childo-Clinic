/* eslint-disable no-unused-vars */
import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: { email, firstName, lastName, phoneNumber, role, staffId },
  } = useUser();

  console.log("yahh", email, firstName, lastName, phoneNumber, role, staffId);
  let currentFullName = firstName + " " + lastName;
  const [firstNameForm, setFirstNameForm] = useState(firstName);
  const [lastNameForm, setLastNameForm] = useState(lastName);
  const [phoneNumberForm, setPhoneNumberForm] = useState(phoneNumber);
  const [avatar, setAvatar] = useState(null);
  const { updateUser, isUpdating } = useUpdateUser();

  function handleSubmit(e) {
    e.preventDefault();
    if (!firstName) return;
    updateUser(
      { firstNameForm, lastNameForm, phoneNumberForm, email, staffId },
      {
        onSuccess: () => {
          setAvatar(null);

          // e.target.reset();
        },
      }
    );
  }

  function handleCancel() {
    // We dont need to prevent default bec the cutton has type:reset
    setFirstNameForm(firstName);
    setLastNameForm(lastName);
    setPhoneNumberForm(phoneNumber);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="First name">
        <Input
          type="text"
          value={firstNameForm}
          onChange={(e) => setFirstNameForm(e.target.value)}
          id="firstName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Last name">
        <Input
          type="text"
          value={lastNameForm}
          onChange={(e) => setLastNameForm(e.target.value)}
          id="lastName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Phone Number">
        <Input
          type="text"
          value={phoneNumberForm}
          onChange={(e) => setPhoneNumberForm(e.target.value)}
          id="phoneNumber"
          disabled={isUpdating}
        />
      </FormRow>
      {/* <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
        />
      </FormRow> */}
      <FormRow>
        <Button
          onClick={handleCancel}
          disabled={isUpdating}
          type="reset"
          variation="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isUpdating}
          variation="secondary"
        >
          Update account
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
