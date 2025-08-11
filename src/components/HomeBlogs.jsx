import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../App.css';
import Slider from "react-slick";
import '../styles/HomeBlog.css'
import { FaRegEye } from "react-icons/fa";

function HomeBlogs() {

const updatesCardItems = [
        {
          image: "card-images/card1.jpg",
          title: "Package Title Here",
          description: "World's cultural festival.Time Schedule published.",
        },
        {
          id: "2",
          image: "card-images/card2.jpg",
          title: "Package Title Here",
          description: "The colourfull festival are announced. Time Schedule published.",
        },
        {
          id: "3",
          image: "card-images/card3.jpg",
          title: "Package Title Here",
          description: "Newly introduced program for tourism by Sri Lanka government. Packages and programs released.",
        },
        {
          id: "4",
          image: "card-images/card4.jpg",
          title: "Package Title Here",
          description: "Newly introduced program for tourism by Sri Lanka government. Packages and programs released.",
        },
        {
            id: "1",
            image: "card-images/card1.jpg",
            title: "Package Title Here",
            description: "World's cultural festival.Time Schedule published.",
          },
          {
            id: "2",
            image: "card-images/card2.jpg",
            title: "Package Title Here",
            description: "The colourfull festival are announced. Time Schedule published.",
          },
      ];
    
      //slider settings
      var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              dots: true,
              infinite: true,
              slidesToShow: 3,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 5000,
            }
          },
          {
            breakpoint: 900,
            settings: {
              dots: true,
              infinite: true,
              slidesToShow: 2,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 5000,
            }
          },
          {
            breakpoint: 768,
            settings: {
              dots: true,
              infinite: true,
              slidesToShow: 2,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 5000,
            }
          },
          {
            breakpoint: 480,
            settings: {
              dots: true,
              infinite: true,
              slidesToShow: 1,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 5000,
            }
          }
        ]
    };


  return (
    <>
        {/* cards section*/}
        <div className="w-5/6 mt-10 mx-auto h-[50vh] lg:min-h-[27rem]">
            <Slider {...settings}>
              {
                updatesCardItems.map((item, index)=> {
                  return(
                    // cards
                    <div className="center items-center">
                      <div className="article-card">
                        <div className="content">
                          <p className="date">Jan 1, 2022</p>
                          <p className="title">Article Title Goes Here</p>

                          <div className=" absolute flex items-center w-20 justify-center text-xl bg-white/30 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full shadow-sm hover:shadow-md hover:bg-secondary hover:cursor-pointer text-white  transition right-5 bottom-5">
                            <FaRegEye />
                          </div>
                        </div>
                        <img src="./card-images/card4.jpg" alt="article-cover" />

     
                      </div>
                    </div>
                  )
                })
              }
            </Slider>
          </div>  
    </>

  )
}

export default HomeBlogs