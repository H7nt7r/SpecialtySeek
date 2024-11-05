import React, { Component } from 'react'
import "../blocks/footer/css/footer.css"

export default class Footer extends Component {
  render() {
    return (
    <footer className="footer">
        <div className="footer__title"><div>SPECIALITY</div><div className="col">SEEK</div></div>
        <div className="footer__email">speciality_seek@gmail.com</div>
        <div className="footer__social">
            <a href=""><img src="/img/instagram.png" /></a>
            <a href=""><img src="/img/telegram.png" /></a>
            <a href=""><img src="/img/vk.png" /></a>
            <a href=""><img src="/img/twitter.png" /></a>
        </div>
        <div className="footer__copyright">
            <img src="/img/copyright.png" />
            <p>speciality_seek 2023</p>
        </div>
    </footer>
    )
  }
}
