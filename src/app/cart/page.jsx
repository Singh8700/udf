'use client';
import styled from 'styled-components';
import Layout from '../../components/Layout/Layout';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from 'react-icons/fi';

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  grid-column: 1 / -1;
`;

const CartTitle = styled.h1`
  font-size: 2rem;
  color: #333;
  margin: 0;
`;

const EmptyCart = styled(motion.div)`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  grid-column: 1 / -1;

  h2 {
    color: #333;
    margin-bottom: 1rem;
  }

  p {
    color: #666;
    margin-bottom: 2rem;
  }
`;

const ShopNowButton = styled(motion.button)`
  background: #6366f1;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #4f46e5;
  }
`;

const CartItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CartItem = styled(motion.div)`
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: 1.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  align-items: center;

  @media (max-width: 640px) {
    grid-template-columns: 100px 1fr;
    gap: 1rem;
  }
`;

const ItemImage = styled.div`
  width: 100%;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  background: #f8f8f8;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ItemName = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin: 0;
`;

const ItemPrice = styled.div`
  font-size: 1.2rem;
  color: #6366f1;
  font-weight: 600;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f3f4f6;
  padding: 0.5rem;
  border-radius: 8px;
  color:#000;
  @media (max-width: 640px) {
    margin-top: 1rem;
    grid-column: 1 / -1;
  }
`;

const QuantityButton = styled.button`
  background: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #333;
  transition: all 0.2s;

  &:hover {
    background: #6366f1;
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      background: white;
      color: #333;
    }
  }
`;

const QuantityDisplay = styled.span`
  min-width: 40px;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 500;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  font-size: 0.9rem;
  margin-top: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const OrderSummary = styled(motion.div)`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  height: fit-content;
  position: sticky;
  top: 2rem;
`;

const SummaryTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  font-size: 1rem;
  color: ${props => props.total ? '#333' : '#666'};
  font-weight: ${props => props.total ? '600' : '400'};
  border-top: ${props => props.total ? '2px solid #e5e7eb' : '1px solid #f3f4f6'};

  &:last-child {
    margin-top: 0.5rem;
    font-size: ${props => props.total ? '1.25rem' : '1rem'};
  }
`;

const CheckoutButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1.5rem;

  &:hover {
    background: #4f46e5;
  }

  &:disabled {
    background: #c7d2fe;
    cursor: not-allowed;
  }
`;

const ItemQuantityBadge = styled.span`
  background: #6366f1;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-left: 0.5rem;
`;

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const calculateGST = (amount) => amount * 0.18;
  const deliveryCharge = cartItems.length > 0 ? 99 : 0;
  const subtotal = getCartTotal();
  const gst = calculateGST(subtotal);
  const total = subtotal + gst + deliveryCharge;

  const handleCheckout = () => {
    // Create WhatsApp message with order details
    let message = "🛍️ *New Order Details*\n\n";
    message += "*Products:*\n";
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   • Quantity: ${item.quantity}\n`;
      message += `   • Price: ₹${item.price}\n`;
      message += `   • Subtotal: ₹${item.price * item.quantity}\n\n`;
    });

    message += "\n*Order Summary*\n";
    message += `Subtotal: ₹${subtotal.toFixed(2)}\n`;
    message += `GST (18%): ₹${gst.toFixed(2)}\n`;
    message += `Delivery: ₹${deliveryCharge}\n`;
    message += `*Total Amount: ₹${total.toFixed(2)}*\n`;

    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/917053377878?text=${encodedMessage}`;

    // Open WhatsApp in a new window
    window.open(whatsappUrl, '_blank');
  };

  if (cartItems.length === 0) {
    return (
      <Layout>
        <CartContainer>
          <CartHeader>
            <CartTitle>Your Cart</CartTitle>
          </CartHeader>
          <EmptyCart
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Your cart is empty</h2>
            <p>Start shopping to add items to your cart</p>
            <ShopNowButton
              as="a"
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Now
            </ShopNowButton>
          </EmptyCart>
        </CartContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      <CartContainer>
        <CartHeader>
          <CartTitle>
            Your Cart
            <ItemQuantityBadge>
              {cartItems.reduce((total, item) => total + item.quantity, 0)} items
            </ItemQuantityBadge>
          </CartTitle>
        </CartHeader>

        <CartItemList>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ItemImage>
                <img src={item.image} alt={item.name} />
              </ItemImage>
              <ItemInfo>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>₹{item.price}</ItemPrice>
                <RemoveButton onClick={() => removeFromCart(item.id)}>
                  <FiTrash2 /> Remove
                </RemoveButton>
              </ItemInfo>
              <QuantityControl>
                <QuantityButton
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <FiMinus />
                </QuantityButton>
                <QuantityDisplay>{item.quantity}</QuantityDisplay>
                <QuantityButton
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <FiPlus />
                </QuantityButton>
              </QuantityControl>
            </CartItem>
          ))}
        </CartItemList>

        <OrderSummary
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SummaryTitle>Order Summary</SummaryTitle>
          <SummaryRow>
            <span>Subtotal ({cartItems.reduce((total, item) => total + item.quantity, 0)} items)</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </SummaryRow>
          <SummaryRow>
            <span>GST (18%)</span>
            <span>₹{gst.toFixed(2)}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Delivery</span>
            <span>{deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge}`}</span>
          </SummaryRow>
          <SummaryRow total>
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </SummaryRow>
          <CheckoutButton
            onClick={handleCheckout}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Proceed to Pay
          </CheckoutButton>
        </OrderSummary>
      </CartContainer>
    </Layout>
  );
}
