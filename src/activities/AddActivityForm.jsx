import { useState } from "react";
import useMutation from "../api/useMutation";

export default function AddActivityForm() {
  // State for the new activity form
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  // Mutation hook for adding activities
  const { 
    mutate: addActivity, 
    loading: addLoading, 
    error: addError 
  } = useMutation("POST", "/activities", ["activities"]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.description.trim()) {
      await addActivity(formData);
      // Clear form on successful submission
      if (!addError) {
        setFormData({ name: "", description: "" });
      }
    }
  };

  return (
    <section>
      <h2>Add New Activity</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Activity Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Description
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows="3"
          />
        </label>
        <button type="submit" disabled={addLoading}>
          {addLoading ? "Adding..." : "Add Activity"}
        </button>
        {addError && <output style={{ color: "red" }}>Error: {addError}</output>}
      </form>
    </section>
  );
}