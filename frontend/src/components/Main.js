import React, { Component } from 'react'
import "../blocks/main/css/main.css"
import { Link } from 'react-router-dom'

export default class Main extends Component {
  render() {
    return (
        <div className="main">
        <div className="container container-main">
            <div className="main__block">
                <div className="main__title">"Открой двери знаний: исследуй мир университетов!"</div>
                <Link to="/universities" className="main__link"><div className="main__text">Подробнее</div><div className="main__arrows">&gt;&gt;</div></Link>
            </div>
            <div className="main__block">
                <div className="main__title">"Открой свой путь к успеху: найди свою идеальную специальность!"</div>
                <Link to="/specialities" className="main__link"><div className="main__text">Подробнее</div><div className="main__arrows">&gt;&gt;</div></Link>
            </div>
        </div>
    </div>
    )
  }
}
