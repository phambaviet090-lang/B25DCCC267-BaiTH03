import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  removeFromCart,
  updateQuantity,
  selectTotalPrice,
  selectTotalQuantity,
} from '../features/cart/cartSlice';

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalPrice = useAppSelector(selectTotalPrice);
  const totalQuantity = useAppSelector(selectTotalQuantity);

  if (cartItems.length === 0) {
    return (
      <div className="center-box">
        <h2>Giỏ hàng của bạn đang trống</h2>
        <Link to="/" className="btn btn-primary">
          Mua sắm ngay
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Giỏ hàng ({totalQuantity} sản phẩm)</h2>
      <div className="cart-list">
        {cartItems.map(({ product, quantity }) => (
          <div key={product.id} className="cart-item">
            <img
              src={product.image}
              alt={product.title}
              className="cart-item-img"
            />
            <div className="cart-item-info">
              <Link to={`/products/${product.id}`} className="product-title">
                {product.title}
              </Link>
              <p>${product.price.toFixed(2)}</p>
            </div>
            <div className="cart-item-controls">
              <button
                onClick={() =>
                  dispatch(
                    updateQuantity({
                      productId: product.id,
                      quantity: quantity - 1,
                    })
                  )
                }
                className="btn btn-outline"
              >
                -
              </button>
              <span className="qty-value">{quantity}</span>
              <button
                onClick={() =>
                  dispatch(
                    updateQuantity({
                      productId: product.id,
                      quantity: quantity + 1,
                    })
                  )
                }
                className="btn btn-outline"
              >
                +
              </button>
              <button
                onClick={() => dispatch(removeFromCart(product.id))}
                className="btn btn-danger"
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Tổng cộng: ${totalPrice.toFixed(2)}</h3>
        <button
          onClick={() => navigate('/checkout')}
          className="btn btn-primary"
        >
          Tiến hành thanh toán
        </button>
      </div>
    </div>
  );
};

export default CartPage;