import axios from "axios";
import { Suspense } from "react";
import { type Photo } from "@/lib/types";
import Navbar from "@/components/Navbar";
import PhotoGrid from "@/components/sections/PhotoGrid";
import PageLoader from "@/components/loader/PageLoader";
import { BACKEND_URL } from "@/components/constants/backend";

const Photos = async () => {
  let photos: Photo[] = [];

  try {
    const { data } = await axios(`${BACKEND_URL}/photos`);
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
