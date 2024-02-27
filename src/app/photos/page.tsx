import axios from "axios";
import { Suspense } from "react";
import { Photo } from "@/lib/types";
import Navbar from "@/components/Navbar";
import PhotoGrid from "@/components/sections/PhotoGrid";
import PageLoader from "@/components/loader/PageLoader";

const Photos = async () => {
  let photos: Photo[] = [];

  try {
    const { data } = await axios("https://jsonplaceholder.typicode.com/photos");
    photos = data;
  } catch (error) {
    console.error(error);
  }

  return (
    <main className="min-h-screen">
      <Navbar page={1} />

      <Suspense fallback={<PageLoader />}>
        <PhotoGrid photos={photos} />
      </Suspense>
    </main>
  );
};

export default Photos;
