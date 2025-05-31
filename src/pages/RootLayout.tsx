import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Layout, Badge } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

import { ShoppingCartOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;
const Navbar: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = Object.values(cartItems).reduce(
    (sum, entry) => sum + entry.quantity,
    0
  );

  const navigate = useNavigate();
  return (
    <Header className="ant-layout-header">
      <div className="logo" onClick={() => navigate("/")}>
        e-com
      </div>
      <div className="cart-icon-wrapper" onClick={() => navigate("/cart")}>
        <Badge count={totalItems} overflowCount={99}>
          <ShoppingCartOutlined />
        </Badge>
      </div>
    </Header>
  );
};

const RootLayout: React.FC = () => {
  return (
    <Layout>
      <Navbar />
      <Content>
        <div className="container">
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};
export default RootLayout;
