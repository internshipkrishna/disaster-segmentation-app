import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [mask, setMask] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post("http://localhost:8000/predict/", formData);
    const byteString = res.data.mask;
    const byteArray = new Uint8Array(byteString.match(/.{1,2}/g).map(x => parseInt(x, 16)));
    const blob = new Blob([byteArray], { type: "image/png" });
    setMask(URL.createObjectURL(blob));
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-xl mb-4 font-bold">Disaster Image Segmentation</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} className="bg-blue-500 px-4 py-2 text-white rounded ml-2">Upload</button>
      <div className="mt-6">
        {mask && <img src={mask} alt="Predicted mask" className="mx-auto border" />}
      </div>
    </div>
  );
}

export default App;
