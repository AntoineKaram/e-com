import React from "react";
import { Card, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import { Product } from "../data/products";
import formatPrice from "../utils/formatPrice";

const { Meta } = Card;
const { Text } = Typography;

interface ProductGridItemProps {
  product: Product;
}

const ProductGridItem: React.FC<ProductGridItemProps> = ({ product }) => {
  const navigate = useNavigate();
  return (
    <Card
      hoverable
      style={{
        width: 200,
        height: 250,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      cover={
        <div
          style={{
            height: 140,
            overflow: "hidden",
            backgroundColor: "#f0f2f5",
            borderRadius: 4,
          }}
        >
          <img
            alt={product.name}
            src={product.image}
            style={{ width: "100%", objectFit: "cover", height: "100%" }}
          />
        </div>
      }
      bodyStyle={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        padding: 12,
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
              fontSize: 14,
            }}
          >
            {product.name}
          </Text>
        }
        description={
          <Text type="secondary" style={{ fontSize: 12, marginBottom: 8 }}>
            {formatPrice(product.price)}
          </Text>
        }
      />
      <Button
        type="primary"
        size="small"
        onClick={() => navigate(`/products/${product.id}`)}
      >
        View
      </Button>
    </Card>
  );
};

export default ProductGridItem;
