import { Carousel } from "flowbite-react";

export function CarousalSlider() {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel pauseOnHover>
      <div className="grid grid-cols-3 gap-4 px-4">
          <img 
            src="https://flowbite.com/docs/images/carousel/carousel-1.svg" 
            alt="..." 
            className="w-full h-full object-cover rounded-lg"
          />
          <img 
            src="https://flowbite.com/docs/images/carousel/carousel-2.svg" 
            alt="..." 
            className="w-full h-full object-cover rounded-lg"
          />
          <img 
            src="https://flowbite.com/docs/images/carousel/carousel-3.svg" 
            alt="..." 
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="grid grid-cols-3 gap-4 px-4">
          <img 
            src="https://flowbite.com/docs/images/carousel/carousel-4.svg" 
            alt="..." 
            className="w-full h-full object-cover rounded-lg"
          />
          <img 
            src="https://flowbite.com/docs/images/carousel/carousel-5.svg" 
            alt="..." 
            className="w-full h-full object-cover rounded-lg"
          />
          <img 
            src="https://flowbite.com/docs/images/carousel/carousel-1.svg" 
            alt="..." 
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="grid grid-cols-3 gap-4 px-4">
          <img 
            src="https://flowbite.com/docs/images/carousel/carousel-4.svg" 
            alt="..." 
            className="w-full h-full object-cover rounded-lg"
          />
          <img 
            src="https://flowbite.com/docs/images/carousel/carousel-5.svg" 
            alt="..." 
            className="w-full h-full object-cover rounded-lg"
          />
          <img 
            src="https://flowbite.com/docs/images/carousel/carousel-1.svg" 
            alt="..." 
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </Carousel>
    </div>
  );
}
