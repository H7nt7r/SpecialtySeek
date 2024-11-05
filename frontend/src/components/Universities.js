import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../blocks/universities/css/universities.css";

const Universities = () => {
  const [universities, setUniversities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUniversities, setFilteredUniversities] = useState([]);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get('http://localhost:3001/universities');
        const sortedUniversities = response.data.requestBody.sort((a, b) => a.name.localeCompare(b.name));
        setUniversities(sortedUniversities);
        setFilteredUniversities(sortedUniversities);
      } catch (error) {
        console.error('Error fetching universities:', error);
      }
    };

    fetchUniversities();
  }, []);

  useEffect(() => {
    setFilteredUniversities(
      universities.filter(university =>
        university.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, universities]);

  return (
    <div className="universities-block">
      <div className="container-2 container-universities">
        <div className="universities-block__block1">
          <div className="universities-block__title">Учебные заведения</div>
          <form>
            <input
              type="search"
              className="universities-block__search-string"
              placeholder="Поиск"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>

        <div className="universities-block__block2">
          {/* Placeholder for additional content or filters */}
        </div>

        {filteredUniversities.length > 0 ? (
          filteredUniversities.map(university => (
            <div key={university.id} className="universities-block__block3">
              <div className="universities-block__column1">
                <img src={'/img/requests/' + university.img} alt={university.name} />
              </div>
              <div className="universities-block__column2">
                <div className="universities-block__title-university">{university.name}</div>
                <div className="universities-block__text-university">{university.desc}</div>
                <Link className="universities-block__link" to={`/university/${university.id}`}>
                  <div className="universities-block__text">Подробнее</div>
                  <div className="universities-block__arrows">&gt;&gt;</div>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="universities-block__no-results">
            Университеты не найдены
          </div>
        )}
      </div>
    </div>
  );
};

export default Universities;
