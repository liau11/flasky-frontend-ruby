import { useState } from "react";
import PropTypes from "prop-types";

const INITIAL_FORM_DATA = {
  name: "",
  cuisine: "",
  rating: 0,
  distance_from_ada: 0,
};

const NewRestaurantForm = ({ addRestaurant }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleChange = (event) => {
    const newFormData = {
      ...formData,
      [event.target.name]: event.target.value,
    };
    setFormData(newFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addRestaurant(formData);
    setFormData(INITIAL_FORM_DATA);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        required
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <label htmlFor="rating">Rating</label>
      <input
        type="number"
        id="rating"
        name="rating"
        value={formData.rating}
        onChange={handleChange}
      />
      <label htmlFor="cuisine">Cuisine</label>
      <input
        type="text"
        id="cuisine"
        name="cuisine"
        value={formData.cuisine}
        onChange={handleChange}
      />
      <label htmlFor="distance_from_ada">Distance from Ada</label>
      <input
        type="number"
        id="distance_from_ada"
        name="distance_from_ada"
        value={formData.distance_from_ada}
        onChange={handleChange}
      />
      <input type="submit" value="submit" />
    </form>
  );
};

NewRestaurantForm.propTypes = {
  addRestaurant: PropTypes.func.isRequired,
};

export default NewRestaurantForm;
