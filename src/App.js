import RestaurantList from "./components/RestaurantList";
import { useState, useEffect } from "react";
import axios from "axios";
import NewRestaurantForm from "./components/NewRestaurantForm";

// const data = [
//   {
//     id: 1,
//     name: "Salty's",
//     cuisine: "Seafood",
//     rating: 4.8,
//     distance: "5 miles",
//   },
//   {
//     id: 2,
//     name: "Toulouse",
//     cuisine: "Creole",
//     rating: 2.5,
//     distance: "2 miles",
//   },
//   {
//     id: 3,
//     name: "Tanoor",
//     cuisine: "Arab",
//     rating: 4,
//     distance: "2.5 miles",
//   },
//   {
//     id: 4,
//     name: "Meet",
//     cuisine: "Korean BBQ",
//     rating: 4.5,
//     distance: "1 miles",
//   },
// ];

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const API =
    "https://nancy-harris-ruby-restaurant-flasky.onrender.com/restaurant";

  const getAllRestaurants = () => {
    axios
      .get(API)
      .then((result) => {
        console.log("in helper function");
        setRestaurants(result.data);
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
      .post(API, newRestaurantData)
      .then((result) => {
        console.log(result.data);
        getAllRestaurants();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // changeRating that updates state via API call
  const changeRating = (id, originalRating, direction) => {
    const newRating =
      direction === "up" ? originalRating + 1 : originalRating - 1;

    axios
      .patch(`${API}/${id}/rating`, { value: newRating })
      .then((result) => {
        console.log(result.data);
        getAllRestaurants();
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("changeRating called");
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
      .delete(`${API}/${id}`)
      .then((result) => {
        console.log(result.data);
        const newRestaurants = [];
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
