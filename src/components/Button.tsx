import { FC } from "react";

interface ButtonProps {
  text: string;
  loading: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  text,
  loading,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 text-white py-2 px-4 rounded ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled || loading}>
      {loading ? "Loading..." : text}
    </button>
  );
};

export default Button;
