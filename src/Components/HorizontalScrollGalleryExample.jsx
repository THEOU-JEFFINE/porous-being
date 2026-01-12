// src/Components/HorizontalScrollGalleryExample.jsx
import React from "react";
import { gsap } from "gsap";
import HorizontalScrollGallery from "./HorizontalScrollGallery";
import componentData from "../assets/Data/componentData.js";

/**
 * Images are now loaded directly from componentData.js
 * No need for separate loading function
 */

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
    const images = project.images || [];
    console.log(`Project ${project.key}:`, {
      hasImages: !!project.images,
      imageCount: images.length,
      firstImage: images[0],
    });
    return images;
  }, [project.images, project.key]);

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

  // Enable horizontal scroll with mouse wheel when hovering over active component
  React.useEffect(() => {
    const container = galleryRef.current;
    if (!container || !isActive) return;

    const handleWheel = (e) => {
      // Check if there's horizontal scroll space
      const hasHorizontalScroll = container.scrollWidth > container.clientWidth;

      if (hasHorizontalScroll) {
        // Prevent default vertical scroll
        e.preventDefault();
        e.stopPropagation();
        // Convert vertical scroll to horizontal
        container.scrollLeft += e.deltaY;
      }
    };

    // Attach wheel listener directly to container
    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [isActive]);

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
        className="flex flex-col md:flex-row items-center md:items-start justify-center py-4 md:py-6 cursor-pointer group w-full"
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
        <div className="w-full md:w-[350px] lg:w-[400px] xl:w-[450px] overflow-hidden">
          {firstImage ? (
            <img
              src={firstImage}
              alt={project.title}
              className="w-full h-auto object-cover transition-transform duration-500"
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
        className={`transition-all duration-500 ease-in-out rounded overflow-x-auto ${
          isScrolled
            ? "fixed inset-0 w-screen h-screen z-50 rounded-none"
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
  const [activeProjectId, setActiveProjectId] = React.useState(null);
  const [scrolledProjectId, setScrolledProjectId] = React.useState(null);
  const [selectedTypology, setSelectedTypology] = React.useState("ALL");
  const containerRef = React.useRef(null);
  const projectRefs = React.useRef({});

  // Map raw typology strings into clustered categories
  const mapToCategory = React.useCallback((typ) => {
    // Treat unknown/other as Experience Centre (merged)
    if (!typ) return "Experience Centre";
    const t = String(typ).toLowerCase();
    if (t.includes("resid")) return "Residential";
    if (t.includes("retail")) return "Retail";
    if (t.includes("office")) return "Office";
    if (
      t.includes("experience") ||
      t.includes("centre") ||
      t.includes("center") ||
      t.includes("installation")
    )
      return "Experience Centre";
    if (t.includes("signag") || t.includes("signage")) return "Signage";
    return "Experience Centre";
  }, []);

  // Get unique clustered typologies from componentData
  const typologies = React.useMemo(() => {
    if (!componentData) return [];
    const set = new Set(componentData.map((p) => mapToCategory(p.typology)));
    return ["ALL", ...Array.from(set).sort()];
  }, [mapToCategory]);

  // Filter projects based on selected clustered typology
  const filteredProjects = React.useMemo(() => {
    if (!componentData) return [];
    if (selectedTypology === "ALL") return componentData;
    return componentData.filter(
      (p) => mapToCategory(p.typology) === selectedTypology
    );
  }, [selectedTypology, mapToCategory]);

  const toggleActive = React.useCallback((projectKey) => {
    setActiveProjectId((prev) => {
      // If clicking the same project, deactivate it
      if (prev === projectKey) {
        return null;
      }
      // Otherwise, activate the clicked project (deactivating any other)
      return projectKey;
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

  // GSAP scroll animation - zoom out while scrolling, normal when stopped
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollTimeout;
    let isScrolling = false;

    const handleScroll = () => {
      // Mark as scrolling and apply zoom-out effect
      if (!isScrolling) {
        isScrolling = true;

        // Zoom out all projects while scrolling
        Object.entries(projectRefs.current).forEach(([, ref]) => {
          if (!ref) return;

          gsap.to(ref, {
            scale: 0.75,
            opacity: 0.5,
            filter: "blur(3px)",
            duration: 0.2,
            ease: "power2.out",
            transformOrigin: "center center",
          });
        });
      }

      // Clear existing timeout
      clearTimeout(scrollTimeout);

      // Reset all items to normal after scrolling stops
      scrollTimeout = setTimeout(() => {
        isScrolling = false;

        Object.entries(projectRefs.current).forEach(([, ref]) => {
          if (!ref) return;
          gsap.to(ref, {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.4,
            ease: "power2.out",
            transformOrigin: "center center",
          });
        });
      }, 150);
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [filteredProjects]);

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
      {/* Filter Navigation Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-6 py-4 overflow-x-auto scrollbar-hide">
            {typologies.map((typology) => (
              <button
                key={typology}
                onClick={() => setSelectedTypology(typology)}
                className={`px-2 py-2 text-xs font-medium tracking-wider whitespace-nowrap transition-all duration-300 ${
                  selectedTypology === typology
                    ? "border-b-2 border-black text-black"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {typology}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="flex flex-col items-center pt-8 pb-16 px-4">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div
              key={project.key}
              ref={(el) => (projectRefs.current[project.key] = el)}
            >
              <ProjectGalleryWrapper
                project={project}
                isActive={activeProjectId === project.key}
                isScrolled={scrolledProjectId === project.key}
                onSetActive={() => toggleActive(project.key)}
                onSetScrolled={() => setScrolledProjectId(project.key)}
              />
            </div>
          ))
        ) : (
          <div className="w-full min-h-[400px] flex items-center justify-center">
            <p className="text-xl text-gray-400">
              No projects found for this category
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
