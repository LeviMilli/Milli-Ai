import React, {useContext} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { AppContext } from "../context/context"

interface SearchlistProps {
  serverList: {
    _id: string;
    text: string;
    answer: string;
    likes: number;
  }[];
}



function Searchlist({ list }: SearchlistProps) {
  const { setList } = useContext(AppContext);

  async function handleLikeButtonClick(id: string) {
    try {
      const response = await fetch(`/api/chatbot`, {
        method: 'PUT',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log('Success:', data);
      
      // Find the item with the matching _id and update its likes property
      const updatedList = list.map(item => {
        console.log(item.likes)
        if (item._id === id) {
          return { ...item, likes: item.likes + 1 };
        } else {
          return item;
        }
      });
      setList(updatedList);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  
  if (!Array.isArray(list)) {
    return <div>No data to display</div>
  }

  return (
    <div className="container mt-3">
      {list.map((item) => (
        <div key={item._id} className="row mb-3">
          <div className="col-12">
            <h5 className="fw-bold text-primary mb-2">You asked:</h5>
            <p className="mb-3">{item.text}</p>
            <h5 className="fw-bold text-success mb-2">AI answered:</h5>
            <p className="mb-0">{item.answer}</p>
            <p> </p>
          </div>
          <div className="col-12">
            <div className="d-flex align-items-center">
              <span className="me-2">Likes:</span>
              <span className="badge bg-secondary">{item.likes}</span>
              <button className="btn btn-primary ms-2" onClick={() => handleLikeButtonClick(item._id)}>Like</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Searchlist;
