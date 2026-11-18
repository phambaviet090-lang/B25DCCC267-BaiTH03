import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const product = items.find((item) => item.id === Number(id));

  if (status === 'loading') {
    return <p className="status-text">Đang tải chi tiết sản phẩm...</p>;
  }

  if (!product) {
    return (
      <div className="center-box">
        <h2>Không tìm thấy sản phẩm</h2>
        <Link to="/" className="btn btn-primary">
          Quay lại trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <div className="detail-image-box">
        <img src={product.image} alt={product.title} className="detail-image" />
      </div>
      <div className="detail-info">
        <span className="product-category">{product.category}</span>
        <h1>{product.title}</h1>
        <p className="detail-price">${product.price.toFixed(2)}</p>
        <p className="detail-desc">{product.description}</p>
        <div className="detail-actions">
          <button
            onClick={() => dispatch(addToCart(product))}
            className="btn btn-primary"
          >
            Thêm vào giỏ hàng
          </button>
          <Link to="/" className="btn btn-outline">
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;