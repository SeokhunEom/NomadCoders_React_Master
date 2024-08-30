import { Link, useSearchParams } from "react-router-dom";

import { users } from "../db";

function Home() {
  const [readSearchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
