import React from "react";
import img1 from "../assets/45.png";

export default function Teams() {
  const people = [
    { name: "Bjarke Ingels", role: "Founder", location: "CPH", image: img1 },
    { name: "Sheela Maini Søgaard", role: "CEO & Partner", location: "CPH", image: img1 },
    { name: "Agustin Perez-Torres", role: "Partner", location: "BCN", image: img1 },
    { name: "Alexandru Malaescu", role: "Partner", location: "LON", image: img1 },
    { name: "Andreas Klok Pedersen", role: "Partner", location: "LON", image: img1 },
  ];

  const categories = ["PARTNERS", "ASSOCIATES", "DIRECTORS"];
  const [activePerson, setActivePerson] = React.useState(0);

  return (
    <div className="flex min-h-screen px-4 md:px-8 lg:px-24 relative">
      {/* LEFT CATEGORY SIDEBAR */}
      <div className="hidden lg:flex w-1/6 flex-col gap-4 text-gray-600 fixed left-8 top-1/2 -translate-y-1/2 flex flex-col justify-center">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className={`cursor-pointer text-sm ${idx === 0 ? "font-bold text-black" : ""}`}
          >
            {cat}
          </div>
        ))}
      </div>

      {/* CENTER PEOPLE LIST */}
      <div className="flex-1 lg:ml-48 pt-16 max-w-xl">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal mb-12">PEOPLE</h1>

        <div className="h-[65vh] overflow-y-auto pr-4">
          {people.map((p, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setActivePerson(idx)}
              className={`py-3 cursor-pointer border-b border-gray-200 transition-all duration-200 ${
                activePerson === idx ? "text-black font-semibold" : "text-gray-600"
              }`}
            >
              <div className="text-lg">{p.name}</div>
              <div className="text-sm text-gray-500">{p.role}, {p.location}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT FIXED IMAGE PREVIEW */}
      <div className="hidden lg:block fixed right-12 top-1/2 -translate-y-1/2 w-96">
        <img
          src={people[activePerson].image}
          alt={people[activePerson].name}
          className="w-full h-auto object-cover rounded-lg shadow-lg transition-all duration-300"
        />

        <div className="mt-4 text-center">
          <h2 className="text-lg font-semibold">{people[activePerson].name}</h2>
          <p className="text-gray-600 text-sm">
            {people[activePerson].role}, {people[activePerson].location}
          </p>
        </div>
      </div>
    </div>
  );
}
