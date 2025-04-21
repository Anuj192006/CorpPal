import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <header className="App-header">
      <h1>
        <Link to="/home" className="nav-brand">CorpPal</Link>
      </h1>
      <nav>
        <ul className="nav-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/qrcode-gen">QrCode-Gen</Link></li>
          <li><Link to="/todo-list">To-do List</Link></li>
          <li><Link to="/fitness">Fitness</Link></li>
          <li><Link to="/refraser-ai">Refraser-AI</Link></li>
          <li><Link to="/mail-ai">Mail-AI</Link></li>
          <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;