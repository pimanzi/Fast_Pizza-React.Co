import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import '../src/index.css';

const pizzaData = [
  {
    id: 1,
    name: 'Focaccia',
    ingredients: 'Bread with Italian olive oil and rosemary',
    price: '1000 Rwf',
    photoName: 'pizzas/focaccia.jpg',
    soldOut: false,
    quantity: 1,
  },
  {
    id: 2,
    name: 'Pizza Margherita',
    ingredients: 'Tomato and mozzarella',
    price: '1000 Rwf',
    photoName: 'pizzas/margherita.jpg',
    soldOut: false,
    quantity: 1,
  },
  {
    id: 3,
    name: 'Pizza Spinaci',
    ingredients: 'Tomato, mozzarella, spinach, and ricotta cheese',
    price: '1000 Rwf',
    photoName: 'pizzas/spinaci.jpg',
    soldOut: false,
    quantity: 1,
  },
  {
    id: 4,
    name: 'Pizza Funghi',
    ingredients: 'Tomato, mozzarella, mushrooms, and onion',
    price: '1500 Rwf',
    photoName: 'pizzas/funghi.jpg',
    soldOut: false,
    quantity: 1,
  },
  {
    id: 5,
    name: 'Pizza Salamino',
    ingredients: 'Tomato, mozzarella, and pepperoni',
    price: '1500 Rwf',
    photoName: 'pizzas/salamino.jpg',
    soldOut: true,
    quantity: 1,
  },
  {
    id: 6,
    name: 'Pizza Prosciutto',
    ingredients: 'Tomato, mozzarella, ham, arugula, and burrata cheese',
    price: '2000 Rwf',
    photoName: 'pizzas/prosciutto.jpg',
    soldOut: false,
    quantity: 1,
  },
];

function App() {
  const [orderedList, setOrderedList] = useState([]);
  const [orderedshow, setOrderedShow] = useState(false);

  function addInCart(newItem) {
    if (!orderedList.some((item) => item.id === newItem.id)) {
      setOrderedList((list) => [...list, newItem]);
    } else {
      const confirm = window.confirm('Do you want to remove item');
      if (confirm) {
        setOrderedList((item) =>
          orderedList.filter((item) => item.id !== newItem.id)
        );
      }
    }
  }

  return (
    <div className="container">
      <Header />
      {orderedshow ? '' : <Menu onCart={addInCart} orderedList={orderedList} />}
      {orderedshow ? (
        ''
      ) : (
        <Footer
          orderedshow={orderedshow}
          setOrderedShow={setOrderedShow}
          orderedList={orderedList}
        />
      )}
      {orderedshow ? (
        <Ordered
          data={orderedList}
          setOrderedShow={setOrderedShow}
          setOrderedList={setOrderedList}
        />
      ) : (
        ''
      )}
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Kacyiru Pizza Perfection</h1>
    </header>
  );
}

function Menu({ onCart, orderedList }) {
  const pizzas = pizzaData;
  const numPizzas = pizzas.length;

  return (
    <main className="menu">
      <h2>Our Menu</h2>

      {numPizzas > 0 ? (
        <React.Fragment>
          <p>
            Welcome to 'Kacyiru Pizza Perfection' we offer 6 creative dishes
            straight from our stone oven. Each pizza is crafted using organic
            ingredients, ensuring a delicious experience in every bite. Come
            savor the goodness!
          </p>
          <div className="pizzas">
            {pizzas.map((pizza) => (
              <Pizza
                pizzaobj={pizza}
                key={pizza.id}
                onAdd={onCart}
                orderedList={orderedList}
              />
            ))}
          </div>
        </React.Fragment>
      ) : (
        <p>We are working on our Menu, kindly come later</p>
      )}
    </main>
  );
}

function Pizza({ pizzaobj, onAdd, orderedList }) {
  const isSelected = orderedList.some((item) => item.id === pizzaobj.id);
  return (
    <li className={`pizza ${pizzaobj.soldOut ? 'sold-out' : ''}`}>
      <img src={pizzaobj.photoName} alt={pizzaobj.name} />
      <div>
        <h3>{pizzaobj.name}</h3>
        <p>{pizzaobj.ingredients}</p>
        <span>{pizzaobj.soldOut ? 'SOLD OUT' : pizzaobj.price}</span>

        <button
          className={isSelected ? 'btwselected' : 'btw'}
          onClick={() => {
            onAdd(pizzaobj);
            console.log(orderedList);
          }}
        >
          {isSelected ? 'Remove cart' : 'Add Cart'}
        </button>
      </div>
    </li>
  );
}
function Ordered({ data, setOrderedShow, setOrderedList }) {
  const [quantityList, setQuantityList] = useState({});

  function handleQuantity(e, itemId) {
    const { value } = e.target;
    setQuantityList((prevQuantityList) => ({
      ...prevQuantityList,
      [itemId]: Number(value),
    }));

    setOrderedList((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, quantity: Number(value) } : item
      )
    );
  }

  const sum = data.reduce((acc, item) => {
    const total = item.quantity * Number(item.price.split(' ')[0]);
    return acc + total;
  }, 0);

  return (
    <React.Fragment>
      <h2 className="orderedh2">Cart Contents</h2>
      <div className="pizzasord">
        {data.map((item) => (
          <OrderedItem
            key={item.id}
            data={item}
            quantity={quantityList[item.id] || item.quantity}
            handleQuantity={handleQuantity}
          />
        ))}
      </div>
      <p className="sump">The sum amount of money to pay: {sum} RWF</p>
      <div>
        <button
          className="btn"
          onClick={() => {
            const message = window.confirm('Are you sure to order');
            if (message) {
              alert('Thanks you order was successfully requested');
              setOrderedShow(false);
              setOrderedList([]);
            }
          }}
        >
          Place Order
        </button>
        <button className="btn" onClick={() => setOrderedShow(false)}>
          Discard
        </button>
      </div>
    </React.Fragment>
  );
}

function OrderedItem({ data, quantity, handleQuantity }) {
  const total = quantity * Number(data.price.split(' ')[0]);

  return (
    <li className="ordpizza">
      <img src={data.photoName} alt={data.name} />
      <h3>{data.name}</h3>
      <p>Price: {data.price}</p>
      <div>
        <label>Item count</label>
        <input
          type="text"
          value={quantity}
          onChange={(e) => handleQuantity(e, data.id)}
        />
      </div>
      <p>Total Price: {total} RWF</p>
    </li>
  );
}

function Footer({ orderedshow, setOrderedShow, orderedList }) {
  const hour = new Date().getHours();
  const openHour = 10;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  return (
    <footer className="footer">
      {isOpen ? (
        <Order
          orderedList={orderedList}
          closeHours={closeHour}
          orderedshow={orderedshow}
          setOrderedShow={setOrderedShow}
        />
      ) : (
        <p>
          We will be happy to welcome you between {openHour} to {closeHour}
        </p>
      )}
    </footer>
  );
}

function Order({ closeHours, orderedshow, setOrderedShow, orderedList }) {
  return (
    <div className="order">
      <p>We are open until {closeHours}:00. Come Visit us or order online</p>
      <button
        className="btn"
        onClick={() => {
          if (orderedList.length === 0) return;
          setOrderedShow((show) => !show);
        }}
      >
        Proceed
      </button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
