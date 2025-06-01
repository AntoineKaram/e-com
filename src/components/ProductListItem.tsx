import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Image, Typography } from "antd";

import { Product } from "../data/products";
import formatPrice from "../utils/formatPrice";

const { Text } = Typography;

interface ProductListItemProps {
  product: Product;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  const navigate = useNavigate();
  return (
    <Row align="middle" gutter={16} style={{ padding: "12px 0" }}>
      <Col>
        <Image
          src={product.image}
          width={80}
          height={80}
          style={{ objectFit: "cover", borderRadius: 4 }}
        />
      </Col>
      <Col flex="auto">
        <Text strong style={{ fontSize: 16 }}>
          {product.name}
        </Text>
        <br />
        <Text type="secondary" style={{ fontSize: 14 }}>
          {formatPrice(product.price)}
        </Text>
      </Col>
      <Col>
        <Button
          type="primary"
          size="small"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          View
        </Button>
      </Col>
    </Row>
  );
};

export default ProductListItem;
