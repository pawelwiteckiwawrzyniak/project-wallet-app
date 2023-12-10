import css from "./CustomButton.module.css";
// eslint-disable-next-line react/prop-types
const CustomButton = ({ type, color, content, onClick = null }) => {
  const btnClass = (color) =>
    `${
      color === "primary"
        ? css.buttonPrimary
        : color === "secondary"
        ? css.buttonSecondary
        : null
    }`;
  return (
    <button type={type} onClick={onClick} className={btnClass(color)}>
      {content}
    </button>
  );
};
export default CustomButton;
