import "./Restaurant.css";
import PropTypes from "prop-types";

// const Restaurant = (props) => {
//   const restaurantName = props.name;
//   const cuisine = props.cuisine;
//   const rating = props.rating;
//   const distance = props.distance;

const Restaurant = ({ name, cuisine, rating, distance, popularity }) => {
  return (
    <div>
      <h2 className="restaurant-title"> {name} </h2>
      <ul>
        <li> Cuisine: {cuisine} </li>
        <li> Rating: {rating} </li>
        <li> Distance from Ada: {distance} </li>
        <li> Popularity: {popularity} </li>
      </ul>
    </div>
  );
};

Restaurant.propTypes = {
  name: PropTypes.string.isRequired,
  cuisine: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  distance: PropTypes.string.isRequired,
};

export default Restaurant;
