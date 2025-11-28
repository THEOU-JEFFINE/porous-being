// src/Components/HorizontalScrollGalleryExample.jsx
import React from "react";
import HorizontalScrollGallery from "./HorizontalScrollGallery";
import logo45 from "../assets/45.png";

/**
 * Example usage of HorizontalScrollGallery component
 * This shows how to use the component with images from Compressed Images folder
 */
export default function HorizontalScrollGalleryExample() {
  // Example 1: All images from RESIDENTIAL - 45 degree with text sections
  const projectItems = React.useMemo(() => {
    // Load all images from RESIDENTIAL - 45 degree folder
    const imageModules = import.meta.glob(
      "../assets/Compressed Images/RESIDENTIAL - 45 degree/*.jpg",
      { eager: true, as: "url" }
    );

    const items = [];
    const imageEntries = Object.entries(imageModules).sort(([pathA], [pathB]) =>
      pathA.localeCompare(pathB)
    );

    // Add images with text sections interspersed
    imageEntries.forEach(([path, url], index) => {
      items.push({
        type: "image",
        src: url,
        alt: path.split("/").pop().replace(".jpg", ""),
      });

      // Add text sections after every 5 images
      if ((index + 1) % 5 === 0 && index < imageEntries.length - 1) {
        items.push({
          type: "text",
          title: "RESIDENTIAL - 45 Degree",
          content:
            "This innovative architectural design combines sustainable materials with modern aesthetics. The building features natural ventilation systems and maximizes natural light.\n\nOur approach focuses on creating spaces that are both functional and inspiring.",
        });
      }
    });

    return items;
  }, []);
  const [active, setActive] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  // Handler to detect horizontal scroll
  const handleScroll = (e) => {
    if (!scrolled && e.target.scrollLeft > 10) {
      setScrolled(true);
    }
  };

  return (
    <div className="flex items-start justify-center w-full h-full pt-16">
      <div
        className={`transition-all duration-500 ease-in-out ${
          scrolled
            ? "fixed inset-0 w-screen h-screen z-50"
            : active
            ? "w-screen h-[500px] relative z-50"
            : "w-[400px] h-[250px] relative z-50 cursor-pointer"
        }`}
        onClick={() => !active && setActive(true)}
      >
        <HorizontalScrollGallery
          items={projectItems}
          height={scrolled ? "h-screen" : active ? "h-[500px]" : "h-[250px]"}
          className="w-full h-full"
          onScroll={handleScroll}
          intro={
            active
              ? {
                  type: "intro",
                  logo: logo45,
                  title: "Hamburg State Opera",
                  location: "HAMBURG, GERMANY",
                  year: "2025",
                  typology: "CULTURE",
                  size: "45,000 / 525,000",
                  status: "IN DESIGN",
                  shareIcons: [
                    {
                      href: "",
                      icon: (
                        <span
                          className="material-icons"
                          style={{ fontSize: 20 }}
                        >
                          email
                        </span>
                      ),
                    },
                    {
                      href: "https://facebook.com",
                      icon: (
                        <span
                          className="material-icons"
                          style={{ fontSize: 20 }}
                        >
                          facebook
                        </span>
                      ),
                    },
                    {
                      href: "https://linkedin.com",
                      icon: (
                        <span
                          className="material-icons"
                          style={{ fontSize: 20 }}
                        >
                          linkedin
                        </span>
                      ),
                    },
                    {
                      href: "https://x.com",
                      icon: (
                        <span
                          className="material-icons"
                          style={{ fontSize: 20 }}
                        >
                          close
                        </span>
                      ),
                    },
                  ],
                }
              : null
          }
        />
      </div>
    </div>
  );
}
