import React, { useState } from "react";
import axios from "axios";
import './Form.css';

function App() {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/generate-image", { text })
      console.log(response);
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Text:
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        </label>
        <button type="submit">Generate Image</button>
      </form>
      {imageUrl && (
        <div>
          <img src={imageUrl} alt="generated " />
        </div>
      )}
    </div>
  );
}

export default App;