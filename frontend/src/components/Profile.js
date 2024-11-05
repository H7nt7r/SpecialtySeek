import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../blocks/profile/css/profile.css";

const Profile = ({ isAuthenticated, setIsAuthenticated }) => {
    const [userData, setUserData] = useState({ email: '', name: '' });
    const [editMode, setEditMode] = useState(false);
    const [requests, setRequests] = useState([]);
    const [userTypes, setUserTypes] = useState([]);
    const [types, setTypes] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isManager, setIsManager] = useState(false);
    const [universityData, setUniversityData] = useState({ name_university: '', desc: '', telephone: '', img: null, user_id: null });
    const [showAddUniversityForm, setShowAddUniversityForm] = useState(false);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            checkUserRole();
        }
    }, [userTypes, types, isAuthenticated]);

    useEffect(() => {
        if (userId !== null) {
            setUniversityData(prevData => ({
                ...prevData,
                user_id: userId
            }));
        }
    }, [userId]);

    const fetchData = async () => {
        try {
            const requestsResponse = await axios.get('http://localhost:3001/requests');
            setRequests(requestsResponse.data.requestBody);

            const userTypesResponse = await axios.get('http://localhost:3001/user_types');
            setUserTypes(userTypesResponse.data.requestBody);

            const typesResponse = await axios.get('http://localhost:3001/Types');
            setTypes(typesResponse.data.requestBody);

            const token = localStorage.getItem('token');
            const userResponse = await axios.get('http://localhost:3001/auth/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUserData({
                email: userResponse.data.email,
                name: userResponse.data.name,
            });

            setUserId(userResponse.data.id);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const checkUserRole = async () => {
        try {
            const token = localStorage.getItem('token');
            const userResponse = await axios.get('http://localhost:3001/users/info', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const userId = userResponse.data.id;

            const userTypeEntries = userTypes.filter(ut => parseInt(ut.user_id) === parseInt(userId));
            const userRoles = userTypeEntries.map(ut => types.find(type => parseInt(type.id) === parseInt(ut.type_id))?.name);
            setIsAdmin(userRoles.includes('Admin'));
            setIsManager(userRoles.includes('Manager'));
        } catch (error) {
            console.error('Error checking user role:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEdit = () => {
        setEditMode(prevEditMode => !prevEditMode);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const updatedUserData = { email: userData.email, name: userData.name };

            const response = await axios.put('http://localhost:3001/auth/me', updatedUserData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setUserData(response.data);
            setEditMode(false);
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/');
    };

    const handleRequestApproval = async (requestId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:3001/requests/${requestId}/approve`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const response = await axios.get('http://localhost:3001/requests');
            setRequests(response.data.requestBody);
        } catch (error) {
            console.error('Error approving request:', error);
        }
    };

    const handleRequestRejection = async (requestId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3001/requests/${requestId}/reject`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const response = await axios.get('http://localhost:3001/requests');
            setRequests(response.data.requestBody);
        } catch (error) {
            console.error('Error rejecting request:', error);
        }
    };

    const handleUniversityInputChange = (e) => {
        const { name, value } = e.target;
        setUniversityData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setUniversityData(prevData => ({
            ...prevData,
            img: e.target.files[0],
        }));
    };

    const handleAddUniversity = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('name_university', universityData.name_university);
            formData.append('desc', universityData.desc);
            formData.append('telephone', universityData.telephone);
            formData.append('img', universityData.img);
            formData.append('user_id', userId);

            const response = await axios.post('http://localhost:3001/requests', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data);
            setShowAddUniversityForm(false);
            setUniversityData({ name_university: '', desc: '', telephone: '', img: null });
        } catch (error) {
            console.error('Error adding university:', error);
        }
    };

    return (
        <div className="profile">
            <div className="container container-profile">
                <div className="profile__block">
                    <div className="profile__title">Профиль</div>
                    <form onSubmit={handleSave} className="profile__form">
                        <label className="profile__label">E-mail:</label>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            className="profile__input"
                            disabled={!editMode}
                        />
                        <label className="profile__label">ФИО:</label>
                        <input
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleInputChange}
                            className="profile__input"
                            disabled={!editMode}
                        />
                        <div className='profile__buttons'>
                            {editMode ? (
                                <button type="submit" className="profile__button">Сохранить</button>
                            ) : (
                                <div onClick={handleEdit} className="profile__button">Редактировать</div>
                            )}
                            <button onClick={handleLogout} className="profile__button profile__button--logout">Выйти</button>
                        </div>
                    </form>
                </div>

                {isAdmin && (
                    <div className="profile__block2">
                        <div className="profile__title">Заявки на добавление университетов</div>
                        {requests.length > 0 ? (
                            <ul className='ul'>
                                {requests.map(request => (
                                    <li key={request.id} className="request">
                                        <div className="request__content">
                                            <div className="request__university">
                                                <img src={`/img/requests/${request.img}`} alt={request.name_university} className="request__image" />
                                                <div className="request__info">
                                                    <div className="request__name">{request.name_university}</div>
                                                    <div className="request__desc">{request.desc}</div>
                                                    <div className="request__telephone">{request.telephone}</div>
                                                </div>
                                            </div>
                                            <div className='request_buttons'>
                                                <div onClick={() => handleRequestApproval(request.id)} className="request__approve">Принять</div>
                                                <div onClick={() => handleRequestRejection(request.id)} className='request__reject'>Отмена</div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className='requests__empty'>Нет заявок на добавление университетов.</p>
                        )}
                    </div>
                )}

                {isManager && (
                    <div className="profile__block3">
                        <div className="profile__title">Университеты и специальности</div>
                        <button onClick={() => setShowAddUniversityForm(!showAddUniversityForm)} className="profile__button">
                            {showAddUniversityForm ? 'Отмена' : 'Добавить университет'}
                        </button>
                        {showAddUniversityForm && (
                            <form onSubmit={handleAddUniversity} className="add-university__form">
                                <label className="add-university__label">Название университета:</label>
                                <input
                                    type="text"
                                    name="name_university"
                                    value={universityData.name_university}
                                    onChange={handleUniversityInputChange}
                                    className="add-university__input"
                                    required
                                />
                                <label className="add-university__label">Описание:</label>
                                <textarea
                                    name="desc"
                                    value={universityData.desc}
                                    onChange={handleUniversityInputChange}
                                    className="add-university__textarea"
                                    required
                                />
                                <label className="add-university__label">Телефон:</label>
                                <input
                                    type="text"
                                    name="telephone"
                                    value={universityData.telephone}
                                    onChange={handleUniversityInputChange}
                                    className="add-university__input"
                                    required
                                />
                                <label className="add-university__label">Изображение:</label>
                                <input
                                    type="file"
                                    name="img"
                                    onChange={handleFileChange}
                                    className="add-university__input"
                                    accept="image/*"
                                    required
                                />
                                <button type="submit" className="profile__button">Добавить</button>
                            </form>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
