import React, { useEffect } from 'react';
import Header from '../Header/Header.js';
import HeroSection from '../HeroSection/HeroSection.js';
import ImageCarousel from '../HeroSection/ImageCarousel.js';
import Middle from '../Middle/Middle.js';
import InterviewExperiences from '../InterviewExperiences/InterviewExperiences.js';
import EventCard from '../EventCard/EvenCard.js';  // Corrected import
import EndBanner from '../EndBanner/EndBanner.js';
import Card from '../Card/Card.js';
import Footer from '../Footer/Footer.js';
import './Home.css';

function Home() {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.slide-up');

      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight - 100) {
          element.classList.add('visible');
        }
      });
    };

    // Trigger handleScroll on page load
    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="Home">
      <Header />
      <section className="slide-up">
        <HeroSection />
      </section>
      <section className="slide-up">
        <ImageCarousel />
      </section>
      <section className="slide-up">
        <Middle />
      </section>
      <section className="slide-up">
        <InterviewExperiences />
      </section>
      <section className="slide-up">
        <EventCard />
      </section>
      <section className="slide-up">
        <EndBanner />
      </section>
      <section className="slide-up">
        <Card />
      </section>
      <section className="slide-up">
        <Footer />
      </section>
    </div>
  );
}

export default Home;
