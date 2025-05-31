# e-com Shopping Cart App

A modern, responsive e-commerce prototype built with React, TypeScript, Redux Toolkit, and Ant Design. It demonstrates a scalable architecture for handling 10,000+ products with performant pagination, search, filtering, and a full shopping cart experience.

---

## Table of Contents

1. [Demo](#demo)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Installation](#installation)  
5. [Usage](#usage)  
6. [Folder Structure](#folder-structure)  
7. [Scripts](#scripts)  
8. [Customization & Theming](#customization-and-theming)  
9. [Contributing](#contributing)  
10. [License](#license)  

---

## Demo

- **Product Listing**: Paginated grid of 100 products per page (out of 10,000+), with search & category filter.  
- **Product Details**: Full-screen “card” showing image, name, price, description, and action buttons.  
- **Shopping Cart**: Badge counts, cart page listing items, quantities, subtotal, “Clear Cart” functionality.  
- Fully responsive: stacks on mobile, consistent look on desktop.

---

## Features

- **10,000+ Fake Products**  
  Generated via [@faker-js/faker](https://github.com/faker-js/faker). Each product has a unique ID, name, description, price, and image URL.

- **Product Listing Page**  
  - Responsive grid (Ant Design’s `<Row>`/`<Col>`).  
  - Client-side pagination: 100 items per page by default.  
  - Search bar (`Input.Search`) filtering by name.  
  - Category filter (demo: “All / Even IDs / Odd IDs”).  
  - Card hover lift effect (Framer Motion or pure CSS).

- **Product Details Page**  
  - Clean, centered “card” with white background, rounded corners, and subtle shadow.  
  - Square-aspect image container (`object-fit: cover`).  
  - Hierarchical typography (title, price, description).  
  - Buttons: “Add to Cart” (primary) and “Go Back” (secondary).  
  - Responsive layout: image on left, details on right; stacks on narrow screens.

- **Shopping Cart**  
  - Redux Toolkit slice for cart state (`addToCart`, `removeFromCart`, `clearCart`).  
  - Badge on navbar showing total quantity.  
  - Cart page lists each item’s image, name, quantity, per-item total, and a “Remove” button.  
  - Displays subtotal and “Clear Cart” / “Continue Shopping” buttons.

- **Global Layout & Theming**  
  - Ant Design v5 (CSS-in-JS) with `ConfigProvider` token overrides (primary color, border radius, font size).  
  - Global background: `#f5f7fa`.  
  - Centered content container (`max-width: 1200px`).  
  - Sticky navbar (height 56px) with logo and cart icon.  
  - Footer area (© Year e-com) that sticks to bottom if content is short.

- **Performance & UX**  
  - Code-splitting (Create React App defaults).  
  - Fast client-side filtering and pagination (no server calls).  
  - Subtle hover and mount animations with Framer Motion (optional).  
  - Mobile-first responsive breakpoints (AntD’s grid + media queries).

---

## Tech Stack

| Layer               | Technology                      |
| ------------------- | ------------------------------- |
| **Framework**       | React 18, TypeScript            |
| **State Management**| Redux Toolkit (`@reduxjs/toolkit`, `react-redux`) |
| **UI Library**      | Ant Design v5 (`antd`)          |
| **Router**          | React Router v6 (`react-router-dom`) |
| **CSS & Theming**   | CSS-in-JS (AntD v5), custom CSS |
| **Fake Data**       | [@faker-js/faker](https://github.com/faker-js/faker) |
| **Build Tool**      | Create React App (`react-scripts`) |
| **Animations**      | Framer Motion (optional)        |
| **Linting/Formatting** | ESLint (Create React App defaults) |

---

## Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/AntoineKaram/e-com.git
   cd e-com
   ```

2. **Install dependencies**  
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**  
   ```bash
   npm start
   # or
   yarn start
   ```
   - Opens http://localhost:3000/ in your browser.  
   - Hot reloading enabled.  

4. **Build for Production**  
   ```bash
   npm run build
   # or
   yarn build
   ```
   - Outputs optimized `build/` folder ready for deployment.

---

## Usage

1. **Product Listing** (http://localhost:3000/)  
   - Search by name (type and press “Search” or clear to show all).  
   - Filter by “All / Even IDs / Odd IDs.”  
   - Click page numbers or “‹” / “›” to navigate.

2. **Product Details** (e.g. `/products/123`)  
   - View product’s image, name, price, description.  
   - Click **Add to Cart** to add one item.  
   - Click **Go Back** to return to listing (respects previous page/filters).

3. **Shopping Cart** (`/cart`)  
   - Navbar’s cart icon shows total quantity badge (e.g. “6”).  
   - Each row shows product image, name, quantity, and per-item total.  
   - Click **Remove** to delete item from cart.  
   - Subtotal computed automatically.  
   - **Clear Cart** empties the cart.  
   - **Continue Shopping** returns to listing.

---

## Folder Structure

```
e-com/
├─ public/
│   ├─ index.html      # CRA template
│   └─ favicon.ico
├─ src/
│   ├─ App.tsx         # Layout, Navbar, Footer, Outlet for routes
│   ├─ index.tsx       # Entry point (Provider + ConfigProvider + RouterProvider)
│   ├─ index.css       # Global & component-specific styles
│   ├─ router.tsx      # (Optional) createBrowserRouter + route definitions
│   ├─ store/
│   │   ├─ cartSlice.ts  # Redux Toolkit slice for shopping cart
│   │   └─ index.ts      # configureStore, RootState, AppDispatch, typed hooks
│   ├─ components/
│   │   ├─ ProductCard.tsx   # Card for listing page (image, name, price, button)
│   │   ├─ CartItem.tsx      # Single row in Cart page (remove button, totals)
│   │   └─ Navbar.tsx        # If separated (logo + cart icon)
│   ├─ data/
│   │   └─ products.ts       # 10,000+ faker-generated Product[] 
│   ├─ pages/
│   │   ├─ ProductListing.tsx  # Listing page: search, filter, grid, pagination
│   │   ├─ ProductDetails.tsx  # Details page: image, info, add-to-cart, go back
│   │   └─ CartPage.tsx        # Cart overview: list items, subtotal, clear
│   ├─ utils/
│   │   └─ formatPrice.ts      # Number → “$XX.XX” formatting
│   ├─ react-app-env.d.ts      # CRA TypeScript declarations
│   └─ setupTests.ts           # (CRA default for testing)
├─ package.json
├─ tsconfig.json
└─ README.md
```

---

## Scripts

| Script            | Description                                                   |
| ----------------- | ------------------------------------------------------------- |
| `npm start`       | Runs the app in development mode (hot reload at localhost:3000). |
| `npm run build`   | Bundles the app for production to the `build/` folder.        |
| `npm run eject`   | Ejects CRA configuration (irreversible).                      |

---

## Customization & Theming

### 1. AntD Token Overrides

- Located in **`src/index.tsx`** under `<ConfigProvider theme={{ token: { … } }}>`.  
- Modify values such as:
  ```ts
  token: {
    colorPrimary: "#1890ff",     
    borderRadius: 8,             
    fontSize: 16,               
    colorBgBase: "#f5f7fa",      
    colorBgContainer: "#ffffff", 
  }
  ```
- See [AntD v5 Theme Documentation](https://ant.design/docs/react/customize-theme) for available tokens.

### 2. Global CSS Variables

- **`--container-max-width`** in `:root` (index.css) controls the max-width of `.container`.  
- Adjust `@media` breakpoints to change responsive behavior.

---

## Contributing

Contributions are welcome! To propose new features or improvements:

1. Fork the repository  
2. Create a feature branch (`git checkout -b feature/my-feature`)  
3. Commit your changes (`git commit -m "feat: …"`)  
4. Push to the branch (`git push origin feature/my-feature`)  
5. Open a Pull Request detailing your changes  

Please follow the project’s code style:  
- **TypeScript** (.tsx & .ts) for all components and logic.  
- **AntD** components for layout and UI.  
- **Functional components** + **React hooks** (`useState`, `useEffect`, `useSelector`, `useDispatch`).  
- **ESLint** / **Prettier** configured by Create React App defaults.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.