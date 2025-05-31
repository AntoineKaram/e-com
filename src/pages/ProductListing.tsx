import React, { useState, useMemo } from "react";
import { Row, Col, Pagination, Spin, Input, Select } from "antd";
import allProducts, { Product } from "../data/products";
import ProductCard from "../components/ProductCard";
import ProductList from "../components/ProductList";

const { Search } = Input;
const { Option } = Select;

const PAGE_SIZE = 100;

const ProductListing: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const categories = useMemo(() => ["all", "Even IDs", "Odd IDs"], []);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      if (
        searchText &&
        !product.name.toLowerCase().includes(searchText.toLowerCase())
      ) {
        return false;
      }
      if (categoryFilter === "Even IDs") {
        return parseInt(product.id) % 2 === 0;
      }
      if (categoryFilter === "Odd IDs") {
        return parseInt(product.id) % 2 !== 0;
      }
      return true;
    });
  }, [searchText, categoryFilter]);

  const totalItems = filteredProducts.length;
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const pageItems: Product[] = filteredProducts.slice(startIndex, endIndex);

  const onChangePage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <h2>All Products</h2>

      <Row gutter={[16, 16]} className="search-filter-row">
        <Col xs={24} sm={16}>
          <Search
            placeholder="Search products by name"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={(value) => {
              setSearchText(value);
              setCurrentPage(1);
            }}
            onChange={(e) => {
              if (e.target.value === "") {
                setSearchText("");
                setCurrentPage(1);
              }
            }}
          />
        </Col>
        <Col xs={24} sm={8}>
          <Select
            defaultValue="all"
            onChange={(value) => {
              setCategoryFilter(value);
              setCurrentPage(1);
            }}
            size="large"
          >
            {categories.map((cat) => (
              <Option key={cat} value={cat}>
                {cat}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>

      {pageItems.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <p>No data found</p>
        </div>
      ) : (
        <>
          <ProductList products={pageItems} />

          <div className="pagination-container">
            <Pagination
              current={currentPage}
              pageSize={PAGE_SIZE}
              total={totalItems}
              onChange={onChangePage}
              showSizeChanger={false}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductListing;
