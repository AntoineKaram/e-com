import React, { useState, useMemo, useRef, useEffect } from "react";
import { Input, Select, Row, Col, Radio, Typography, Spin } from "antd";
import allProducts from "../data/products";
import ProductGridItem from "../components/ProductGridItem";
import ProductListItem from "../components/ProductListItem";

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const PAGE_SIZE = 50;
const ITEM_HEIGHT = 120;
const CARD_WIDTH = 200;
const CARD_HEIGHT = 300;
const GUTTER = 16;
const OVERSCAN = 3;

const ProductListing: React.FC = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [gridColumns, setGridColumns] = useState(1);
  const [loadedCount, setLoadedCount] = useState(PAGE_SIZE);
  const [containerHeight, setContainerHeight] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const containerRef = useRef<HTMLDivElement>(null);

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
  //this can be done via backend api call but since I am using mock data
  const visibleCount = Math.min(filteredProducts.length, loadedCount);
  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const totalCount = filteredProducts.length;
  
  //on load store the number of grid columns in memory to be used in calculation
  useEffect(() => {
    const updateGridColumns = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const cols = Math.max(
        1,
        Math.floor((width + GUTTER) / (CARD_WIDTH + GUTTER))
      );
      setGridColumns(cols);
    };
    updateGridColumns();
    window.addEventListener("resize", updateGridColumns);
    return () => window.removeEventListener("resize", updateGridColumns);
  }, []);

  //stores container height and adds a scroll event listener
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setContainerHeight(el.clientHeight);
    const onScroll = () => {
      setScrollTop(el.scrollTop);
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - ITEM_HEIGHT * 2) {
        if (visibleCount < totalCount) {
          setLoadedCount((prev) =>
            Math.min(prev + PAGE_SIZE, filteredProducts.length)
          );
        }
      }
    };
    el.addEventListener("scroll", onScroll);
    window.addEventListener("resize", () => {
      setContainerHeight(el.clientHeight);
    });
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", () =>
        setContainerHeight(el.clientHeight)
      );
    };
  }, [filteredProducts.length, visibleCount, totalCount]);

  //calculate the first element displayed index (with a 3 row bugffer)
  const listStartIndex = Math.max(
    0,
    Math.floor(scrollTop / ITEM_HEIGHT) - OVERSCAN
  );
  const visibleListCount =
    Math.ceil(containerHeight / ITEM_HEIGHT) + OVERSCAN * 2;
  const listEndIndex = Math.min(
    visibleCount,
    listStartIndex + visibleListCount
  );

  const rowHeight = CARD_HEIGHT + GUTTER;
  const gridRowCount = Math.ceil(visibleCount / gridColumns);
  const startRow = Math.max(0, Math.floor(scrollTop / rowHeight) - OVERSCAN);
  const visibleRows = Math.ceil(containerHeight / rowHeight) + OVERSCAN * 2;
  const endRow = Math.min(gridRowCount, startRow + visibleRows);
  const gridStartIndex = startRow * gridColumns;
  const gridEndIndex = Math.min(visibleCount, endRow * gridColumns);

  const onSearch = (value: string) => {
    setSearchText(value);
    setLoadedCount(PAGE_SIZE);
    if (containerRef.current) containerRef.current.scrollTo(0, 0);
  };
  const onCategoryChange = (value: string) => {
    setCategoryFilter(value);
    setLoadedCount(PAGE_SIZE);
    if (containerRef.current) containerRef.current.scrollTo(0, 0);
  };

  return (
    <div className="container">
      <Title level={2}>All Products</Title>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={24} lg={12}>
          <Search
            placeholder="Search products by name"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
            onChange={(e) => {
              if (e.target.value === "") onSearch("");
            }}
          />
        </Col>
        <Col xs={24} md={12} lg={6}>
          <Select
            defaultValue="all"
            onChange={onCategoryChange}
            size="large"
            style={{ width: "100%" }}
          >
            {["all", "Even IDs", "Odd IDs"].map((cat) => (
              <Option key={cat} value={cat}>
                {cat}
              </Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} md={12} lg={6} style={{ textAlign: "center" }}>
          <Radio.Group
            value={viewMode}
            onChange={(e) => {
              setViewMode(e.target.value);
              setLoadedCount(PAGE_SIZE);
              if (containerRef.current) containerRef.current.scrollTo(0, 0);
            }}
            size="large"
          >
            <Radio.Button value="grid">Grid View</Radio.Button>
            <Radio.Button value="list">List View</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>

      <div className="product-listing-container" ref={containerRef}>
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: 50 }}>
            <div>No products found.</div>
          </div>
        ) : viewMode === "list" ? (
          <div
            style={{ position: "relative", height: visibleCount * ITEM_HEIGHT }}
          >
            <div style={{ height: listStartIndex * ITEM_HEIGHT }} />
            {visibleProducts
              .slice(listStartIndex, listEndIndex)
              .map((product, idx) => {
                const actualIndex = listStartIndex + idx;
                const top = actualIndex * ITEM_HEIGHT;
                return (
                  <div
                    key={product.id}
                    style={{
                      position: "absolute",
                      top,
                      height: ITEM_HEIGHT,
                      width: "100%",
                    }}
                  >
                    <ProductListItem product={product} />
                  </div>
                );
              })}
            <div
              style={{
                height: (visibleCount - listEndIndex) * ITEM_HEIGHT,
              }}
            />
          </div>
        ) : (
          <div
            style={{ position: "relative", height: rowHeight * gridRowCount }}
          >
            <div style={{ height: startRow * rowHeight }} />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${gridColumns}, ${CARD_WIDTH}px)`,
                columnGap: `${GUTTER}px`,
                rowGap: `${GUTTER}px`,
              }}
            >
              {visibleProducts
                .slice(gridStartIndex, gridEndIndex)
                .map((product, idx) => {
                  // const actualIndex = gridStartIndex + idx; in case I need the index for an api call ot to be sent to child component
                  return (
                    <div
                      key={product.id}
                      style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
                    >
                      <ProductGridItem product={product} />
                    </div>
                  );
                })}
            </div>
            <div
              style={{
                height: (gridRowCount - endRow) * rowHeight,
              }}
            />
          </div>
        )}
        {visibleCount < totalCount && (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <Spin />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
