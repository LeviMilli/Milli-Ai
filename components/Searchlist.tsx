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

function Searchlist({ list }: SearchlistProps) {
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
          </div>
          <div className="col-12">
            <div className="d-flex align-items-center">
              <span className="me-2">Likes:</span>
              <span className="badge bg-secondary">{item.likes}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Searchlist;
