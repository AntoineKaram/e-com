import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Divider, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import CartItem from '../components/CartItem';
import formatPrice from '../utils/formatPrice';
import { RootState } from '../store';
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/cart-slice';

const { Title, Text } = Typography;

const CartPage: React.FC = () => {
    
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
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
    <div style={{ padding: '24px' }}>
      <Title level={2}>Your Shopping Cart</Title>

      {cartEntries.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <>
          {cartEntries.map((entry) => (
            <CartItem key={entry.product.id} itemEntry={entry} />
          ))}

          <Divider />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '16px',
            }}
          >
            <Text strong style={{ fontSize: '18px' }}>
              Subtotal: {formatPrice(totalPrice)}
            </Text>
            <div>
              <Button onClick={() => navigate('/')}>Continue Shopping</Button>
              <Button
                danger
                style={{ marginLeft: '12px' }}
                onClick={handleClearCart}
              >
                Clear Cart
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
