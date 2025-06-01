import React from "react";
import { Typography, List, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { cartActions } from "../store/cart-slice";

import CartItem from "../components/CartItem";
import formatPrice from "../utils/formatPrice";

const { Title, Text } = Typography;

const CartPage: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const cartEntries = Object.values(items);
  const totalPrice = cartEntries.reduce(
    (sum, entry) => sum + entry.product.price * entry.quantity,
    0
  );

  const handleClearCart = () => {
    dispatch(cartActions.clearCart());
  };

  return (
    <div className="container limited-container" style={{ marginTop: "24px" }}>
      <Title level={2}>Your Shopping Cart</Title>

      {cartEntries.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <div
          className="cart-details-card"
          style={{
            background: "#ffffff",
            borderRadius: 8,
            padding: 24,
            boxShadow: "rgba(0, 0, 0, 0.06) 0px 4px 12px",
          }}
        >
          <List
            itemLayout="horizontal"
            dataSource={cartEntries}
            renderItem={(entry) => <CartItem itemEntry={entry} />}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 24,
            }}
          >
            <Text strong style={{ fontSize: 18 }}>
              Subtotal: {formatPrice(totalPrice)}
            </Text>
            <div style={{ display: "flex", gap: 16 }}>
              <Button onClick={() => navigate("/")} size="large">
                Continue Shopping
              </Button>
              <Button danger onClick={handleClearCart} size="large">
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
