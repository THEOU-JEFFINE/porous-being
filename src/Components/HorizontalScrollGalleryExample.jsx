// src/Components/HorizontalScrollGalleryExample.jsx
import React from "react";
import { gsap } from "gsap";
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
    if (
      (index + 1) % 5 === 0 &&
      index < images.length - 1 &&
      projectData.textAreas &&
      projectData.textAreas.length > 0
    ) {
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
  const icons = {
    email: (
      <span
        className="material-symbols-rounded"
        style={{ fontSize: defaultSize }}
      >
        mail
      </span>
    ),
    Facebook: (
      <svg
        width={defaultSize}
        height={defaultSize}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    Twitter: (
      <svg
        width={defaultSize}
        height={defaultSize}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    Linkedin: (
      <svg
        width={defaultSize}
        height={defaultSize}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
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
        {icons[icon.name] || icons.email}
      </a>
    ),
  }));
}

/**
 * Individual gallery wrapper component
 */
function ProjectGalleryWrapper({
  project,
  isActive,
  isScrolled,
  onSetActive,
  onSetScrolled,
}) {
  const galleryRef = React.useRef(null);
  const [isMobile, setIsMobile] = React.useState(false);

  // Detect screen size and auto-activate on mobile/tablet
  React.useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-activate on mobile
  React.useEffect(() => {
    if (isMobile && !isActive) {
      onSetActive();
    }
  }, [isMobile, isActive, onSetActive]);

  const projectImages = React.useMemo(() => {
    return loadProjectImages(project.key);
  }, [project.key]);

  const projectItems = React.useMemo(() => {
    try {
      return generateProjectItems(projectImages, project);
    } catch (error) {
      console.error(
        `Error generating items for project ${project.key}:`,
        error
      );
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

  const intro = React.useMemo(() => {
    if (!isActive) return null;
    return {
      type: "intro",
      logo: project.logo || undefined,
      title: project.title,
      location: project.location,
      year: project.year,
      typology: project.typology,
      size: project.size,
      status: project.status,
      shareIcons: generateShareIcons(project.shareIcons, 28),
    };
  }, [isActive, project]);

  const firstImage = projectImages[0] || null;

  // Position intro card: after first image on mobile/tablet, included in items on desktop
  const finalItems = React.useMemo(() => {
    if (!projectItems || projectItems.length === 0) return projectItems;
    // On mobile: always insert intro after first image when active
    if (isMobile && intro && projectItems.length > 0 && isActive) {
      return [projectItems[0], intro, ...projectItems.slice(1)];
    }
    // On desktop: intro will be passed separately, so just return items
    return projectItems;
  }, [projectItems, isActive, isMobile, intro]);

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
  // On mobile/tablet, skip this and go straight to active state
  if (!isActive && !isMobile) {
    return (
      <div
        className="flex flex-col md:flex-row items-center md:items-start justify-center py-10 md:py-14 cursor-pointer group w-full"
        onClick={onSetActive}
      >
        {/* Left side - Project info (right-aligned text on desktop, bottom on mobile) */}
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
          <h3 className="text-sm  font-medium text-gray-900 mb-1 leading-tight">
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
              className="w-full h-[220px] md:h-[260px] lg:h-[300px] object-cover transition-transform duration-500 "
            />
          ) : (
            <div className="w-full h-[220px] md:h-[260px] lg:h-[300px] bg-gray-200 flex items-center justify-center">
              <p className="text-gray-400">No image available</p>
            </div>
          )}
        </div>

        {/* Right spacer for centering on desktop */}
        <div className="hidden md:block w-[200px] lg:w-[220px] shrink-0"></div>

        {/* Mobile: Project info at bottom */}
        <div className="md:hidden mt-4 flex flex-col items-center text-center w-full">
          {/* Logo/Icon */}
          {project.logo ? (
            <div className="w-10 h-10 mb-2">
              <img
                src={project.logo}
                alt={project.title}
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-10 h-10 mb-2 bg-gray-900 flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {project.title.charAt(0)}
              </span>
            </div>
          )}
          <h3 className="text-sm font-medium text-gray-900 mb-1">
            {project.title}
          </h3>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider">
            {project.location}
          </p>
        </div>
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
          items={isMobile ? finalItems : projectItems}
          height={isScrolled ? "h-screen" : "h-[500px]"}
          intro={isMobile ? null : intro}
          isActive={isActive}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
}

/**
 * Main component rendering all 12 project galleries
 */
export default function HorizontalScrollGalleryExample() {
  const [activeProjectIds, setActiveProjectIds] = React.useState(new Set());
  const [scrolledProjectId, setScrolledProjectId] = React.useState(null);
  const containerRef = React.useRef(null);
  const projectRefs = React.useRef({});

  const toggleActive = React.useCallback((projectKey) => {
    setActiveProjectIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(projectKey)) {
        newSet.delete(projectKey);
      } else {
        newSet.add(projectKey);
      }
      return newSet;
    });

    // Scroll to center the clicked project
    setTimeout(() => {
      const ref = projectRefs.current[projectKey];
      if (ref) {
        ref.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  }, []);

  React.useEffect(() => {
    console.log("componentData loaded:", componentData);
    console.log("Number of projects:", componentData?.length);
    if (componentData && componentData.length > 0) {
      console.log("First project:", componentData[0]);
    }
  }, []);

  // GSAP scroll animation - scale down inactive projects
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const windowHeight = window.innerHeight;
      const centerY = scrollTop + windowHeight / 2;

      Object.entries(projectRefs.current).forEach(([, ref]) => {
        if (!ref) return;

        const rect = ref.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2 + scrollTop;
        const distance = Math.abs(centerY - elementCenter);
        const maxDistance = windowHeight;

        // Calculate scale based on distance from center
        const scale = 1;
        const opacity = 1;

        gsap.to(ref, {
          scale,
          opacity,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  if (!componentData || componentData.length === 0) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <p className="text-2xl text-red-500">Error: No projects loaded</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen bg-white overflow-y-auto"
    >
      <div className="flex flex-col items-center gap-8 pt-8 pb-16 px-4">
        {componentData.map((project) => (
          <div
            key={project.key}
            ref={(el) => (projectRefs.current[project.key] = el)}
          >
            <ProjectGalleryWrapper
              project={project}
              isActive={activeProjectIds.has(project.key)}
              isScrolled={scrolledProjectId === project.key}
              onSetActive={() => toggleActive(project.key)}
              onSetScrolled={() => setScrolledProjectId(project.key)}
            />
          </div>
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
