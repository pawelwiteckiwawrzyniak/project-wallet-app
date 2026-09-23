import {
  Modal,
  ModalTitle,
  Overlay,
  CloseBtn,
  CloseIcon,
} from "./FooterModal.styled";
import TeamList from "../TeamList/TeamList";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
function FooterModal({ onClose }) {
  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };

  // eslint-disable-next-line no-undef
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return (
    <Overlay onClick={handleBackdropClick}>
      <Modal>
        <ModalTitle>EightUp</ModalTitle>
        <TeamList />
        <CloseBtn onClick={onClose}>
          <CloseIcon />
        </CloseBtn>
      </Modal>
    </Overlay>
  );
}

export default FooterModal;
