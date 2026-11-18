import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectTotalQuantity } from '../features/cart/cartSlice';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const totalQuantity = useAppSelector(selectTotalQuantity);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          ShopMini
        </Link>

        <nav className="nav-actions">
          <Link to="/" className="nav-link">
            Trang chủ
          </Link>
          <Link to="/cart" className="nav-link">
            Giỏ hàng ({totalQuantity})
          </Link>

          <button onClick={toggleTheme} className="btn btn-outline">
            {theme === 'light' ? '🌙 Tối' : '☀️ Sáng'}
          </button>

          {user ? (
            <div className="user-info">
              <span>Xin chào, <strong>{user.username}</strong></span>
              <button onClick={logout} className="btn btn-danger">
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Đăng nhập
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;