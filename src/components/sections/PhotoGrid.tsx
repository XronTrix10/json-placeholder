"use client";

import { type Photo } from "@/lib/types";
import { useState } from "react";

const PhotoGrid = (props: { photos: Photo[] }) => {
  const [displayPhotos, setDisplayPhotos] = useState<number>(12);

  return (
    <>
      <section className="w-4/5 mx-auto grid grid-cols-3 gap-4 2xl:gap-x-8 2xl:gap-y-6 mt-12">
        {props.photos.slice(0, displayPhotos).map((photo) => (
          <div key={photo.id} className="bg-gray-200 p-2 rounded-lg">
            <img
              src={photo.thumbnailUrl}
              alt={photo.title}
              className="w-full h-48 2xl:h-56 object-cover rounded-lg"
            />
          </div>
        ))}
      </section>
      <div className="w-fit mx-auto mt-12 mb-44">
        <button
          onClick={() => {
            setDisplayPhotos(displayPhotos + 6);
          }}
          className="p-2 px-4 bg-amber-400 rounded-full mx-auto hover:text-white font-bold hover:font-normal hover:bg-amber-500"
        >
          Load More
        </button>
      </div>
    </>
  );
};

export default PhotoGrid;
