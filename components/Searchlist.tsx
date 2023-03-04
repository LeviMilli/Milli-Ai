import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';

interface SearchlistProps {
  list: {
    _id: string;
    text: string;
    answer: string;
    likes: number;
  }[];
}

async function handleLikeButtonClick(id: string) {
  console.log(id)
  try {
    const response = await fetch(`/api/search/${id}/like`, {
      method: 'POST',
    });
    const data = await response.json();
    console.log('Success:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

function Searchlist({ list }: SearchlistProps) {
  console.log(list)
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
