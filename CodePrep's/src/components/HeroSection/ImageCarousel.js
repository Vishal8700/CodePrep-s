// ImageCarousel.js
import React from 'react';
import './ImageCarousel.css'; // Create this file for styling
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner from '../assets/W2.webp'

const ImageCarousel = () => {
  return (
    <div className="carousel-wrapper">
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        interval={3000}
      >
        <div>
          <img src={banner} alt="Slide 1" />
        </div>
        <div>
          <img src={banner} alt="Slide 2" />
        </div>
        <div>
          <img src={banner} alt="Slide 3" />
        </div>
        <div>
          <img src={banner} alt="Slide 4" />
        </div>
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
