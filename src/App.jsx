import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";

function App() {
  const [inputprompt, setInputPrompt] = useState("");
  //state for image url
  const [result, setResult] = useState("");

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    try {
      const res = await openai.createImage({
        prompt: inputprompt,
        n: 1,
        size: "512x512",
      });
      // console.log(res.data.data[0].url);
      setResult(res.data.data[0].url);
    } catch {
      alert("Error");
    }
  };

  return (
    <div className="maindiv">
      <h2>Generate an image using OpenAI API</h2>
      <input
        placeholder="Type something to generate image..."
        className="textInput"
        type="text"
        value={inputprompt}
        onChange={(e) => {
          setInputPrompt(e.target.value);
        }}
      />
      <button className="generateBtn" onClick={generateImage}>
        Generate image
      </button>
      {/* put the image here */}
      {result ? <img className="resImg" src={result} alt="result.." /> : null}
    </div>
  );
}

export default App;
