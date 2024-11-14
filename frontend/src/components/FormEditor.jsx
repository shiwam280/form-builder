import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const FormEditor = () => {
  const [title, setTitle] = useState("");
  const [inputs, setInputs] = useState([]);
  const [inputType, setInputType] = useState("text");
  const [inputTitle, setInputTitle] = useState("");
  const [placeholder, setPlaceHolder] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/forms/${id}`).then((response) => {
        const { title, inputs } = response.data;
        setTitle(title);
        setInputs(inputs);
      });
    }
  }, [id]);

  const addInput = () => {
    if (inputs.length < 20) {
      setInputs([
        ...inputs,
        { type: inputType, title: inputTitle, placeholder: placeholder },
      ]);
      setInputTitle("");
      setPlaceHolder("");
    }
  };

  const deleteInput = (index) => {
    setInputs(inputs.filter((_, i) => i !== index));
  };

  const saveForm = () => {
    const form = { title, inputs };
    if (id) {
      axios.put(`http://localhost:5000/api/forms/${id}`, form).then(() => {
        navigate("/");
      });
    } else {
      axios.post("http://localhost:5000/api/forms", form).then(() => {
        navigate("/");
      });
    }
  };

  return (
    <div className="container">
      <h1>{id ? "Edit Form" : "Create Form"}</h1>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "10px" }}>
        Back
      </button>
      <input
        type="text"
        placeholder="Form Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div>
        <select
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
          style={{ width: "100%", padding: "10px", borderRadius: "6px" }}
        >
          <option value="text">Text</option>
          <option value="email">Email</option>
          <option value="password">Password</option>
          <option value="number">Number</option>
          <option value="date">Date</option>
        </select>
        <input
          type="text"
          placeholder="Input Title"
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Placeholder"
          value={placeholder}
          onChange={(e) => setPlaceHolder(e.target.value)}
        />
        <button onClick={addInput} style={{ marginBottom: "4px" }}>
          Add Input
        </button>
      </div>
      <div>
        {inputs.map((input, index) => (
          <div
            key={index}
            className="input-preview"
            style={{ marginTop: "4px" }}
          >
            <span style={{ marginRight: "2px" }}>
              {input.title} ({input.type})
            </span>
            <button
              onClick={() => deleteInput(index)}
              style={{ backgroundColor: "red" }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <button onClick={saveForm} style={{ marginTop: "4px" }}>
        Save Form
      </button>
    </div>
  );
};

export default FormEditor;
