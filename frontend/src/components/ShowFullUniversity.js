import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import "../blocks/university/css/university.css";

function ShowFullUniversity({ isAuthenticated }) {
  const { id } = useParams();
  const [university, setUniversity] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [usersMap, setUsersMap] = useState([]);
  const [authenticatedUserId, setAuthenticatedUserId] = useState(null);

  useEffect(() => {
    fetchUniversity();
    fetchReviews();
    fetchUsers();
    fetchAuthenticatedUserId();
  }, [id]);

  const fetchUniversity = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/universities/${id}`);
      setUniversity(response.data.requestBody);
    } catch (error) {
      console.error('Ошибка при загрузке университета:', error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/reviews/university/${id}`);
      setReviews(response.data.requestBody.reviews);
      setAverageRating(response.data.requestBody.averageRating);
    } catch (error) {
      console.error('Ошибка при загрузке отзывов:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users');
      const users = response.data;
      setUsersMap(users);
      console.log('||',users);
    } catch (error) {
      console.error('Ошибка при загрузке пользователей:', error);
    }
  };

  const fetchAuthenticatedUserId = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Пользователь не аутентифицирован');
        return;
      }
      const userResponse = await axios.get('http://localhost:3001/users/info', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAuthenticatedUserId(userResponse.data.id);
    } catch (error) {
      console.error('Ошибка при получении данных пользователя:', error);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const universityId = id;
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Пользователь не аутентифицирован');
        return;
      }
      const reviewData = { text: newReview, rating: newRating, university_id: universityId, user_id: authenticatedUserId };
      await axios.post('http://localhost:3001/reviews', reviewData);
      setNewReview("");
      setNewRating(0);
      fetchReviews();
    } catch (error) {
      console.error('Ошибка при отправке отзыва:', error);
    }
  };
  


  const handleReviewDelete = async (reviewId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Пользователь не аутентифицирован');
        return;
      }
      await axios.delete(`http://localhost:3001/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchReviews();
    } catch (error) {
      console.error('Ошибка при удалении отзыва:', error);
    }
  };

  if (!university) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="university-block">
      <div className="container container-university">
        <div className="university-block__block1">
          <div className="university-block__title">{university.name}</div>
          <div className="average-rating">
            <ReactStars
              count={5}
              size={24}
              value={averageRating}
              edit={false}
              activeColor="#ffd700"
              key={averageRating}
            />
            <p>Средняя оценка: {averageRating.toFixed(1)}</p>
          </div>
        </div>

        <div className="university-block__block2">
          {/* Additional content can be added here */}
        </div>

        <div className="university-block__block3">
          <img src={'/img/requests/' + university.img} alt={university.name} align="left" />
          <p>{university.desc}</p>
          <div className="university-block__block4">
            <Link className="university-block__link" to="/universities">
              <div className="university-block__arrows">&lt;&lt;</div>
              <div className="university-block__text">Назад</div>
            </Link>
          </div>
        </div>

        <div className="university-block__reviews">
          <h3 className='title__reviews'>Отзывы</h3>
          {reviews.length === 0 ? (
            <p className='empty__reviews'>Отзывов пока нет</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="review">
                <ReactStars
                  count={5}
                  size={24}
                  value={review.rating}
                  edit={false}
                  activeColor="#ffd700"
                />
                <p className='author__reviews'>Автор: {usersMap.find(user => parseInt(user.id) === parseInt(review.user_id))?.name}</p>
                <p>{review.text}</p>
                <small className='date__reviews'>{new Date(review.date).toLocaleDateString()}</small>
                {isAuthenticated && authenticatedUserId === usersMap.find(user => parseInt(user.id) === parseInt(review.user_id))?.id && (
                  <button onClick={() => handleReviewDelete(review.id)} className='delete__button'>Удалить</button>
                )}
              </div>
            ))
          )}
          {isAuthenticated && (
            <form onSubmit={handleReviewSubmit} className='form__reviews'>
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Напишите свой отзыв"
                required
                className="review-textarea"
              />
              <ReactStars
                count={5}
                size={24}
                value={newRating}
                onChange={(newRating) => setNewRating(newRating)}
                activeColor="#ffd700"
              />
              <button type="submit" className="review-submit-button">Отправить</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowFullUniversity;
