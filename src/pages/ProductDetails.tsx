import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Button, message } from "antd";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { cartActions } from "../store/cart-slice";

import allProducts, { Product } from "../data/products";
import formatPrice from "../utils/formatPrice";

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const product: Product | undefined = allProducts.find((p) => p.id === id);
  if (!product) {
    return <div>Product not found.</div>;
  }

  const handleAddToCart = () => {
    dispatch(cartActions.addToCart({ product }));
    message.success("Added to cart");
  };

  return (
    <div className="limited-container">
      <div className="product-details-card">
        <Row gutter={[32, 32]}>
          <Col xs={24} md={10}>
            <div className="product-image-container">
              <img alt={product.name} src={product.image} />
            </div>
          </Col>

          <Col xs={24} md={14}>
            <div>
              <div className="product-title">{product.name}</div>
              <div className="product-price">{formatPrice(product.price)}</div>
              <div className="product-description">{product.description}</div>

              <div className="button-group">
                <Button type="primary" size="large" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
                <Button size="large" onClick={() => navigate(-1)}>
                  Go Back
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProductDetails;
