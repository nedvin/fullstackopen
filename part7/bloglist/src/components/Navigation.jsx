import { Link } from 'react-router-dom';

const Navigation = ({ children }) => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: 'lightgrey',
  };

  const listStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    listStyleType: 'none',
  };

  return (
    <div style={containerStyle}>
      <ul style={listStyle}>
        <li>
          <Link to="/">blogs</Link>
        </li>
        <li>
          <Link to="/users">users</Link>
        </li>
      </ul>
      {children}
    </div>
  );
};

export default Navigation;
