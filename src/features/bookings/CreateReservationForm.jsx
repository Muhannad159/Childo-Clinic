/* eslint-disable no-inner-declarations */
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
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

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

export async function createBooking(data) {
  try {
    const requestBody = {
      doctorId: data.doctortoid,
      patientId: data.nametoid,
      time: data.time,
      date: data.date,
    };

    console.log("body", data);
    const response = await fetch("http://localhost:5023/api/v1/Slots", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    console.log("add slot", response);
    const bookingData = await response.json();
    console.log("add slot res", bookingData);
    if (!response.ok) {
      console.error(
        "Failed to add new reservation:",
        bookingData.errors[0].message
      );
      toast.error("Failed to Add new reservation");
      throw new Error("Failed to add new reservation");
    }
    toast.success("Reservation Done");
    return bookingData;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCurrentUserData() {
  // // decode token
  const storedToken = localStorage.getItem("token");

  const decodedData = decodeJWT(storedToken);
  // console.log("decoded", decodedData);

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
    // console.log("user data res", response);
    const user = await response.json();
    // console.log("user data", user);
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
    // console.log("doc data res", response);
    const user = await response.json();
    // console.log("doc data", user);
    if (!response.ok) {
      console.error("Failed to fetch user dataa:", user.errors[0].message);
      throw new Error("Failed to fetch user data");
    }
    return user;
  } catch (error) {
    console.error("Error fetching staff data:", error);
  }
}

export async function getSlotsByDoctorId(doctorId, date) {
  try {
    const response = await fetch(
      `http://localhost:5023/api/v1/Slots/doctor/${doctorId}/${date}`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      }
    );
    // console.log("slots data res", response);
    const user = await response.json();
    // console.log("slots by docid  data", user);
    if (!response.ok) {
      console.error("Failed to fetch user dataa:", user.errors[0].message);
      throw new Error("Failed to fetch user data");
    }
    return user;
  } catch (error) {
    console.error("Error fetching staff data:", error);
  }
}

/////////////////////////
const doctors = await getDoctors();
const userData = await getCurrentUserData();
//////////////////////////////////////////////////////////////////////////////////////////////
function CreateReservationForm({ reservationToEdit = {}, onCloseModal }) {
  const { isCreating, createReservation } = useBooking();
  const { isEditing, editReservation } = useEditCabin();

  // console.log("available doctors", doctors.data);
  // console.log("User data", userData);
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = reservationToEdit;

  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, watch, formState } =
    useForm({
      defaultValues: isEditSession ? editValues : {},
    });
  const { errors } = formState;

  console.log("form vals", getValues());
  // const { isDoctorSelected, doctorSelected } = useState(false);
  const [timeSlots, setTimeSlots] = useState();
  const selectedDoctor = watch("doctortoid");
  const selectedDate = watch("date");
  const allTimeSlots = ["s1", "s2", "s3", "s4"];

  useEffect(() => {
    console.log("select doctor", selectedDoctor);
    console.log("select date", selectedDate);

    if (selectedDoctor && selectedDate) {
      async function fetchSlots() {
        const slots = await getSlotsByDoctorId(selectedDoctor, selectedDate);
        const availableTimeSlots = allTimeSlots.filter(
          (slot) => !slots.find((timeSlot) => timeSlot.time === slot)
        );
        const formattedList = availableTimeSlots.map((item) => ({
          time: item,
        }));
        console.log("slots reserved", slots);
        console.log("slots available", availableTimeSlots);
        setTimeSlots(formattedList);
      }
      fetchSlots();
    }
  }, [selectedDoctor, selectedDate]);

  console.log("yah slotatak", timeSlots);
  function onSubmit(data) {
    console.log("form data", data);
    createBooking(data);
    reset();
    onCloseModal?.();
  }

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
      <FormRow label="Day" error={errors?.date?.message}>
        <Input
          type="date"
          id="date"
          disabled={isWorking}
          {...register("date", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Time">
        <Select
          id="time"
          disabled={isCreating || isEditing || !timeSlots || !timeSlots.length}
          {...register("time", { required: "This field is required" })}
        >
          <option value="">Select your slot time</option>
          {timeSlots &&
            timeSlots.length &&
            timeSlots.map((slot) => (
              <option key={slot.time} value={slot.time}>
                {slot.time}
              </option>
            ))}
        </Select>
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
        <Button disabled={isWorking} variation="secondary">
          {isEditSession ? "Edit reservation" : "Create new reservation"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateReservationForm;
