import sprite from "../../assets/icons/sprite.svg";
// eslint-disable-next-line react/prop-types
const Icon = ({ id, width, height, color }) => {
  return (
    <svg width={width} height={height}>
      <use href={sprite + id} width={width} height={height} fill={color} />
    </svg>
  );
};

export default Icon;
