// src/Pages/Projects.jsx
import React, { useEffect } from "react";
import ProjectList from "../Components/ProjectList";
import HorizontalScrollGalleryExample from "../Components/HorizontalScrollGalleryExample";

export default function Projects() {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full">
      <HorizontalScrollGalleryExample></HorizontalScrollGalleryExample>
    </div>
  );
}
