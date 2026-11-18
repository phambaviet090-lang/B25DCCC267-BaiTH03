import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  clearCart,
  selectTotalPrice,
  selectTotalQuantity,
} from '../features/cart/cartSlice';
import { useAuth } from '../contexts/AuthContext';

const CheckoutPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalPrice = useAppSelector(selectTotalPrice);
  const totalQuantity = useAppSelector(selectTotalQuantity);

  const [address, setAddress] = useState<string>('');
  const [isOrdered, setIsOrdered] = useState<boolean>(false);

  const handlePlaceOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(clearCart());
    setIsOrdered(true);
  };

  if (isOrdered) {
    return (
      <div className="center-box success-box">
        <h2>🎉 Đặt hàng thành công!</h2>
        <p>Cảm ơn <strong>{user?.username}</strong> đã mua sắm tại ShopMini.</p>
        <Link to="/" className="btn btn-primary">
          Quay về trang chủ
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="center-box">
        <h2>Không có sản phẩm nào để thanh toán</h2>
        <Link to="/" className="btn btn-primary">
          Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Thanh toán đơn hàng</h2>
      <div className="checkout-summary">
        <p>Người nhận: <strong>{user?.username}</strong></p>
        <p>Tổng số lượng: <strong>{totalQuantity}</strong> sản phẩm</p>
        <p>Tổng thanh toán: <strong>${totalPrice.toFixed(2)}</strong></p>
      </div>

      <form onSubmit={handlePlaceOrder} className="auth-form">
        <div className="form-group">
          <label htmlFor="address">Địa chỉ giao hàng</label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Nhập địa chỉ nhận hàng..."
            className="input-field"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Đặt hàng
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;