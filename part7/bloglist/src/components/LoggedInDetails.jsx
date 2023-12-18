const LoggedInDetails = ({ user, handleLogout }) => {
  return (
    <>
      <p>
        {user.name} logged in <button onClick={handleLogout}>log out</button>
      </p>
    </>
  );
};

export default LoggedInDetails;
