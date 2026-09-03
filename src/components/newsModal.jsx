import React from 'react'
import "./NewsModal.css"

const NewsModal = ({ article, onClose }) => {
  if (!article) {
    return null
  }

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <span className='close-button' onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>

        <img src={article.image_url || '/placeholder.jpg'} alt={article.title} className='modal-image' />

        <h2 className="modal-title">{article.title}</h2>

        <p className="modal-source">Source: {article.source_id || 'Unknown'}</p>

        <p className="modal-date">
          {article.pubDate
            ? new Date(article.pubDate).toLocaleString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })
            : ''}
        </p>

        <p className="modal-context-text">{article.description || 'No description available.'}</p>

        <a href={article.link} target="_blank" rel="noopener noreferrer" className='read-more-link'>
          Read More
        </a>
      </div>
    </div>
  )
}

export default NewsModal