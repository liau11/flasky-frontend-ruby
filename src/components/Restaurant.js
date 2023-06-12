import "./Restaurant.css";

const Restaurant = () => {
  const restaurantName = "This is Salty's";
  return (
    <div>
      <h2 className="restaurant-title"> {restaurantName} </h2>
      <ul>
        <li> Cuisine: Seafood </li>
        <li> Rating: 4.8 </li>
        <li> Distance from Ada: 5 miles</li>
      </ul>
    </div>
  );
};

export default Restaurant;
