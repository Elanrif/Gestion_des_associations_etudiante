import React from 'react'
import HeadEvent from './Event/HeadEvent'
import CarouselEvent from './Event/CarouselEvent'
import Percentage from './Event/Percentage'

function Event() {
  return (
    <div className="">
      <div className="my-16 bg-black py-5 text-white">   {" "}
        <HeadEvent />
        <CarouselEvent />
      </div>
      <Percentage />
    </div>
  );
}

export default Event
