/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import styled, { css } from "styled-components";
import { useBooking } from "./useBooking";
import { useEditCabin } from "../cabins/useEditCabin";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Select = styled.select`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-blue-100);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
  color: var(--color-brand-900);
  width: 355px;
`;

export function decodeJWT(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  let decodedToken = JSON.parse(jsonPayload);

  // Modify the specific claim
  decodedToken.name =
    decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  delete decodedToken[
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
  ];

  decodedToken.id =
    decodedToken[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ];
  delete decodedToken[
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
  ];

  decodedToken.role =
    decodedToken[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ];
  delete decodedToken[
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
  ];

  return decodedToken;
}

export async function getCurrentUserData() {
  // // decode token
  const storedToken = localStorage.getItem("token");

  const decodedData = decodeJWT(storedToken);
  console.log("decoded", decodedData);

  try {
    const response = await fetch(
      `http://localhost:5023/api/v1/User/${decodedData.id}`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      }
    );
    console.log("user data res", response);
    const user = await response.json();
    console.log("user data", user);
    if (!response.ok) {
      console.error("Failed to fetch user dataa:", user.errors[0].message);
      throw new Error("Failed to fetch user data");
    }
    return user;
  } catch (error) {
    console.error("Error fetching staff data:", error);
  }
}

export async function getDoctors() {
  try {
    const response = await fetch(
      `http://localhost:5023/api/v1/Staff?role=DOCTOR`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      }
    );
    console.log("doc data res", response);
    const user = await response.json();
    console.log("doc data", user);
    if (!response.ok) {
      console.error("Failed to fetch user dataa:", user.errors[0].message);
      throw new Error("Failed to fetch user data");
    }
    return user;
  } catch (error) {
    console.error("Error fetching staff data:", error);
  }
}

const doctors = await getDoctors();
const userData = await getCurrentUserData();

function CreateReservationForm({ reservationToEdit = {}, onCloseModal }) {
  const { isCreating, createReservation } = useBooking();
  const { isEditing, editReservation } = useEditCabin();

  console.log("available doctors", doctors.data);
  console.log("User data", userData);
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = reservationToEdit;

  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  console.log("form vals", getValues());
  const { isDoctorSelected, doctorSelected } = useState(false);

  function onSubmit(data) {
    if (isEditSession)
      editReservation(
        { newCabinData: { ...data }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createReservation(
        { ...data },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function handleOnDoctorSelection() {}

  function onError(errors) {
    // console.log(errors);
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Patient Name" error={errors?.name?.message}>
        <Select
          id="patient name"
          disabled={isWorking}
          {...register("nametoid", { required: "This field is required" })}
        >
          <option value="">Select a Patient</option>
          {userData.patients.map((user) => (
            <option key={user.patientId} value={user.patientId}>
              {user.firstName} {user.lastName}
            </option>
          ))}
        </Select>
      </FormRow>

      <FormRow label="Doctor">
        <Select
          id="role"
          disabled={isWorking}
          {...register("doctortoid", { required: "This field is required" })}
        >
          <option value="">Select a Doctor</option>
          {doctors.data.map((doctor) => (
            <option key={doctor.staffId} value={doctor.staffId}>
              {doctor.firstName} {doctor.lastName}
            </option>
          ))}
        </Select>
      </FormRow>
      <FormRow label="Day">
        <Input type="number" id="day" disabled={isWorking} />
      </FormRow>

      <FormRow label="Time" error={errors?.regularPrice?.message}>
        <Input type="number" id="time" disabled={isWorking} />
      </FormRow>

      <FormRow label="Doctor" error={errors?.discount?.message}>
        <Input type="number" id="doctor" disabled={isWorking} />
      </FormRow>
      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          // Conditional chaining to prevent a bug if we use this form without the modal
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateReservationForm;
