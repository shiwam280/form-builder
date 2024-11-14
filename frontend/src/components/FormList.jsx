import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function FormList() {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all forms
    axios
      .get("http://localhost:5000/api/forms")
      .then((response) => {
        setForms(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the forms!", error);
      });
  }, []);

  const handleDetailsClick = (id) => {
    navigate(`/form/${id}`);
  };

  const handleCreateFormClick = () => {
    navigate("/form/create");
  };

  const handleDelete = async (formId) => {
    try {
      await axios.delete(`http://localhost:5000/api/forms/${formId}`);
      setForms(forms.filter((form) => form._id !== formId));
    } catch (error) {
      console.error("Error deleting form: ", error);
    }
  };

  return (
    <div className="container">
      <div className="form-list-header">
        <h1>Welcome to Form.com</h1>
        <p>This is a simple form builder</p>
        <button onClick={handleCreateFormClick}>Create Form</button>
      </div>
      <div className="form-cards-container">
        {forms.length > 0 ? (
          forms.map((form) => (
            <div key={form._id} className="form-card">
              <h3 className="form-card-title">{form.title}</h3>
              <Link to={`/form/${form._id}/edit`}>
                <button style={{ backgroundColor: "red" }}>Edit</button>
              </Link>
              <button
                onClick={() => handleDetailsClick(form._id)}
                className="details-button"
                style={{ marginLeft: "60%" }}
              >
                Details
              </button>
              <button onClick={() => handleDelete(form._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No forms available. Please create a form.</p>
        )}
      </div>
    </div>
  );
}

export default FormList;
