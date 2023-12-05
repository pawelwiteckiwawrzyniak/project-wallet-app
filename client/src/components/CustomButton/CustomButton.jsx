import css from './CustomButton.module.css';

const CustomButton = ({ type, color, content, onClick = null }) => {
  const btnClass = color =>
    `${ color === 'primary' ? css.buttonPrimary : color === 'secondary' ? css.buttonSecondary : null }`;
  return (
    <button type={type} onClick={onClick} className={btnClass(color)}>
      {content}
    </button>
  );
};
export default CustomButton;