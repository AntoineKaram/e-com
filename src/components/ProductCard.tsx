import React from "react";
import { Card, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { Product } from "../data/products";
import formatPrice from "../utils/formatPrice";

const { Meta } = Card;
const { Text } = Typography;

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <Card
      hoverable
      style={{
        width: 240,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%"
      }}
      cover={
        <div
          style={{
            height: 160,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f0f2f5",
          }}
        >
          <img
            alt={product.name}
            src={product.image}
            style={{ height: "100%", objectFit: "cover", width: "100%" }}
          />
        </div>
      }
      bodyStyle={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        padding: "16px",
      }}
    >
      <Meta
        title={
          <Text
            strong
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              fontSize: "16px",
            }}
          >
            {product.name}
          </Text>
        }
        description={
          <Text
            type="secondary"
            style={{ display: "block", marginBottom: 16, fontSize: "14px" }}
          >
            {formatPrice(product.price)}
          </Text>
        }
      />
      <Button
        type="primary"
        block
        onClick={handleViewDetails}
        style={{ marginTop: "auto" }}
      >
        View Details
      </Button>
    </Card>
  );
};

export default ProductCard;
