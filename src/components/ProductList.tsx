import React from "react";
import { Row, Col } from "antd";

import { Product } from "../data/products";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <Row gutter={[16, 16]}>
      {products.map((product) => (
        <Col
          key={product.id}
          xs={24}
          sm={12}
          md={8}
          lg={6}
        >
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
