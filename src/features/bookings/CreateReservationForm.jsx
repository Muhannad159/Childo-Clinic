/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useBooking } from "./useBooking";
import { useEditCabin } from "./useEditCabin";
import { useForm } from "react-hook-form";

function CreateCabinForm({ reservationToEdit = {}, onCloseModal }) {
  const { isCreating, createReservation } = useBooking();
  const { isEditing, editReservation } = useEditCabin();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = reservationToEdit;

  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editReservation(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createReservation(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
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
        <Input
          type="text"
          id="patient name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
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

export default CreateCabinForm;
