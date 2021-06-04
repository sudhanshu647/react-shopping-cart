// feature-1
import React from "react";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";
import data from "./data.json";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: [],
      products: data.products,
      size: "",
      sort: "",
    };
  }

  /** Apply sorting basics on price */
  sortProducts = (event) => {
    console.log(event.target.value);
    if (event.target.value === "") {
      this.setState({ sort: event.target.value, products: data.products });
    } else {
      const sort = event.target.value;
      this.setState((state) => ({
        sort,
        products: this.state.products
          .slice()
          .sort((a, b) =>
            sort === "lowest"
              ? a.price > b.price
                ? 1
                : -1
              : sort === "highest"
              ? a.price < b.price
                ? 1
                : -1
              : a._id < b._id
              ? 1
              : -1
          ),
      }));
    }
  };

  /* Apply size filter */
  filterProducts = (event) => {
    if (event.target.value === "") {
      this.setState({ size: event.target.value, products: data.products });
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
        ),
      });
    }
  };

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((item) => item._id !== product._id),
    });
  };

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count += 1;
        alreadyInCart = true;
      }
    });

    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems: cartItems });
  };

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React shopping cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                sortProducts={this.sortProducts}
                filterProducts={this.filterProducts}
              ></Filter>
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              ></Products>
            </div>
            <div className="sidebar">
              <Cart
                cartItems={this.state.cartItems}
                removeFromCart={this.removeFromCart}
              />
            </div>
          </div>
        </main>
        <footer>All right is reserved</footer>
      </div>
    );
  }
}

export default App;
