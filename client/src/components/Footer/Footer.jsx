import { Container, FooterText, HeartIcon, ModalBtn } from "./Footer.styled";
import FooterModal from "../FooterModal/FooterModal";

function Footer() {
  // eslint-disable-next-line no-undef
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  return (
    <Container>
      <FooterText>&copy; 2022 | All Rights Reserved </FooterText>
      <FooterText>
        | Developed with <HeartIcon /> by{" "}
      </FooterText>

      <ModalBtn type="button" onClick={openModal}>
        EightUp
      </ModalBtn>
      {showModal && <FooterModal onClose={closeModal} showModal={showModal} />}
    </Container>
  );
}

export default Footer;
