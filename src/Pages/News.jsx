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
    <div className="flex min-h-screen mx-4 md:mx-8 lg:mx-24">
    {/* Sidebar */}
    <div className="w-1/6 flex flex-col gap-4 text-gray-600 fixed left-8 top-1/2 -translate-y-1/2">
        {categories.map((cat, idx) => (
        <div key={idx} className={`cursor-pointer ${idx === 0 ? "font-bold" : ""}`}>
            {cat}
        </div>
        ))}
    </div>

    {/* Main Content */}
    <div className="flex-1 ml-32">
        <h1 className="text-6xl font-normal mb-16">NEWS</h1>

        <div className="flex flex-col gap-16 ml-16">
        {newsItems.map((item, idx) => (
            <div key={idx} className="flex flex-col md:flex-row items-start gap-8">
            {/* Date */}
            <div className="text-gray-500 text-sm mt-2">{item.date}</div>

            {/* Image */}
            <img
                src={item.image}
                alt={item.title}
                className="w-full md:w-2/5 object-cover rounded-lg"
            />

            {/* Text */}
            <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-semibold mb-2">{item.title}</h2>
                <p className="text-gray-600 text-sm">{item.description}</p>
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
