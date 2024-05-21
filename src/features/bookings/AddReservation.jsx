import Button from "../../ui/Button";
import CreateReservationForm from "./CreateReservationForm";
import Modal from "../../ui/Modal";

function AddReservation() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="reservation-form">
          <Button variation="secondary">Add new reservation</Button>
        </Modal.Open>
        <Modal.Window name="reservation-form">
          <CreateReservationForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddReservation;
