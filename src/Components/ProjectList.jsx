// src/Components/ProjectList.jsx
import React, { useState, useRef, useEffect } from "react";
import GalleryListItem from "./GalleryListItem";

// --- DYNAMIC IMAGE IMPORTS FOR ALL PROJECTS ---
// Ensure folders exist: src/assets/residential, src/assets/greenways, src/assets/kanyakumari
const residentialImageModules = import.meta.glob(
  "../assets/residential/*.jpg",
  { eager: true, as: "url" }
);
const greenwaysImageModules = import.meta.glob(
  "../assets/resgreenways/*.{png,jpg}",
  { eager: true, as: "url" }
);
const kanyakumariImageModules = import.meta.glob(
  "../assets/kanyakumaribridge/*.jpg",
  { eager: true, as: "url" }
);
// --- END DYNAMIC IMAGE IMPORTS ---

// Helper function to process modules into structured array
const processModules = (modules) => {
  return Object.keys(modules)
    .sort()
    .map((path) => ({
      src: modules[path],
      alt: path
        .split("/")
        .pop()
        .replace(/_/g, " ")
        .replace(/\.(png|jpg|jpeg)/gi, ""),
      caption: `Image ${path.split("/").pop()}`,
    }));
};

const residentialImages = processModules(residentialImageModules);
const greenwaysImages = processModules(greenwaysImageModules);
const kanyakumariImages = processModules(kanyakumariImageModules);

// --- PROJECT DATA ARRAY DEFINITION (Must be defined OUTSIDE the function) ---
const projectsData = [
  // ----------------------------------------------------
  // PROJECT 1: RESIDENTIAL - 45 degree
  // ----------------------------------------------------
  {
    title: "RESIDENTIAL - 45 Degree",
    location: "Tallahassee, FL",
    year: "2025",
    client: "TML Group",
    typology: "Residential, Luxury",
    size: "4,500 sqft",
    status: "In Progress",
    description: `This project is a dynamic, modern residence defined by its distinct 45-degree angle roofline and orientation. The design utilizes passive solar strategies and provides expansive views of the surrounding landscape.\n\nScroll horizontally to view all ${residentialImages.length} images dynamically imported from the RESIDENTIAL - 45 degree folder.`,
    images: residentialImages,
    thumbnail: residentialImages.length > 0 ? residentialImages[0].src : null,
  },
  // ----------------------------------------------------
  // PROJECT 2: RESIDENTIAL - Greenways (NEW)
  // ----------------------------------------------------
  {
    title: "RESIDENTIAL - Greenways",
    location: "Chennai, India",
    year: "2024",
    client: "Greenways Group",
    typology: "Residential, Sustainable",
    size: "8,000 sqft",
    status: "Completed",
    description: `A sustainable residential development designed to maximize ventilation and natural light. The project focuses on minimal environmental impact, utilizing local materials and green roofing systems.\n\nExplore the interior and exterior visualizations of this project through the continuous scroll gallery.`,
    images: greenwaysImages,
    thumbnail: greenwaysImages.length > 0 ? greenwaysImages[0].src : null,
  },
  // ----------------------------------------------------
  // PROJECT 3: UNBUILT - Kanyakumari Bridge (NEW)
  // ----------------------------------------------------
  {
    title: "UNBUILT - Kanyakumari Bridge",
    location: "Kanyakumari, India",
    year: "2026",
    client: "Indian Infrastructure",
    typology: "Infrastructure, Unbuilt",
    size: "N/A",
    status: "Proposal",
    description: `A visionary proposal for a signature pedestrian bridge designed to connect the mainland with the Vivekananda Rock Memorial, providing a unique architectural statement at the southern tip of India.\n\nThese concept images and technical drawings illustrate the scale and design philosophy of the unbuilt proposal.`,
    images: kanyakumariImages,
    thumbnail: kanyakumariImages.length > 0 ? kanyakumariImages[0].src : null,
  },
  // ----------------------------------------------------
  // PROJECT 4: Hamburg State Opera (EXISTING)
  // ----------------------------------------------------
  // {
  //   title: "Hamburg State Opera",
  //   location: "Hamburg, Germany",
  //   year: "2023",
  //   client: "City of Hamburg",
  //   typology: "Culture, Performing Arts",
  //   size: "30,000 sqm",
  //   status: "Completed",
  //   description: `The Hamburg State Opera reimagined as a fluid, organic structure, seamlessly blending with its urban surroundings and the Elbe river. The design features undulating timber roofs and expansive glass facades, creating a dynamic interplay of light and shadow.\n\nCurabitur blandit tempus porttitor. Nullam quis risus eget urna mollis ornare vel eu leo. Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.`,
  //   images: [
  //     { src: "https://images.unsplash.com/photo-1614068305740-4229b4b0e118?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODU3NTB8MHwxfHNlYXJjaHw1fHNoaXAlMjBhcmNoaXRlY3R1cmV8ZW58MHx8fHwxNzExNDYzODY3fDA&ixlib=rb-4.0.3&q=80&w=2000", alt: "Hamburg State Opera exterior", caption: "A view of the opera house from the riverside park." },
  //     { src: "https://images.unsplash.com/photo-1579737198124-7e5c6b65349e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODU3NTB8MHwxfHNlYXJjaHw1fHNoaXAlMjBhcmNoaXRlY3R1cmV8ZW58MHx8fHwxNzExNDYzODY3fDA&ixlib=rb-4.0.3&q=80&w=2000", alt: "Opera house interior lobby", caption: "The grand lobby features a double-height space with natural light." },
  //   ],
  //   thumbnail: "https://images.unsplash.com/photo-1614068305740-4229b4b0e118?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODU3NTB8MHwxfHNlYXJjaHw1fHNoaXAlMjBhcmNoaXRlY3R1cmV8ZW58MHx8fHwxNzExNDYzODY3fDA&ixlib=rb-4.0.3&q=80&w=1200",
  // },
  // // ----------------------------------------------------
  // // PROJECT 5: Suzhou Museum (EXISTING)
  // // ----------------------------------------------------
  // {
  //   title: "Suzhou Museum of Contemporary Art",
  //   location: "Suzhou, China",
  //   year: "2024",
  //   client: "Suzhou Harmony Development Group",
  //   typology: "Culture, Museum",
  //   size: "80,000 sqm",
  //   status: "In Construction",
  //   description: `Located on Jinji Lake, the 80,000-m2 Suzhou Museum of Contemporary Art offers a modern interpretation of the garden elements that have defined Suzhou's urbanism, architecture, and landscape for centuries. The museum - commissioned by Suzhou Harmony Development Group and designed in collaboration with ARTS Group and Front Inc. - will officially open its doors to the public in 2026, becoming a new venue for contemporary art, design, and public life in China. \n\n Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.`,
  //   images: [
  //     { src: "https://images.unsplash.com/photo-1547849484-9c5942468f76?q=80&w=2000&auto=format&fit=crop", alt: "Suzhou Museum exterior at sunset", caption: "The museum's unique rooflines reflect traditional Suzhou gardens." },
  //     { src: "https://images.unsplash.com/photo-1549429443-41c19b0682fa?q=80&w=2000&auto=format&fit=crop", alt: "Museum interior exhibition space", caption: "Flexible exhibition halls designed for modern art installations." },
  //   ],
  //   thumbnail: "https://images.unsplash.com/photo-1547849484-9c5942468f76?q=80&w=1200&auto=format&fit=crop",
  // },
  // // ----------------------------------------------------
  // // PROJECT 6: Bloomberg Student Center (EXISTING)
  // // ----------------------------------------------------
  // {
  //   title: "Bloomberg Student Center",
  //   location: "Baltimore, United States",
  //   year: "2025",
  //   client: "Johns Hopkins University",
  //   typology: "Education, Student Life",
  //   size: "150,000 sqft",
  //   status: "Completed",
  //   description: `The Bloomberg Student Center is a 150,000 sq-ft, cascading village of timber pavilions that stands as the new hub of student life at Johns Hopkins University. The light-filled structure features a roof integrated with nearly 3,000 solar panels designed to provide a shaded gathering place for the neighborhood campus, connecting it to the neighboring Charles Village. \n\n Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Sed posuere consectetur est at lobortis.`,
  //   images: [
  //     { src: "https://images.unsplash.com/photo-1524316335359-86640306130b?q=80&w=2000&auto=format&fit=crop", alt: "Bloomberg Student Center exterior", caption: "A series of interconnected pavilions with green roofs." },
  //     { src: "https://images.unsplash.com/photo-1524316336338-7f985b1c5d0a?q=80&w=2000&auto=format&fit=crop", alt: "Student lounge interior", caption: "Bright and open study and social spaces." },
  //   ],
  //   thumbnail: "https://images.unsplash.com/photo-1524316335359-86640306130b?q=80&w=1200&auto=format&fit=crop",
  // },
];

export default function ProjectList() {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(null);
  const [activeItemScrollProgress, setActiveItemScrollProgress] = useState(0);

  const projectListRef = useRef(null);
  const galleryItemRefs = useRef([]);
  galleryItemRefs.current = [];

  const addToRefs = (el) => {
    if (el && !galleryItemRefs.current.includes(el)) {
      galleryItemRefs.current.push(el);
    }
  };

  // --- FIX 1: Prevent body scroll when active ---
  // useEffect(() => {
  //   if (activeGalleryIndex !== null) {
  //       document.body.style.overflow = 'hidden';
  //   } else {
  //       document.body.style.overflow = 'auto'; // Or 'scroll'
  //   }
  //   return () => {
  //       document.body.style.overflow = 'auto';
  //   };
  // }, [activeGalleryIndex]);

  useEffect(() => {
    const handleScroll = () => {
      if (activeGalleryIndex === null) return;
      const activeItemElement = galleryItemRefs.current[activeGalleryIndex];
      if (activeItemElement) {
        const rect = activeItemElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        let progress = 0;
        if (rect.top < viewportHeight && rect.bottom > 0) {
          const centerItem = rect.top + rect.height / 2;
          const centerViewport = viewportHeight / 2;
          const distanceToCenter = Math.abs(centerItem - centerViewport);
          progress = Math.min(1, distanceToCenter / (viewportHeight * 0.5));
        }
        setActiveItemScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeGalleryIndex]);

  return (
    // Note: Padding px-80 is very high; adjust in your local file if alignment is off.
    <div
      ref={projectListRef}
      className="flex flex-col gap-4 py-16 px-80 lg:px-[28rem]"
    >
      {projectsData.map((project, index) => (
        <GalleryListItem
          key={index}
          data={project}
          index={index}
          isActive={activeGalleryIndex === index}
          setActive={() => setActiveGalleryIndex(index)}
          resetActive={() => setActiveGalleryIndex(null)}
          scrollProgress={
            activeGalleryIndex === index ? activeItemScrollProgress : 0
          }
          ref={addToRefs}
        />
      ))}
    </div>
  );
}
