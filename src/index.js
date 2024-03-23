import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/index.css';
/* eslint-disable */
const pizzaData = [
  {
    name: 'Focaccia',
    ingredients: 'Bread with italian olive oil and rosemary',
    price: 6,
    photoName: 'pizzas/focaccia.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Margherita',
    ingredients: 'Tomato and mozarella',
    price: 10,
    photoName: 'pizzas/margherita.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Spinaci',
    ingredients: 'Tomato, mozarella, spinach, and ricotta cheese',
    price: 12,
    photoName: 'pizzas/spinaci.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Funghi',
    ingredients: 'Tomato, mozarella, mushrooms, and onion',
    price: 12,
    photoName: 'pizzas/funghi.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Salamino',
    ingredients: 'Tomato, mozarella, and pepperoni',
    price: 15,
    photoName: 'pizzas/salamino.jpg',
    soldOut: true,
  },
  {
    name: 'Pizza Prosciutto',
    ingredients: 'Tomato, mozarella, ham, aragula, and burrata cheese',
    price: 18,
    photoName: 'pizzas/prosciutto.jpg',
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}
function Header() {
  // const style = { color: 'red', fontSize: '40px' };
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}
function Menu() {
  const pizzas = pizzaData;
  const numPizzas = pizzas.length;
  return (
    <main className="menu">
      <h2>Our Menu</h2>

      {/* {numPizzas > 0 && (
        <div className="pizzas">
          {pizzas.map((pizza) => (
            <Pizza pizzaobj={pizza} />
          ))}
        </div>
      )} */}

      {numPizzas > 0 ? (
        <React.Fragment>
          <p>
            Authentic Italian cuisine, 6 creative dishes to choose from. All
            from our stone oven, all organic, all delecious.
          </p>
          <div className="pizzas">
            {pizzas.map((pizza) => (
              <Pizza pizzaobj={pizza} key={pizza.name} />
            ))}
          </div>
        </React.Fragment>
      ) : (
        <p>We are working on our Menu, kindly come later</p>
      )}

      {/* <Pizza
        name="Pizza Spinaci"
        ingredients="Tomato, mozarella, spinach, and ricotta cheese"
        photoName="pizzas/spinaci.jpg"
        price={10}
      />

      <Pizza
        name="pizza Funghi"
        ingredients="Tomato, mushrooms"
        price={12}
        photoName="pizzas/funghi.jpg"
      /> */}
    </main>
  );
}

function Pizza({ pizzaobj }) {
  // if (pizzaobj.soldOut) return null;
  return (
    <li className={`pizza ${pizzaobj.soldOut ? 'sold-out' : ''}`}>
      <img src={pizzaobj.photoName} alt={pizzaobj.name} />
      <div>
        <h3>{pizzaobj.name}</h3>
        <p>{pizzaobj.ingredients}</p>
        <span>{pizzaobj.soldOut ? 'SOLD OUT' : pizzaobj.price}</span>
      </div>
    </li>
  );
}
function Footer() {
  const hour = new Date().getHours();
  const openHour = 10;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);
  // if (hour >= openHour && hour <= closeHour) alert('we are open');
  // else alert('we are closed');

  return (
    <footer className="footer">
      {/* {isOpen && (
        <div className="order">
          <p>We are open until {closeHour}:00.Come Visit us or order online</p>
          <button className="btn">Order</button>
        </div>
      )} */}

      {isOpen ? (
        <Order closeHours={closeHour} />
      ) : (
        <p>
          We will be happy to welcome you between {openHour} to {closeHour}
        </p>
      )}
    </footer>
  );
  // return React.createElement("footer", null, "We are currently open")
}

function Order(props) {
  return (
    <div className="order">
      <p>
        We are open until {props.closeHours}:00.Come Visit us or order online
      </p>
      <button className="btn">Order</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// for versions of react which came before version 18
// React.render(<App/>, document.getElementById("root"))
