import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import dataCard from '../../assets/json/Card';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
const CardSlider = () => {

    return (
        <>
            {/* Related  */}
            <section className=" py-24 dark:bg-jacarta-800">
                <div className="container">
                    <h2 className="mb-8 text-center font-display text-3xl text-jacarta-700 dark:text-white">
                        More from this collection
                    </h2>

                    <div className="relative">
                        {/* Slider  */}
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={20}
                            grabCursor={true}
                            centeredSlides={false}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                },
                                500: {
                                    slidesPerView: 2,
                                },
                                700: {
                                    slidesPerView: 2,
                                },
                                991: {
                                    slidesPerView: 4,
                                },
                            }}
                            navigation={
                                {
                                    nextEl: ".swiper-button-next",
                                    prevEl: ".swiper-button-prev"
                                }
                            }

                            loop={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: true,
                            }}
                            modules={[Pagination, Navigation, Autoplay]}
                            className="card-slider-4-columns !py-5"
                        >
                            {
                                dataCard.map(item => (
                                    <SwiperSlide key={item.id} >
                                        <article>
                                            <div className="block rounded-2.5xl border border-jacarta-100 bg-white p-[1.1875rem]
                                     transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700"
                                            >
                                                <figure>
                                                    <a href="#">
                                                        <img
                                                            src={item.img}
                                                            alt="item 1"
                                                            width="230"
                                                            height="230"
                                                            className="w-full rounded-[0.625rem]"
                                                            loading="lazy"
                                                        />
                                                    </a>
                                                </figure>
                                                <div className="mt-4 flex items-center justify-between">
                                                    <a href="#">
                                                        <span className="font-display text-base text-jacarta-700 hover:text-accent dark:text-white"
                                                        >{item.title} </span>
                                                    </a>
                                                    <span className="flex items-center whitespace-nowrap
                                                         rounded-md border border-jacarta-100 py-1 px-2 dark:border-jacarta-600" >
                                                        <span data-tippy-content="ETH"> </span>
                                                        <span className="text-sm font-medium tracking-tight text-green">{item.price}</span>
                                                    </span>
                                                </div>
                                                <div className="mt-2 text-sm">
                                                    <span className="dark:text-jacarta-300">Current Bid</span>
                                                    <span className="text-jacarta-700 dark:text-jacarta-100">{item.bid}</span>
                                                </div>
                                                <div className="mt-8 flex items-center justify-between">
                                                    <button
                                                        type="button"
                                                        className="font-display text-sm font-semibold text-accent"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#placeBidModal"  >
                                                        Buy
                                                    </button>
                                                    <div className="flex items-center space-x-1">
                                                    <Tippy content="Favorite" placement="top">
                                                        <span className="js-likes relative 
                                                        cursor-pointer before:absolute before:h-4
                                                         before:w-4 before:bg-[url('../../assets/img/heart-fill.svg')] 
                                                         before:bg-cover before:bg-center before:bg-no-repeat before:opacity-0"
                                                             >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 24 24"
                                                                width="24"
                                                                height="24"
                                                                className="h-4 w-4 fill-jacarta-500 hover:fill-red
                                                                 dark:fill-jacarta-200 dark:hover:fill-red"
                                                                 
                                                            >
                                                                <path fill="none" d="M0 0H24V24H0z" />
                                                                <path
                                                                    d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z"
                                                                />
                                                            </svg>
                                                        </span>
                                                        </Tippy>
                                                        <span className="text-sm dark:text-jacarta-200">{item.like}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>

                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                        {/* Slides  */}


                        {/* Slider Navigation  */}
                        <div className="swiper-button-prev swiper-button-prev-1
                         group absolute top-1/2 -left-4 z-10 -mt-6 flex h-12 w-12
                          cursor-pointer items-center justify-center rounded-full
                           bg-white p-3 text-base shadow-white-volume sm:-left-6 " >

                        </div>
                        <div className="swiper-button-next swiper-button-next-1 group absolute top-1/2 -right-4 z-10 -mt-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-base shadow-white-volume sm:-right-6 "
                        >
                        </div>
                    </div>
                </div>
            </section>
            {/* end related            */}
        </>
    )
}

export default CardSlider