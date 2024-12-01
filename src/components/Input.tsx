import { FC } from "react";

interface InputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const Input: FC<InputProps> = ({
  label,
  type,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default Input;
