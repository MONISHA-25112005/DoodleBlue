
import React, { useEffect, useState } from 'react';
import './App.css';
import Images from './assets/index';
import Button from './components/UI/button';

const App = () => {
  const [counter, setCounter] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("App component is mounted");
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        );
        const users = await response.json();
        setData(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="greet">
      <h1 className="welcome">Welcome To the show!!!</h1>

      <main className="body">
        <img src={Images.img} alt="Show" className="show-image"width="650" height="450" />

        <Button
          name="Hi Hello!"
          onclick={() => alert("Button is clicked")}
        />

        <h2>Counter: {counter}</h2>

        <div className="counter-buttons">
  <button onClick={() => setCounter(counter + 1)}>
    Increment
  </button>

  <button onClick={() => setCounter(counter - 1)}>
    Decrement
  </button>
</div>
      </main>

      <section className="users-section">
        {
          data.map((user) => (
            <form className="user-form" key={user.id}>
              <h2>User {user.id}</h2>

              <div className="form-grid">
                <div className="form-group">
                  <label>ID:</label>
                  <input value={user.id} readOnly />
                </div>

                <div className="form-group">
                  <label>Name:</label>
                  <input value={user.name} readOnly />
                </div>

                <div className="form-group">
                  <label>Email:</label>
                  <input value={user.email} readOnly />
                </div>

                <div className="form-group">
                  <label>Username:</label>
                  <input value={user.username} readOnly />
                </div>

                <div className="form-group">
                  <label>Phone:</label>
                  <input value={user.phone} readOnly />
                </div>

                <div className="form-group">
                  <label>Website:</label>
                  <input value={user.website} readOnly />
                </div>

                <div className="form-group">
                  <label>Street:</label>
                  <input value={user.address.street} readOnly />
                </div>

                <div className="form-group">
                  <label>Suite:</label>
                  <input value={user.address.suite} readOnly />
                </div>

                <div className="form-group">
                  <label>City:</label>
                  <input value={user.address.city} readOnly />
                </div>

                <div className="form-group">
                  <label>Zipcode:</label>
                  <input value={user.address.zipcode} readOnly />
                </div>

                <div className="form-group">
                  <label>Latitude:</label>
                  <input value={user.address.geo.lat} readOnly />
                </div>

                <div className="form-group">
                  <label>Longitude:</label>
                  <input value={user.address.geo.lng} readOnly />
                </div>

                <div className="form-group">
                  <label>Company Name:</label>
                  <input value={user.company.name} readOnly />
                </div>

                <div className="form-group">
                  <label>Catch Phrase:</label>
                  <input value={user.company.catchPhrase} readOnly />
                </div>

                <div className="form-group">
                  <label>Business:</label>
                  <input value={user.company.bs} readOnly />
                </div>
              </div>
            </form>
          ))
        }
      </section>
    </div>
  );
};

export default App;