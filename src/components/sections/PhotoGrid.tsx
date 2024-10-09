"use client";

import { type Photo } from "@/lib/types";
import { randomInt } from "crypto";
import { useState } from "react";

const PhotoGrid = (props: { photos: Photo[] }) => {
  const [displayPhotos, setDisplayPhotos] = useState<number>(12);

  return (
    <>
      <section className="w-4/5 mx-auto grid grid-cols-3 gap-4 2xl:gap-x-8 2xl:gap-y-6 mt-12">
        {props.photos.slice(0, displayPhotos).map((photo) => (
          <div key={photo.id} className="rounded-lg">
            <img
              src={`https://picsum.photos/id/${Math.floor((Math.random() * 98) + 1)}/800/500`}
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
          className="p-2 px-4 load-more rounded-full mx-auto font-bold"
        >
          Load More
        </button>
      </div>
    </>
  );
};

export default PhotoGrid;
