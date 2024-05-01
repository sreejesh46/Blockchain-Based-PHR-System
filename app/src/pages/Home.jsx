import React from "react";

import "./Home.css";
import { Link, NavLink } from "react-router-dom";
import { GiStethoscope } from 'react-icons/gi';

import logo from "../data/logo.png";
import logo2 from "../data/logo.svg";
import sthetoscope from "../data/stethoscope.png";
import vector from "../data/vector.svg";
import down from "../data/upload.svg";
import user from "../data/user.svg";
import tick from "../data/tick.svg";
import store from "../data/store.png";
import doc from "../data/doc.svg";
import disease from "../data/disease.webp";
import member1 from "../data/1.png";
import member2 from "../data/2.png";

const Home = () => {
  return (
    <div>
      <header className="header" id="header">
        <nav className="container nav">
          <div className="logo">
            <img className="logo-img" src={logo} />
            <a href="#" className="nav__logo">
            <strong>Care Cryption</strong>
          </a>
          
          </div>
          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
              <li className="nav__item">
                <a href="#home" className="nav__link">
                  Home
                </a>
              </li>
              <li className="nav__item">
                <a href="#about" className="nav__link">
                  Get Started
                </a>
              </li>
              {/* <li className="nav__item">
                <a href="#how" className="nav__link">
                  How?
                </a>
              </li> */}
              <li className="nav__item">
                <a href="#services" className="nav__link">
                  Services
                </a>
              </li>
              <li className="nav__item">
                <a href="#contact" className="nav__link">
                  Contact Us
                </a>
              </li>

              <i
                className="bx bx-toggle-left change-theme"
                id="theme-button"
              ></i>
            </ul>
          </div>

          <div className="nav__toggle" id="nav-toggle">
            <i className="bx bx-grid-alt"></i>
          </div>
          <div style={{ display: "flex" }}>
            <Link to="/login" className="button button__header log">
              Log In
            </Link>
            <Link to="/signup" className="button button__header">
              Sign Up
            </Link>
          </div>
        </nav>
      </header>
      <main className="main">
        <section className="container home section" id="home">
          <div className="grid home__container">
            <div className="home__data">
              <h1 className="home__title">Health Record System</h1>
              <p className="home__description">
                Care Cryption is a secure blockchain based platform for storage of
                highly sensitive and critical data related to patients that is
                shared among multiple facilities and agencies for effective
                diagnosis and treatment.
              </p>

              <Link to="/signup" className="button">
                Sign Up Now!
              </Link>
            </div>
            <img className="sto-img" src={vector} />
          </div>
        </section>
        <section className="container services section" id="about">
          <h2 className="section__title">Getting started is quick and easy</h2>
          <div className="grid services__container">
            <div className="services__data">
              <h3 className="services__subtitle">Register Yourself</h3>
              <img className="services__img" src={user} />
              <p className="services__description">
                Register yourself to the locker, secured by blockchain
                technology.
              </p>
            </div>

            <div className="services__data">
              <h3 className="services__subtitle">Authenticate Yourself</h3>
              <img className="services__img" src={tick} />
              <p className="services__description">
                Log In with your credentials.
              </p>
            </div>

            <div className="services__data">
              <h3 className="services__subtitle">Upload your Data</h3>
              <img className="services__img" src={down} />
              <p className="services__description">
                Create, update, or view your health record information.
              </p>
            </div>
          </div>
        </section>
        <section className="container services section" id="services">
          <h2 className="section__title">Services we deliver</h2>
          <div className="grid services__container">
            <div className="services__data">
              <h3 className="services__subtitle">Maintaining Medical Records</h3>
              <img className="services__img" src={store} />
              <p className="services__description">
              Keep track of your medical records, enabled by blockchain
                technology.
              </p>
            </div>

            <div className="services__data">
              <h3 className="services__subtitle">Connect With Doctors</h3>
              <img className="services_img" src={doc} />
              <p className="services__description">
              Share your records with our trusted medical experts, to get a prescription.
              </p>
            </div>

            <div className="services__data">
              <h3 className="services__subtitle">Quick Access With NFC Card</h3>
              <img className="servicesimg" src={disease} />
              <p className="services__description">
              Effortlessly retrieve patient health records using an NFC card for quick access.
              </p>
            </div>
          </div>
        </section>
        <section className="container contact section" id="contact">
            <div className="grid contact__container">
                <div className="contact__content">
                    <h2 className="section__title-center">Contact Us</h2>
                    <p className="contact__description">You can contact us from here, you can write to us,
                        call us for suggestions and enhancements.</p>
                </div>

                <ul className="grid contact__content">
                    <li className="contact__address">Telephone: <span className="contact__information">+91 8138914466</span>
                    </li>
                    <li className="contact__address">Email: <span
                            className="contact__information">team7@gmail.com</span></li>
                    <li className="contact__address">Location: <span className="contact__information">Ernakulam</span></li>
                </ul>
            </div>
        </section>
      </main>
        <footer className="footer section">
          <p className="footer__copy">
            Design And Developed By Team7
          </p>
          <p className="footer__copy">&#169; Care Cryption. All right reserved</p>
        </footer>
    </div>
  );
};

export default Home;
