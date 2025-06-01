import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { List, Button, Image, Typography, InputNumber, Divider } from "antd";

import type { AppDispatch } from "../store";
import { cartActions, CartItem as CartItemType } from "../store/cart-slice";
import formatPrice from "../utils/formatPrice";

const { Text } = Typography;

interface CartItemProps {
  itemEntry: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ itemEntry }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { product, quantity } = itemEntry;

  const handleRemove = () => {
    dispatch(cartActions.removeFromCart({ productId: product.id }));
  };

  const handleQtyChange = (value: number | null) => {
    if (value === null || value < 1) return;
    dispatch(
      cartActions.updateQuantity({ productId: product.id, quantity: value })
    );
  };

  return (
    <Fragment>
      <List.Item
        style={{ padding: "16px 0" }}
        actions={[
          <Button danger onClick={handleRemove}>
            Remove
          </Button>,
        ]}
      >
        <List.Item.Meta
          avatar={
            <Image
              src={product.image}
              width={80}
              height={80}
              style={{ objectFit: "cover", borderRadius: 4 }}
            />
          }
          title={
            <Text strong style={{ fontSize: "16px" }}>
              {product.name}
            </Text>
          }
          description={
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div>
                Qty:{" "}
                <InputNumber
                  min={1}
                  max={100}
                  value={quantity}
                  onChange={handleQtyChange}
                  size="small"
                  style={{ width: 60 }}
                />
              </div>
              <div>
                <Text strong>{formatPrice(product.price * quantity)}</Text>
              </div>
            </div>
          }
        />
      </List.Item>
      <Divider style={{ margin: 0 }} />
    </Fragment>
  );
};

export default CartItem;
