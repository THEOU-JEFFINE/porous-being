// src/Components/HorizontalScrollGalleryExample.jsx
import React from "react";
import HorizontalScrollGallery from "./HorizontalScrollGallery";
import componentData from "../assets/Data/componentData.js";

/**
 * Load images for a specific project based on folder name
 * Uses static glob patterns (required by Vite)
 */
function loadProjectImages(projectKey) {
  const globPatterns = {
    "experience-centre": import.meta.glob(
      "../assets/Compressed Images/EXPERIENCE CENTRE- Thazhambur lake - interpretation centre/*.{jpg,jpeg,png,webp,svg}",
      { eager: true, as: "url" }
    ),
    "installation-death": import.meta.glob(
      "../assets/Compressed Images/INSTALLATION - Death of Architecture/*.{jpg,jpeg,png,webp,svg}",
      { eager: true, as: "url" }
    ),
    "installation-kings": import.meta.glob(
      "../assets/Compressed Images/INSTALLATION - Kings Birthday/*.{jpg,jpeg,png,webp,svg}",
      { eager: true, as: "url" }
    ),
    "office-madarth": import.meta.glob(
      "../assets/Compressed Images/OFFICE - Madarth/*.{jpg,jpeg,png,webp,svg}",
      { eager: true, as: "url" }
    ),
    "office-apollo": import.meta.glob(
      "../assets/Compressed Images/OFFICE- Apollo/*.{jpg,jpeg,png,webp,svg}",
      { eager: true, as: "url" }
    ),
    "res-greenways": import.meta.glob(
      "../assets/Compressed Images/RESIDENTAL-Greenways/*.{jpg,jpeg,png,webp,svg}",
      { eager: true, as: "url" }
    ),
    "res-45-degree": import.meta.glob(
      "../assets/Compressed Images/RESIDENTIAL - 45 degree/*.{jpg,jpeg,png,webp,svg}",
      { eager: true, as: "url" }
    ),
    "res-brothers": import.meta.glob(
      "../assets/Compressed Images/RESIDENTIAL - House for brothers/*.{jpg,jpeg,png,webp,svg}",
      { eager: true, as: "url" }
    ),
    "res-rukmini": import.meta.glob(
      "../assets/Compressed Images/RESIDENTIAL - Rukmini Residence/*.{jpg,jpeg,png,webp,svg}",
      { eager: true, as: "url" }
    ),
    "retail-annapoorna": import.meta.glob(
      "../assets/Compressed Images/RETAIL -ANNAPOORNA MASALA/*.{jpg,jpeg,png,webp,svg}",
      { eager: true, as: "url" }
    ),
    "unbuilt-kanyakumari": import.meta.glob(
      "../assets/Compressed Images/UNBUILT - Kanyakumari Bridge/*.{jpg,jpeg,png,webp,svg}",
      { eager: true, as: "url" }
    ),
    "unbuilt-madurai": import.meta.glob(
      "../assets/Compressed Images/UNBUILT - Madurai Mall/*.{jpg,jpeg,png,webp,svg}",
      { eager: true, as: "url" }
    ),
  };

  const modules = globPatterns[projectKey];
  if (!modules) {
    console.warn(`No images found for project: ${projectKey}`);
    return [];
  }

  try {
    const images = Object.keys(modules)
      .sort()
      .map((k) => modules[k]);
    
    console.log(`Loaded ${images.length} images for ${projectKey}`);
    return images;
  } catch (error) {
    console.error(`Error loading images for ${projectKey}:`, error);
    return [];
  }
}

/**
 * Generate project items with images and text sections interspersed
 */
function generateProjectItems(images, projectData) {
  const items = [];

  if (!Array.isArray(images)) return items;

  images.forEach((imageUrl, index) => {
    items.push({
      type: "image",
      src: imageUrl,
      alt: `${projectData.title}-${index}`,
    });

    // Add text sections after every 5 images
    if ((index + 1) % 5 === 0 && index < images.length - 1 && projectData.textAreas && projectData.textAreas.length > 0) {
      const textArea = projectData.textAreas[0];
      items.push({
        type: "text",
        title: projectData.title,
        content: textArea.texts.join("\n\n"),
      });
    }
  });

  return items;
}

/**
 * Convert shareIcons from componentData format to JSX format
 */
function generateShareIcons(shareIconsData, defaultSize = 20) {
  const iconMap = {
    email: "email",
    facebook: "facebook",
    linkedin: "linkedin",
    twitter: "twitter",
  };

  const icons = {
    email: (
      <span className="material-symbols-rounded" style={{ fontSize: defaultSize }}>
        mail
      </span>
    ),
    facebook: (
      <span className="material-symbols-rounded" style={{ fontSize: defaultSize }}>
        share
      </span>
    ),
    twitter: (
      <span className="material-symbols-rounded" style={{ fontSize: defaultSize }}>
        ios_share
      </span>
    ),
    linkedin: (
      <span className="material-symbols-rounded" style={{ fontSize: defaultSize }}>
        share_reviews
      </span>
    )
  };


  if (!Array.isArray(shareIconsData)) return [];

  return shareIconsData.map((icon) => ({
    href: icon.href,
    icon: (
      <a
        href={icon.href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center p-2 rounded hover:bg-gray-100 min-w-[40px] min-h-[40px] text-white"
      >
        {icons[icon.name]}
      </a>
    ),

    // const size = icon.size || defaultSize;
    // const name = iconMap[icon.name] || icon.name;

    // return {
    //   href: icon.href,
    //   // wrap in anchor to preserve clickable area and allow styling
    //   icon: (
    //     <a
    //       href={icon.href}
    //       target="_blank"
    //       rel="noreferrer"
    //       // className="inline-flex items-center justify-center p-1 rounded hover:bg-gray-100"
    //       className="inline-flex items-center justify-center p-2 rounded hover:bg-gray-100 min-w-[36px] min-h-[36px]"
    //       aria-label={icon.name}
    //     >
    //       {/* <span className="material-icons" style={{ fontSize: size, lineHeight: 1 }}>
    //         {name}
    //       </span> */}
    //       <span
    //         className="material-icons"
    //         style={{
    //           fontSize: size + 6,
    //           lineHeight: "1.2",
    //           padding: "4px",
    //         }}
    //       >
    //         {name}
    //       </span>

    //     </a>
    //   ),
    // };
  }));
}

/**
 * Individual gallery wrapper component
 */
function ProjectGalleryWrapper({ project, isActive, isScrolled, onSetActive, onSetScrolled }) {
  const galleryRef = React.useRef(null);

  const projectImages = React.useMemo(() => {
    return loadProjectImages(project.key);
  }, [project.key]);

  const projectItems = React.useMemo(() => {
    try {
      return generateProjectItems(projectImages, project);
    } catch (error) {
      console.error(`Error generating items for project ${project.key}:`, error);
      return [];
    }
  }, [projectImages, project]);

  // Preload critical images
  React.useEffect(() => {
    if (!projectItems || projectItems.length === 0) return;
    const first = projectItems[0];
    const links = [];

    if (first && first.src) {
      const l = document.createElement("link");
      l.rel = "preload";
      l.as = "image";
      l.href = first.src;
      document.head.appendChild(l);
      links.push(l);
    }

    if (project.logo) {
      const l2 = document.createElement("link");
      l2.rel = "preload";
      l2.as = "image";
      l2.href = project.logo;
      document.head.appendChild(l2);
      links.push(l2);
    }

    return () => links.forEach((n) => n.parentNode?.removeChild(n));
  }, [projectItems, project.logo]);

  // Listen for scroll events
  React.useEffect(() => {
    const container = galleryRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (!isScrolled && container.scrollLeft > 10) {
        onSetScrolled(true);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isScrolled, onSetScrolled]);

  const intro = isActive
    ? {
        type: "intro",
        logo: project.logo || undefined,
        title: project.title,
        location: project.location,
        year: project.year,
        typology: project.typology,
        size: project.size,
        status: project.status,
        shareIcons: generateShareIcons(project.shareIcons, 28),
      }
    : null;

  const firstImage = projectImages[0] || null;

  if (!projectItems || projectItems.length === 0) {
    return (
      <div className="w-[400px] h-[250px] bg-gray-200 flex items-center justify-center cursor-pointer rounded">
        <div className="text-center">
          <p className="text-gray-600 font-medium">{project.title}</p>
          <p className="text-gray-400 text-sm">No images available</p>
        </div>
      </div>
    );
  }

  // When not active: show card layout (info left, centered image right)
  if (!isActive) {
    return (
      <div
        className="flex items-start justify-center py-10 md:py-14 cursor-pointer group w-full"
        onClick={onSetActive}
      >
        {/* Left side - Project info (right-aligned text) */}
        <div className="hidden md:flex flex-col items-end text-right w-[200px] lg:w-[220px] shrink-0 pr-8 lg:pr-12">
          {/* Logo/Icon */}
          {project.logo ? (
            <div className="w-10 h-10 lg:w-12 lg:h-12 mb-2">
              <img
                src={project.logo}
                alt={project.title}
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-10 h-10 lg:w-12 lg:h-12 mb-2 bg-gray-900 flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {project.title.charAt(0)}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="text-sm lg:text-base font-medium text-gray-900 mb-1 leading-tight">
            {project.title}
          </h3>

          {/* Location */}
          <p className="text-[10px] lg:text-xs text-gray-400 uppercase tracking-wider">
            {project.location}
          </p>
        </div>

        {/* Center - Image */}
        <div className="w-full md:w-[450px] lg:w-[500px] xl:w-[550px] overflow-hidden">
          {firstImage ? (
            <img
              src={firstImage}
              alt={project.title}
              className="w-full h-[220px] md:h-[260px] lg:h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-[220px] md:h-[260px] lg:h-[300px] bg-gray-200 flex items-center justify-center">
              <p className="text-gray-400">No image available</p>
            </div>
          )}

          {/* Mobile: Title below image */}
          <div className="md:hidden mt-3 text-center">
            <h3 className="text-sm font-medium text-gray-900 mb-1">{project.title}</h3>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">{project.location}</p>
          </div>
        </div>

        {/* Right spacer for centering */}
        <div className="hidden md:block w-[200px] lg:w-[220px] shrink-0"></div>
      </div>
    );
  }

  // When active: show expanded gallery
  return (
    <div className="w-full flex flex-col items-center gap-4 py-8">
      <div
        ref={galleryRef}
        className={`transition-all duration-500 ease-in-out rounded ${
          isScrolled
            ? "fixed inset-0 w-screen h-screen z-50 overflow-x-auto rounded-none"
            : "w-screen h-[500px] relative z-40"
        }`}
      >
        <HorizontalScrollGallery
          items={projectItems}
          height={isScrolled ? "h-screen" : "h-[500px]"}
          intro={intro}
        />

        {/* Close button when expanded */}
        {isScrolled && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSetActive(); // This will toggle off
            }}
            className="fixed top-6 right-6 z-[60] w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-700 group-hover:text-black transition-colors"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Main component rendering all 12 project galleries
 */
export default function HorizontalScrollGalleryExample() {
  const [activeProjectId, setActiveProjectId] = React.useState(null);
  const [scrolledProjectId, setScrolledProjectId] = React.useState(null);

  React.useEffect(() => {
    console.log("componentData loaded:", componentData);
    console.log("Number of projects:", componentData?.length);
    if (componentData && componentData.length > 0) {
      console.log("First project:", componentData[0]);
    }
  }, []);

  if (!componentData || componentData.length === 0) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <p className="text-2xl text-red-500">Error: No projects loaded</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="flex flex-col items-center gap-8 pt-8 pb-16 px-4">
        {componentData.map((project) => (
          <ProjectGalleryWrapper
            key={project.key}
            project={project}
            isActive={activeProjectId === project.key}
            isScrolled={scrolledProjectId === project.key}
            onSetActive={() => {
              setActiveProjectId(project.key);
              setScrolledProjectId(null);
            }}
            onSetScrolled={() => setScrolledProjectId(project.key)}
          />
        ))}
      </div>
    </div>
  );
}








// ___________________________PREVIOUS VERSION_________________________




// // src/Components/HorizontalScrollGalleryExample.jsx
// import React from "react";
// import HorizontalScrollGallery from "./HorizontalScrollGallery";
// import logo45 from "../assets/45.png";

// /**
//  * Example usage of HorizontalScrollGallery component
//  * This shows how to use the component with images from Compressed Images folder
//  */
// export default function HorizontalScrollGalleryExample() {
//   // Example 1: All images from RESIDENTIAL - 45 degree with text sections
//   const projectItems = React.useMemo(() => {
//     // Load all images from RESIDENTIAL - 45 degree folder
//     const imageModules = import.meta.glob(
//       "../assets/Compressed Images/RESIDENTIAL - 45 degree/*.jpg",
//       { eager: true, as: "url" }
//     );

//     const items = [];
//     const imageEntries = Object.entries(imageModules).sort(([pathA], [pathB]) =>
//       pathA.localeCompare(pathB)
//     );

//     // Add images with text sections interspersed
//     imageEntries.forEach(([path, url], index) => {
//       items.push({
//         type: "image",
//         src: url,
//         alt: path.split("/").pop().replace(".jpg", ""),
//       });

//       // Add text sections after every 5 images
//       if ((index + 1) % 5 === 0 && index < imageEntries.length - 1) {
//         items.push({
//           type: "text",
//           title: "RESIDENTIAL - 45 Degree",
//           content:
//             "This innovative architectural design combines sustainable materials with modern aesthetics. The building features natural ventilation systems and maximizes natural light.\n\nOur approach focuses on creating spaces that are both functional and inspiring.",
//         });
//       }
//     });

//     return items;
//   }, []);
//   const [active, setActive] = React.useState(false);
//   const [scrolled, setScrolled] = React.useState(false);

//   // Preload critical images (first image + logo) to improve perceived load time
//   React.useEffect(() => {
//     if (!projectItems || projectItems.length === 0) return;
//     const first = projectItems[0];
//     const links = [];
//     // preload first image
//     if (first && first.src) {
//       const l = document.createElement("link");
//       l.rel = "preload";
//       l.as = "image";
//       l.href = first.src;
//       document.head.appendChild(l);
//       links.push(l);
//     }
//     // preload logo
//     if (logo45) {
//       const l2 = document.createElement("link");
//       l2.rel = "preload";
//       l2.as = "image";
//       l2.href = logo45;
//       document.head.appendChild(l2);
//       links.push(l2);
//     }
//     return () => links.forEach((n) => n.parentNode?.removeChild(n));
//   }, [projectItems]);

//   // Handler to detect horizontal scroll
//   const handleScroll = (e) => {
//     if (!scrolled && e.target.scrollLeft > 10) {
//       setScrolled(true);
//     }
//   };

//   return (
//     <div className="flex items-start justify-center w-full h-full pt-16">
//       <div
//         className={`transition-all duration-500 ease-in-out ${
//           scrolled
//             ? "fixed inset-0 w-screen h-screen z-50"
//             : active
//             ? "w-screen h-[500px] relative z-50"
//             : "w-[400px] h-[250px] relative z-50 cursor-pointer"
//         }`}
//         onClick={() => !active && setActive(true)}
//       >
//         <HorizontalScrollGallery
//           items={projectItems}
//           height={scrolled ? "h-screen" : active ? "h-[500px]" : "h-[250px]"}
//           className="w-full h-full"
//           onScroll={handleScroll}
//           intro={
//             active
//               ? {
//                   type: "intro",
//                   logo: logo45,
//                   title: "Hamburg State Opera",
//                   location: "HAMBURG, GERMANY",
//                   year: "2025",
//                   typology: "CULTURE",
//                   size: "45,000 / 525,000",
//                   status: "IN DESIGN",
//                   shareIcons: [
//                     {
//                       href: "",
//                       icon: (
//                         <span
//                           className="material-icons"
//                           style={{ fontSize: 20 }}
//                         >
//                           email
//                         </span>
//                       ),
//                     },
//                     {
//                       href: "https://facebook.com",
//                       icon: (
//                         <span
//                           className="material-icons"
//                           style={{ fontSize: 20 }}
//                         >
//                           facebook
//                         </span>
//                       ),
//                     },
//                     {
//                       href: "https://linkedin.com",
//                       icon: (
//                         <span
//                           className="material-icons"
//                           style={{ fontSize: 20 }}
//                         >
//                           linkedin
//                         </span>
//                       ),
//                     },
//                     {
//                       href: "https://x.com",
//                       icon: (
//                         <span
//                           className="material-icons"
//                           style={{ fontSize: 20 }}
//                         >
//                           close
//                         </span>
//                       ),
//                     },
//                   ],
//                 }
//               : null
//           }
//         />
//       </div>
//     </div>
//   );
// }
