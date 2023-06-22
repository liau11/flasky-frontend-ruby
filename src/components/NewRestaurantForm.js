import { useState } from "react";

const INITIAL_FORM_DATA = {
    name: "",
    cuisine: "",
    rating: 0,
    distance_from_ada: 0
};

const NewRestaurantForm = () => {
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);

    const handleChange = (event) => {
        console.log("handleChange called");
        console.log(event);
        console.log(`Name: ${event.target.name}`);
        console.log(`Value: ${event.target.value}`);
        const newFormData = {
            ...formData,
            [event.target.name]: event.target.value
        };
        console.log(newFormData)
        setFormData(newFormData);
    }
    return (
        <form>
            <label htmlFor="name">Name</label>
            <input
                required
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}/>
            <label htmlFor="rating">Rating</label>
            <input
                type="number"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}/>
            <label htmlFor="cuisine">Cuisine</label>
            <input
                type="text"
                id="cuisine"
                name="cuisine"
                value={formData.cuisine}
                onChange={handleChange}/>
            <label htmlFor="distance_from_ada">Distance from Ada</label>
            <input
                type="number"
                id="distance_from_ada"
                name="distance_from_ada"
                value={formData.distance_from_ada}
                onChange={handleChange}/>
        </form>
    )
};

export default NewRestaurantForm;