import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Form = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/forms/${id}`).then((response) => {
      setForm(response.data);
      const initialData = {};
      response.data.inputs.forEach((input) => {
        initialData[input.title] = "";
      });
      setFormData(initialData);
    });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form Submitted: " + JSON.stringify(formData, null, 2));
    navigate("/");
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>{form.title}</h1>
        {form.inputs.map((input, index) => (
          <div key={index} className="form-field">
            <label>{input.title}</label>
            <input
              type={input.type}
              name={input.title}
              placeholder={input.placeholder}
              value={formData[input.title]}
              onChange={handleChange}
              className="form-field"
              required
            />
          </div>
        ))}
        <button
          onClick={() => navigate(-1)}
          style={{ marginBottom: "10px", marginRight: "4px" }}
        >
          Back
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
