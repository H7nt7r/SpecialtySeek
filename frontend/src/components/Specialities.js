import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../blocks/specialities/css/specialities.css";
import { Link } from 'react-router-dom';

const Specialities = () => {
  const [disciplines, setDisciplines] = useState([]);
  const [disciplineTypes, setDisciplineTypes] = useState([]);
  const [selectedDisciplines, setSelectedDisciplines] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/disciplines')
      .then(response => {
        const sortedDisciplines = response.data.requestBody.sort((a, b) => a.name.localeCompare(b.name));
        setDisciplines(sortedDisciplines);
      })
      .catch(error => {
        console.error("There was an error fetching the disciplines!", error);
      });
  
    axios.get('http://localhost:3001/discipline_types')
      .then(response => {
        setDisciplineTypes(response.data.requestBody);
      })
      .catch(error => {
        console.error("There was an error fetching the discipline_types!", error);
      });
  
    axios.get('http://localhost:3001/universities')
      .then(response => {
        console.log("Universities data: ", response.data.requestBody);
        setUniversities(response.data.requestBody);
      })
      .catch(error => {
        console.error("There was an error fetching the universities!", error);
      });
  
      axios.get('http://localhost:3001/faculties')
      .then(response => {
          console.log("Faculties data: ", response.data.requestBody); // Добавлено для проверки данных
          setFaculties(response.data.requestBody);
      })
      .catch(error => {
          console.error("There was an error fetching the faculties!", error);
      });
  
    axios.get('http://localhost:3001/specialities')
      .then(response => {
        console.log("Specialities data: ", response.data.requestBody); 
        setSpecialities(response.data.requestBody);
      })
      .catch(error => {
        console.error("There was an error fetching the specialities!", error);
      });
  }, []);
  

  const handleDisciplineChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedDisciplines([...selectedDisciplines, value]);
    } else {
      setSelectedDisciplines(selectedDisciplines.filter(d => d !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get('http://localhost:3001/specialities', {
        params: { disciplines: selectedDisciplines.join(',') }
    })
    .then(response => {
        const results = response.data.requestBody;
        console.log('Received specialities:', results); // Проверка данных специальностей
        const specialitiesWithUniversities = results.map(speciality => {
            if (!speciality.faculty_id) {
                console.error('Speciality without faculty_id:', speciality); // Проверка наличия faculty_id
            }
            const university = getUniversityNameBySpeciality(speciality);
            return {
                ...speciality,
                universityName: university.name,
                universityId: university.universityId
            };
        });
        setSpecialities(specialitiesWithUniversities);
        setNoResults(results.length === 0);
    })
    .catch(error => {
        console.error("There was an error fetching the specialities!", error);
        setNoResults(true);
    });
};


const getUniversityNameBySpeciality = (speciality) => {
  console.log('Getting university name for speciality:', speciality); // Отладка специальности
  const faculty = faculties.find(f => parseInt(f.id) === parseInt(speciality.faculty_id));
  console.log('Found faculty:', faculty); // Отладка найденного факультета
  if (!faculty) {
      console.error(`Faculty not found for speciality: ${speciality.name}, faculty_id: ${speciality.faculty_id}`);
      return { name: 'Факультет не найден', universityId: null };
  }

  const university = universities.find(u => parseInt(u.id) === parseInt(faculty.university_id));
  console.log('Found university:', university); // Отладка найденного университета
  if (!university) {
      console.error(`University not found for faculty: ${faculty.name}, faculty_id: ${faculty.id}, university_id: ${faculty.university_id}`);
      return { name: 'Университет не найден', universityId: null };
  }

  console.log(`Found university: ${university.name} for speciality: ${speciality.name}, faculty: ${faculty.name}`);
  
  return { name: university.name, universityId: university.id };
};

  
  const getDisciplinesBySpeciality = (speciality) => {
    const disciplineIds = disciplineTypes
      .filter(dt => parseInt(dt.speciality_id) === parseInt(speciality.id))
      .map(dt => parseInt(dt.discipline_id));

    const specialityDisciplines = disciplines
      .filter(discipline => disciplineIds.includes(parseInt(discipline.id)))
      .map(discipline => discipline.name);
    
    return specialityDisciplines.length > 0 ? specialityDisciplines.join(', ') : 'Нет дисциплин';
  };

  return (
    <div className="sp">
      <div className="container container-specialities">
        <div className="sp__block">
          <div className="sp__title1">Поиск специальностей по сертификатам ЦТ</div>
          <div className="sp__line1"></div>
          <div className="sp__disciplines">
            <div className="sp__subtitle">Сертификаты ЦТ</div>
            <form className="sp__form" onSubmit={handleSubmit}>
              <div className='sp__form-disciplines'>
                {disciplines.map((discipline, index) => (
                  <div className="sp__discipline" key={index}>
                    <input
                      type="checkbox"
                      className="sp__input"
                      value={discipline.name}
                      onChange={handleDisciplineChange}
                    />
                    <label>{discipline.name}</label>
                  </div>
                ))}
              </div>
              <button type="submit" className="sp__button">Найти</button>
            </form>
          </div>
          <div className="sp__title2">Результаты поиска по результатам ЦТ</div>
          <div className="sp__line2"></div>
          <div className="sp__specialities-blocks">
            {noResults ? (
              <div className="sp__no-results">Специальности по выбранным дисциплинам не найдены.</div>
            ) : (
              specialities.map((speciality, index) => {
                const university = getUniversityNameBySpeciality(speciality);
                return (
                  <div className="sp__speciality-block" key={index}>
                    <div className="sp__col1">
                      <img src={'/img/' + speciality.img} alt={speciality.name} />
                    </div>
                    <div className="sp__col2">
                      {university.universityId && ( 
                        <Link to={`/university/${university.universityId}`} className="sp__title">
                          {university.name}
                        </Link>
                      )}
                      <Link to={`/speciality/${speciality.id}`} className="sp__text">{speciality.name}</Link>
                      <div className="sp__text2">Необходимые предметы: {getDisciplinesBySpeciality(speciality)}</div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specialities;
