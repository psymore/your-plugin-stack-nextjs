import { GetServerSideProps } from "next";

// Define a type for users
interface User {
  id: number;
  name: string;
  email: string;
}

interface UsersPageProps {
  users: User[];
}

// Fetch data with getServerSideProps
export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/users"); // Ensure your backend runs on this port
  const users = await res.json();

  return {
    props: {
      users,
    },
  };
};

const UsersPage = ({ users }: UsersPageProps) => {
  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
