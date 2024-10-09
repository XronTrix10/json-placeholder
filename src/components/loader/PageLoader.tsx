import { Loader2 } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="h-screen grid place-content-center w-full mx-auto">
      <Loader2 size={40} className="animate-spin text-accent dark:text-light" />
    </div>
  );
};

export default PageLoader;
