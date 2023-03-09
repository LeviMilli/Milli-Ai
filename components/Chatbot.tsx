import { useState, useContext, FormEvent } from "react";
import { AppContext } from "../context/context";
import "bootstrap/dist/css/bootstrap.css";

interface ChatbotResponse {
  answer: string;
}

export default function Chatbot() {
  const { list, setList } = useContext(AppContext);
  const [data, setData] = useState<ChatbotResponse>({ answer: ""});
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!text) {
      alert("Please enter text");
      return;
    }
    setIsLoading(true);
    const response = await fetch("/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const responseData = await response.json();
    console.log(responseData);
    setData(responseData);
    setIsLoading(false);
    setList((prevList) => [
      ...prevList,
      { text, answer: responseData.answer, likes: 0, _id: responseData._id },
    ]);
    setText("");
  };

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-sm-8 col-md-6 col-lg-4">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="text">Your personal chat assist:</label>
              <input
                className="form-control"
                id="text"
                type="text"
                value={text}
                onChange={(event) => setText(event.target.value)}
              />
            </div>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isLoading}
              title={text ? "" : "Please enter text"}
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </form>
          <div className="my-4">
            {data.answer && (
              <div className="alert alert-success" role="alert">
                {data.answer}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
