import { useOutletContext } from "react-router-dom";

interface FollowersContext {
  nameOfMmyUser: string;
}

function Followers() {
  const { nameOfMmyUser } = useOutletContext<FollowersContext>();
  return <h1>Here are {nameOfMmyUser}'s' followers</h1>;
}

export default Followers;
