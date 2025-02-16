import { Carousel } from "flowbite-react";

export function CarousalSlider() {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel pauseOnHover>
      <div className="grid grid-cols-3 gap-4 px-4">
          <img 
            src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVvcGxlfGVufDB8fDB8fHww" 
            alt="..." 
            className="w-full h-full object-cover rounded-lg"
          />
          <img 
            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D" 
            alt="..." 
            className="w-full h-full object-cover rounded-lg"
          />
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww" 
            alt="..." 
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      {/* <div className="grid grid-cols-3 gap-4 px-4">
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
        </div> */}
        <div className="grid grid-cols-3 gap-4 px-4">
          <img 
            src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVvcGxlfGVufDB8fDB8fHww" 
            alt="..." 
            className="w-full h-full object-cover rounded-lg"
          />
          <img 
            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D" 
            alt="..." 
            className="w-full h-full object-cover rounded-lg"
          />
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww" 
            alt="..." 
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="grid grid-cols-3 gap-4 px-4">
          <img 
            src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVvcGxlfGVufDB8fDB8fHww" 
            alt="..." 
            className="w-full h-full object-cover rounded-lg"
          />
          <img 
            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D" 
            alt="..." 
            className="w-full h-full object-cover rounded-lg"
          />
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww" 
            alt="..." 
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </Carousel>
    </div>
  );
}
