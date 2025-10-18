import React from "react";
import img1 from "../assets/45.png";

export default function News() {
  const categories = ["NEWS", "EVENTS", "AWARDS", "LECTURES"];
  const newsItems = [
    {
      date: "16.10.2025",
      image: img1,
      title:
        "THE BLOOMBERG STUDENT CENTER, A CASCADING VILLAGE OF TIMBER PAVILIONS",
      description:
        "A new era of student life has begun at Johns Hopkins University with the opening of the Bloomberg Student Center, a mass timber village designed in collaboration with Shepley Bulfinch and Rockwell Group. As the first student center for Johns Hopkins University, the 150,000-sq-ft building provides a central gathering space for the university’s Homewood campus...",
    },
    {
      date: "16.10.2025",
      image: img1,
      title:
        "THE BLOOMBERG STUDENT CENTER, A CASCADING VILLAGE OF TIMBER PAVILIONS",
      description:
        "A new era of student life has begun at Johns Hopkins University with the opening of the Bloomberg Student Center, a mass timber village designed in collaboration with Shepley Bulfinch and Rockwell Group. As the first student center for Johns Hopkins University, the 150,000-sq-ft building provides a central gathering space for the university’s Homewood campus...",
    },
    {
      date: "16.10.2025",
      image: img1,
      title:
        "THE BLOOMBERG STUDENT CENTER, A CASCADING VILLAGE OF TIMBER PAVILIONS",
      description:
        "A new era of student life has begun at Johns Hopkins University with the opening of the Bloomberg Student Center, a mass timber village designed in collaboration with Shepley Bulfinch and Rockwell Group. As the first student center for Johns Hopkins University, the 150,000-sq-ft building provides a central gathering space for the university’s Homewood campus...",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen px-4 md:px-8 lg:px-24">
      {/* Sidebar - Desktop (lg only) */}
      <div className="hidden lg:flex w-1/6 flex-col gap-4 text-gray-600 fixed left-8 top-1/2 -translate-y-1/2">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className={`cursor-pointer ${
              idx === 0 ? "font-bold" : ""
            } hover:text-black`}
          >
            {cat}
          </div>
        ))}
      </div>

      {/* Mobile + Tablet Categories (Top) */}
      

      {/* Main Content */}
      <div className="flex-1 lg:ml-32">
        <h1 className="mt-12 text-5xl md:text-5xl lg:text-7xl font-normal mb-8 lg:mb-16 ">
          NEWS
        </h1>
        
        {/* Mobile + Tablet Categories (Top) */}
        <div className="flex lg:hidden overflow-x-auto gap-4 text-gray-600 mb-6 ">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className={`cursor-pointer whitespace-nowrap ${
              idx === 0 ? "font-bold" : ""
            }`}
          >
            {cat}
          </div>
        ))}
      </div>

        <div className="flex flex-col lg:ml-16 gap-8 lg:gap-16">
          {newsItems.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col lg:flex-row items-start gap-4 lg:gap-8"
            >
              {/* Date */}
              <div className="text-gray-500 text-xs md:text-sm mt-2">
                {item.date}
              </div>

              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full lg:w-3/5 object-cover rounded-lg"
              />

              {/* Text */}
              <div className="flex-1">
                <h2 className="text-lg md:text-xl lg:text-lg xl:text-xl 2xl:text-2xl font-normal mb-2">
                  {item.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-[6]">
  {item.description}
</p>

                <button className="text-sm mt-2 font-medium text-gray-800 hover:underline">
                  READ MORE +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
