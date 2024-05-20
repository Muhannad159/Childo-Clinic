/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
  HiPlus,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
import { useState } from "react";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

export async function updateSlotStatus(id, state) {
  try {
    const response = await fetch(`http://localhost:5023/api/v1/Slots/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "pending",
        progressNotes: state,
      }),
    });

    console.log("slot patch:", response);
    const result = await response.json();
    console.log("slot patch data:", result);

    if (!response.ok) {
      console.error("Failed to update slot status:", result.errors[0].message);
      throw new Error("Failed to update slot status");
    }
    return result;
  } catch (error) {
    console.error("Error updating slot status:", error);
  }
}

function BookingRow({
  booking: {
    PatientName: PatientName,
    DoctorName: DoctorName,
    date: date,
    progressNote: progressNote,
    time: time,
    id: id,
  },
}) {
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { isLoading: isDeletingBooking, deleteBooking } = useDeleteBooking();
  const [newProgressNote, setNewProgressNote] = useState("");
  const [progressNoteId, setProgressNoteId] = useState("");
  let role = localStorage.getItem("role");
  console.log("role", role);
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const handleAddProgressNote = (id) => {
    console.log("New Progress Note:", newProgressNote);
    console.log("ya id", id);
    updateSlotStatus(progressNoteId, newProgressNote);
    window.location.reload();
  };
  return (
    <Table.Row>
      <Cabin>{PatientName}</Cabin>

      <span>{DoctorName}</span>

      <span>{date}</span>

      <span>{time}</span>

      <span>{progressNote}</span>

      {role === "DOCTOR" && (
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />
            <Menus.List id={id}>
              <Modal.Open opens="addProgressNote">
                <Menus.Button icon={<HiPlus />}>Add Progress Note</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>

          <Modal.Window name="addProgressNote">
            <form
              onSubmit={(e) => {
                handleAddProgressNote();
                e.preventDefault();
              }}
            >
              <h3>Add Progress Note</h3>
              <textarea
                value={newProgressNote}
                onChange={(e) => setNewProgressNote(e.target.value)}
                rows="4"
                cols="50"
              />
              <button type="submit" onClick={() => setProgressNoteId(id)}>
                Save
              </button>
            </form>
          </Modal.Window>
        </Modal>
      )}
    </Table.Row>
  );
}

export default BookingRow;
