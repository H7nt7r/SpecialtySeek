import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import "../blocks/speciality/css/speciality.css";

const ShowFullSpeciality = () => {
  const { id } = useParams();
  const [speciality, setSpeciality] = useState(null);

  useEffect(() => {
    fetchSpeciality();
  }, [id]);

  const fetchSpeciality = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/specialities/${id}`);
      setSpeciality(response.data.requestBody);
    } catch (error) {
      console.error('Ошибка при загрузке специальности:', error);
    }
  };

  if (!speciality) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sp">
      <div className="container container-speciality">
        <div className="sp__blocks"> 
          <div className="sp__name">{speciality.name}</div>
          <div className="sp__line"></div>

          <div className="sp__image"> 
            <img src={`/img/${speciality.img}`} alt={speciality.name} />
            <p>{speciality.desc}</p>
          </div>

          <div className="sp__block-link"> 
            <Link className="sp__link" to="/specialities">
              <div className="sp__arrows">&lt;&lt;</div>
              <div className="sp__texts">Назад</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowFullSpeciality;
