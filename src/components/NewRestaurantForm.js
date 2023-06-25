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
      // event.target.name would be keys: name, cuisine, rating, or distance_from_ada
      // event.target.value would be whatever user typed in for the corresponding key
    };
    // make copy of formData and modify it's data and pass in the modified data to setFormData to change state. This will cause a rerender due to change in state
    setFormData(newFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // the default form submission behavior is prevented (ie no more refreshing the page after submit button is pressed)
    addRestaurant(formData); // addRestaurant function is called with the formData object as an argument (formData already has the new data). This function is passed as a prop to the NewRestaurantForm component. It's expected that addRestaurant is a function defined in the parent component (App) that handles the logic for adding a new restaurant based on the form data. In App, the function is called postRestaurant.
    setFormData(INITIAL_FORM_DATA);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        // The keys below (id, name, type) are the keys of eventObject.target keys
        required
        type="text"
        id="name" // needs to be the same as value in htmlFor
        name="name"
        value={formData.name} // what is being displayed or what you just typed to change value
        onChange={handleChange}
      // onChange event handler is used to handle changes in the input fields of the form. It is triggered whenever the value of an input field is changed by the user.
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
