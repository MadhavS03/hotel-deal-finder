import { useQuery } from "react-query";
import LazyLoad from "react-lazyload";
import { useParams } from "react-router-dom";
import * as apiClient from "./../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import KeenSlider from "keen-slider";
import { useEffect } from "react";

const Detail = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  useEffect(() => {
    if (hotel) {
      const keenSlider = new KeenSlider("#keen-slider", {
        loop: true,
        slides: {
          origin: "center",
          perView: 1.25,
          spacing: 16,
        },
        breakpoints: {
          "(min-width: 1024px)": {
            slides: {
              origin: "auto",
              perView: 1.5,
              spacing: 32,
            },
          },
        },
      });

      const keenSliderPrevious = document.getElementById(
        "keen-slider-previous-desktop"
      );
      const keenSliderNext = document.getElementById(
        "keen-slider-next-desktop"
      );

      if (keenSliderPrevious && keenSliderNext) {
        keenSliderPrevious.addEventListener("click", () => keenSlider.prev());
        keenSliderNext.addEventListener("click", () => keenSlider.next());
      }
    }
  }, [hotel]);

  if (!hotel) {
    return <></>;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    centerMode: true,
    centerPadding: "0",
  };

  return (
    <div
      className="space-y-6"
      style={{
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div>
        <span className="flex">
          {Array.from({ length: hotel.starRating }).map((_, index) => (
            <AiFillStar key={index} className="fill-yellow-400" />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{hotel.name}</h1>
      </div>

      <div className="max-w-screen-md mx-auto">
        {" "}
        {/* Adjust the max-width here */}
        <Slider {...sliderSettings}>
          {hotel.imageUrls.map((image, index) => (
            <LazyLoad key={index} height={400}>
              <div className="h-[400px]">
                <img
                  src={image}
                  alt={hotel.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </LazyLoad>
          ))}
        </Slider>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 pt-5">
        {hotel.facilities.map((facility, index) => (
          <div key={index} className="border border-slate-300 rounded-sm p-3">
            {facility}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-20">
        <div
          className="whitespace-pre-line"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <h1 className="text-2xl font-bold mb-2">Hotel Description</h1>
          <span className="text-md tracking-wide">{hotel.description}</span>
        </div>
        <div className="h-fit">
          <GuestInfoForm
            pricePerNight={hotel.pricePerNight}
            hotelId={hotel._id}
          />
        </div>
      </div>
      <div>
        {/* Testimonials Section */}
        <section className="bg-gray-50 border rounded border-orange-300">
          <div className="mx-auto max-w-[1340px] px-4 py-12 sm:px-6 lg:me-0 lg:py-16 lg:pe-0 lg:ps-8 xl:py-24">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-center lg:gap-16">
              <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Don't just take our word for it...
                </h2>

                <p className="mt-4 text-gray-700">
                  Look what some of our dear customers had to say! Hope their
                  reviews help you in choosing the best hotel for you.
                </p>

                <div className="hidden lg:ml-28 lg:mt-8 lg:flex lg:gap-4">
                  <button
                    aria-label="Previous slide"
                    id="keen-slider-previous-desktop"
                    className="rounded-full border border-orange-500 p-3 text-orange-500 transition hover:bg-orange-500 hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-5 rtl:rotate-180"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                  </button>

                  <button
                    aria-label="Next slide"
                    id="keen-slider-next-desktop"
                    className="rounded-full border border-orange-500 p-3 text-orange-500 transition hover:bg-orange-500 hover:text-white"
                  >
                    <svg
                      className="size-5 rtl:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 5l7 7-7 7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="-mx-6 lg:col-span-2 lg:mx-0">
                <div id="keen-slider" className="keen-slider">
                  <div className="keen-slider__slide">
                    <blockquote className="flex h-full flex-col justify-between bg-white p-6 shadow-sm sm:p-8 lg:p-12">
                      <div>
                        <div className="flex gap-0.5 text-yellow-400">
                          <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>

                          <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>

                          <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>

                          <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>

                          <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>

                        <div className="mt-4">
                          <p className="text-2xl font-bold text-orange-500 sm:text-3xl">
                            Insane Experience!!!
                          </p>

                          <p className="mt-4 leading-relaxed text-gray-700">
                            My stay at the 5-star hotel was simply breathtaking!
                            From the luxurious decor to the impeccable service,
                            every moment felt like a dream. The room was a
                            sanctuary of comfort, the dining experience was a
                            culinary delight, and the spa was pure bliss.
                          </p>
                        </div>
                      </div>

                      <footer className="mt-4 text-sm font-medium text-gray-700 sm:mt-6">
                        &mdash; Michael Scott
                      </footer>
                    </blockquote>
                  </div>
                  <div className="keen-slider__slide">
                    {/* Testimonial content */}
                  </div>
                  <div className="keen-slider__slide">
                    {/* Testimonial content */}
                  </div>
                  <div className="keen-slider__slide">
                    {/* Testimonial content */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End of Testimonials Section */}
      </div>
    </div>
  );
};

export default Detail;
