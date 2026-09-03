import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './News.css'
import './newsModal.css'
import NewsModal from './newsModal'

const categories = ['top', 'world', 'business', 'technology', 'entertainment', 'sports', 'science', 'health']

const categoryLabels = {
  top: 'General',
  world: 'World',
  business: 'Business',
  technology: 'Technology',
  entertainment: 'Entertainment',
  sports: 'Sports',
  science: 'Science',
  health: 'Health',
}

const News = () => {
  const [articles, setArticles] = useState([])
  const [category, setCategory] = useState('top')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedArticle, setSelectedArticle] = useState(null)

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await axios.get('https://newsdata.io/api/1/news', {
          params: {
            apikey: import.meta.env.VITE_NEWS_API_KEY,
            category: category,
            language: 'en',
          }
        })
        setArticles(res.data.results || [])
      } catch (err) {
        console.error(err)
        setError('Failed to load news.')
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [category])

  const headline = articles[0]
  const gridArticles = articles.slice(1, 7)

  const handleCategoryClick = (e, cat) => {
    e.preventDefault()
    setCategory(cat)
  }

  const handleArticleClick = (article) => {
    setSelectedArticle(article)

    console.log(article)
  }

  const closeModal = () => {
    setSelectedArticle(null)
  }

  return (
    <div className='news-app'>
      <div className="news-header">
        <h1 className="logo">News App</h1>
      </div>
      <div className="news-content">
        <nav className="navbar">
          <h1 className="nav-heading">Categories</h1>
          <div className="categories">
            {categories.map((cat) => (
              <a key={cat} href="#" className={cat === category ? 'nav-link active' : 'nav-link'} onClick={(e) => handleCategoryClick(e, cat)}>
                {categoryLabels[cat]}
              </a>
            ))}
          </div>
        </nav>
        <div className="news-section">
          {loading && <p className="status-msg">Loading...</p>}
          {error && <p className="status-msg">{error}</p>}

          {!loading && !error && headline && (
            <div className="headline" onClick={() => handleArticleClick(headline)}>
              <img src={headline.image_url || '/placeholder.jpg'} alt={headline.title} />
              <h2 className="headline-title">{headline.title}</h2>
            </div>
          )}

          {!loading && !error && (
            <div className="news-grid">
              {gridArticles.map((article, i) => (
                <div className="news-grid-item" key={i} onClick={() => handleArticleClick(article)}>
                  <img src={article.image_url || '/placeholder.jpg'} alt={article.title} />
                  <h3>{article.title}</h3>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedArticle && (
        <NewsModal article={selectedArticle} onClose={closeModal} />
      )}

      <footer>
        <p className="copyright">
          <span>News App</span>
        </p>
        <p>&copy; All Rights Reserved. By Code And Create</p>
      </footer>
    </div>
  )
}

export default News