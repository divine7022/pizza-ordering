import { useSelector } from "react-redux";

function Username() {
  const username = useSelector((state) => state.user.username);

  if (!username) return null;

  return (
    <div className="text-sm font-semibold hidden md:block">{username}</div>
  );
}

export default Username;

/// ----COMMENTS-----///
// useSelector((state) => state.user.Username) --> .user is the slice name and the .UserName is the propery name.
// The way that we get some state in Redux, inside some component is by using the ** useSelector() hook
