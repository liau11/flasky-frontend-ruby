import RestaurantList from "./components/RestaurantList";
import { useState, useEffect } from "react";
import axios from "axios";
import NewRestaurantForm from "./components/NewRestaurantForm";

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const API =
    "https://nancy-harris-ruby-restaurant-flasky.onrender.com/restaurant";

  const getAllRestaurants = () => {
    axios
      .get(API)
      .then((result) => {
        console.log("in helper function");
        setRestaurants(result.data); // this will cause rerender so you can see the newly added restaurant. Without this, you have only updated the database with the restaurant, but that wouldn't cause a rerender
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllRestaurants();
  }, []);

  const postRestaurant = (newRestaurantData) => {
    axios
      .post(API, newRestaurantData) // Add new restaurant data to database, but won't cause rerender (you won't see it on the website)
      .then((result) => {
        getAllRestaurants(); // call helper function to change the state so website will rerender to show new data being displayed. If you don't change the state, you'll have to manually refresh the page for it to show all the data, including the newly added data that was just submitted
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // changeRating that updates state via API call
  // callback function from restaurant.js
  const changeRating = (id, originalRating, direction) => {
    const newRating =
      direction === "up" ? originalRating + 1 : originalRating - 1;

    axios
      .patch(`${API}/${id}/rating`, { value: newRating }) // update database
      .then((result) => {
        getAllRestaurants(); // change the state, which causes rerender
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // changeRating that updates state manually (no API call)
  // const changeRating = (id, originalRating, direction) => {
  //   const newRating =
  //     direction === "up" ? originalRating + 1 : originalRating - 1;

  //   axios
  //     .patch(`${API}/${id}/rating`, { value: newRating })
  //     .then((result) => {
  //       console.log(result.data);
  //       const newRestaurants = restaurants.map((restaurant) => {
  //         if (restaurant.id === id) {
  //           const updatedRestaurant = { ...restaurant, rating: newRating };
  //           return updatedRestaurant;
  //         } else {
  //           return { ...restaurant };
  //         }
  //       });
  //       setRestaurants(newRestaurants);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   console.log("changeRating called");
  // };

  const deleteRestaurant = (id) => {
    axios
      .delete(`${API}/${id}`) // delete in database
      .then((result) => {
        const newRestaurants = []; // put in all the restaurants that don't have the same id (so it's not included in the new state)
        for (let restaurant of restaurants) {
          if (restaurant.id !== id) {
            newRestaurants.push(restaurant);
          }
        }
        setRestaurants(newRestaurants);
      })
      .catch((err) => {
        console.log(err);
      });
    // const newRestaurants = restaurants.filter(
    //   (restaurant) => restaurant.id !== id
    // );
  };

  return (
    <div className="App">
      <RestaurantList
        data={restaurants}
        updateRating={changeRating}
        deleteRestaurant={deleteRestaurant}
      />
      <NewRestaurantForm addRestaurant={postRestaurant} />
    </div>
  );
}

export default App;
