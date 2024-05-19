import Button from "../../ui/Button";
import CreateReservationForm from "./CreateReservationForm";
import Modal from "../../ui/Modal";

function AddReservation() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new reservation</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateReservationForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddReservation;
