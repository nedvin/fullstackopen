const LoggedInDetails = ({ user, handleLogout }) => {
  return (
    <span>
      {user.name} logged in <button onClick={handleLogout}>log out</button>
    </span>
  );
};

export default LoggedInDetails;
