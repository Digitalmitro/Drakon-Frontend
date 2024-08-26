import React, { useState } from "react";
import slideimg1 from '../../assets/slide-img1.jpg';
import slideimg2 from '../../assets/slide-img2.jpg';
import slideimg3 from '../../assets/slide-img3.jpg';
import slideimg4 from '../../assets/slide-img4.jpg';
import slideimg5 from '../../assets/slide-img5.jpg';
import slideimg6 from '../../assets/slide-img6.jpg';
import slideimg7 from '../../assets/slide-img7.jpg';
import slideimg8 from '../../assets/slide-img8.jpg';
import slideimg9 from '../../assets/slide-img9.jpg';
import slideimg10 from '../../assets/slide-img10.jpg';

const images = [
  slideimg1, slideimg2, slideimg3, slideimg4, 
  slideimg5, slideimg6, slideimg7, slideimg8, 
  slideimg9, slideimg10
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = Math.ceil(images.length / 4);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 4 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex >= images.length - 4;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="slider-container">
      <button onClick={goToPrevious} className="prev-button">
        &#10094;
      </button>
      <div className="slider">
        {images.slice(currentIndex, currentIndex + 4).map((img, index) => (
          <img key={index} src={img} alt={`Slide ${index + 1}`} className="slider-image" />
        ))}
      </div>
      <button onClick={goToNext} className="next-button">
        &#10095;
      </button>

      <div className="slide-indicators">
        {Array.from({ length: totalSlides }).map((_, slideIndex) => (
          <span
            key={slideIndex}
            className={`indicator ${currentIndex / 4 === slideIndex ? "active" : ""}`}
          >
            _
          </span>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
