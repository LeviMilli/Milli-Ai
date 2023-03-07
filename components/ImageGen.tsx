import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

type ImageGenResponse = {
  success: boolean;
  message?: string;
  url?: string;
};

const ImageGeneratorForm = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/imagegen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      const data: ImageGenResponse = await response.json();
      if (data.success) {
        setImage(data.url || null);
        setError(null);
      } else {
        setError(data.message || "Unknown error occurred");
        setImage(null);
      }
    } catch (error) {
      setError("An error occurred while generating the image");
      setImage(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="text-input">Enter your text:</label>
          <input
            id="text-input"
            className="form-control"
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Generate you image
        </button>
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}
      </form>
      {image && (
        <div className="mt-5">
          <img src={image} alt="Generated Image" className="img-fluid" />
        </div>
      )}
    </div>
  );
};

export default ImageGeneratorForm;
