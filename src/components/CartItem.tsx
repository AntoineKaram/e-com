import React from "react";
import { useDispatch } from "react-redux";
import { Row, Col, Button, Image, Typography } from "antd";

import {
  CartItem as CartItemType,
  cartActions,
} from "../store/cart-slice";
import formatPrice from "../utils/formatPrice";

const { Text } = Typography;

interface CartItemProps {
  itemEntry: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ itemEntry }) => {
  const dispatch = useDispatch();
  const { product, quantity } = itemEntry;

  const handleRemove = () => {
    dispatch(cartActions.removeFromCart({ productId: product.id }));
  };

  return (
    <Row
      align="middle"
      justify="space-between"
      style={{ padding: "12px 0", borderBottom: "1px solid #f0f0f0" }}
    >
      <Col span={4}>
        <Image src={product.image} width={64} height={64} />
      </Col>
      <Col span={8}>
        <Text strong>{product.name}</Text>
      </Col>
      <Col span={4}>
        <Text>Qty: {quantity}</Text>
      </Col>
      <Col span={4}>
        <Text>{formatPrice(product.price * quantity)}</Text>
      </Col>
      <Col span={4}>
        <Button danger onClick={handleRemove}>
          Remove
        </Button>
      </Col>
    </Row>
  );
};

export default CartItem;
