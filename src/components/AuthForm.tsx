import { useState, FC } from "react";

interface AuthFormProps {
  onSubmit: (email: string, password: string) => void;
  loading: boolean;
}

const AuthForm: FC<AuthFormProps> = ({ onSubmit, loading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  // Function to calculate color based on input length
  const calculateTextColor = (length: number, maxLength: number) => {
    if (length === maxLength) {
      return "blue"; // Set the last typed color to blue
    }

    // Transition from red to blue based on character position
    const ratio = length / maxLength;
    const redValue = Math.floor(255 - 255 * ratio);
    const blueValue = Math.floor(255 * ratio);

    return `rgb(${redValue}, 0, ${blueValue})`; // Gradient from red to blue
  };

  // Define max length to make the final character blue
  const maxLength = 10; // You can adjust this value as needed

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="email"
        placeholder="Email"
        className="p-2 border placeholder-#2a3d4e focus:outline-blue-500"
        style={{ color: calculateTextColor(email.length, maxLength) }} // Dynamic color
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="p-2 border placeholder-#2a3d4e focus:outline-blue-500"
        style={{ color: calculateTextColor(password.length, maxLength) }} // Dynamic color
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="font-bold bg-blue-500 text-white py-2 px-4 rounded hover:bg-gradient-to-r from-blue-300 to-red-300 hover:text-gray-700 hover:font-bold"
        disabled={loading}>
        {loading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
};

export default AuthForm;
