import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormList from "./components/FormList";
import FormEditor from "./components/FormEditor";
import Form from "./components/Form";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormList />} />
        <Route path="/form/create" element={<FormEditor />} />
        <Route path="/form/:id/edit" element={<FormEditor />} />
        <Route path="/form/:id" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
