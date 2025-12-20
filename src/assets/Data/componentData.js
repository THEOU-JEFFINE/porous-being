// componentData.js
// Exports an array of project data. Each project includes metadata and an images array
// built with Vite's import.meta.glob so local assets can be imported automatically.
import logo45 from "../45.png";

// Helper function to process glob imports
function processGlobImport(modules) {
  return Object.keys(modules)
    .sort()
    .map((k) => modules[k]);
}

// Load images per project folder - ALL 20 PROJECTS
// Note: import.meta.glob requires literal strings, not variables

// Experience Centres
const imgs_experience_pudhuthangal = processGlobImport(
  import.meta.glob(
    "../Compressed-Images/EXPERIENCE CENTRE -Pudhuthangal Lake/*",
    {
      eager: true,
      query: "?url",
      import: "default",
    }
  )
);
const imgs_experience_thazhambur = processGlobImport(
  import.meta.glob(
    "../Compressed-Images/EXPERIENCE CENTRE- Thazhambur lake - interpretation centre/*",
    {
      eager: true,
      query: "?url",
      import: "default",
    }
  )
);

// Housing
const imgs_housing_hostel = processGlobImport(
  import.meta.glob("../Compressed-Images/HOUSING - HOSTEL AT MADURAI/*", {
    eager: true,
    query: "?url",
    import: "default",
  })
);

// Installations
const imgs_installation_death = processGlobImport(
  import.meta.glob(
    "../Compressed-Images/INSTALLATION - Death of Architecture/*",
    {
      eager: true,
      query: "?url",
      import: "default",
    }
  )
);
const imgs_installation_kings = processGlobImport(
  import.meta.glob("../Compressed-Images/INSTALLATION - Kings Birthday/*", {
    eager: true,
    query: "?url",
    import: "default",
  })
);

// Offices
const imgs_office_elcot = processGlobImport(
  import.meta.glob("../Compressed-Images/OFFICE - ELCOT CORPORATE OFFICE/*", {
    eager: true,
    query: "?url",
    import: "default",
  })
);
const imgs_office_madarth = processGlobImport(
  import.meta.glob("../Compressed-Images/OFFICE - Madarth/RENDER/*", {
    eager: true,
    query: "?url",
    import: "default",
  })
);

const imgs_office_elcot_coimbatore = processGlobImport(
  import.meta.glob(
    "../Compressed-Images/OFFICE - PROPOSED ELCOT COIMBATORE/*",
    {
      eager: true,
      query: "?url",
      import: "default",
    }
  )
);
const imgs_office_apollo = processGlobImport(
  import.meta.glob(
    "../Compressed-Images/OFFICE- Apollo/Mezzanine/22-11-2022/*",
    {
      eager: true,
      query: "?url",
      import: "default",
    }
  )
);

// Residences
const imgs_residence_jana = processGlobImport(
  import.meta.glob("../Compressed-Images/RESIDENCE - JANA ARTIST/*", {
    eager: true,
    query: "?url",
    import: "default",
  })
);
const imgs_res_45 = processGlobImport(
  import.meta.glob("../Compressed-Images/RESIDENTIAL - 45 degree/*", {
    eager: true,
    query: "?url",
    import: "default",
  })
);
const imgs_res_greenways = processGlobImport(
  import.meta.glob("../Compressed-Images/RESIDENTIAL - Greenways/*", {
    eager: true,
    query: "?url",
    import: "default",
  })
);

const imgs_res_brothers = processGlobImport(
  import.meta.glob("../Compressed-Images/RESIDENTIAL - House for brothers/*", {
    eager: true,
    query: "?url",
    import: "default",
  })
);
const imgs_res_kotturpuram = processGlobImport(
  import.meta.glob(
    "../Compressed-Images/RESIDENTIAL - KOTTURPURAM URBAN HABITAT HOUSING/*",
    {
      eager: true,
      query: "?url",
      import: "default",
    }
  )
);
const imgs_res_rukmini = processGlobImport(
  import.meta.glob("../Compressed-Images/RESIDENTIAL - Rukmini Residence/*", {
    eager: true,
    query: "?url",
    import: "default",
  })
);

// Retail
const imgs_retail_annapoorna = processGlobImport(
  import.meta.glob("../Compressed-Images/RETAIL -ANNAPOORNA MASALA/*", {
    eager: true,
    query: "?url",
    import: "default",
  })
);

// Signages
const imgs_signages_elcot = processGlobImport(
  import.meta.glob("../Compressed-Images/SIGNAGES - ELCOT/*", {
    eager: true,
    query: "?url",
    import: "default",
  })
);

// Unbuilt
const imgs_unbuilt_kanyakumari = processGlobImport(
  import.meta.glob("../Compressed-Images/UNBUILT - Kanyakumari Bridge/*", {
    eager: true,
    query: "?url",
    import: "default",
  })
);
const imgs_unbuilt_madurai = processGlobImport(
  import.meta.glob("../Compressed-Images/UNBUILT - Madurai Mall/*", {
    eager: true,
    query: "?url",
    import: "default",
  })
);
const imgs_unbuilt_memorial = processGlobImport(
  import.meta.glob(
    "../Compressed-Images/UNBUILT - UNIVERSE OF MUSIC AND LOVE - MEMORIAL FOR MR. BALASUBRAMANIYAM/*",
    {
      eager: true,
      query: "?url",
      import: "default",
    }
  )
);

const componentData = [
  // First 3: Rukmini Residence, Greenways Residential, Kanyakumari Bridge

  {
    key: "res-greenways",
    title: "Greenways Residential",
    location: "Alwarpet, Chennai",
    year: "2025",
    typology: "RESIDENTIAL",
    size: "—",
    status: "Ongoing",
    images: imgs_res_greenways,
  },

  {
    key: "unbuilt-kanyakumari",
    title: "Kanyakumari Bridge",
    location: "Kanyakumari, INDIA",
    year: "2020",
    typology: "UNBUILT",
    size: "—",
    status: "PROPOSAL",
    images: imgs_unbuilt_kanyakumari,
  },

  {
    key: "experience-thazhambur",
    title: "Thazhambur Lake — Experience Centre",
    location: "Thazhambur, INDIA",
    year: "2024",
    typology: "INTERPRETATION CENTRE",
    size: "—",
    status: "CONCEPT",
    images: imgs_experience_thazhambur,
  },

  {
    key: "experience-pudhuthangal",
    title: "Pudhuthangal Lake — Experience Centre",
    location: "Pudhuthangal, INDIA",
    year: "2024",
    typology: "EXPERIENCE CENTRE",
    size: "—",
    status: "CONCEPT",
    images: imgs_experience_pudhuthangal,
  },

  {
    key: "housing-hostel",
    title: "Hostel at Madurai",
    location: "Madurai, INDIA",
    year: "2023",
    typology: "HOUSING",
    size: "—",
    status: "ONGOING",
    images: imgs_housing_hostel,
  },

  {
    key: "office-elcot",
    title: "ELCOT Corporate Office",
    location: "Chennai, INDIA",
    year: "2022",
    typology: "OFFICE",
    size: "—",
    status: "ONGOING",
    images: imgs_office_elcot,
  },

  {
    key: "elcot-coimbatore",
    title: "IT HUB ELCOT COIMBATORE ",
    location: "ELCOT Coimbatore",
    year: "2023",
    typology: "OFFICE",
    size: "—",
    status: "PROPOSAL",
    images: imgs_office_elcot_coimbatore,
  },

  {
    key: "office-madarth",
    title: "Madarth Corporate Office",
    location: "Peelamedu, Coimbatore, INDIA",
    year: "2024",
    typology: "OFFICE",
    size: "—",
    status: "COMPLETED",
    images: imgs_office_madarth,
  },

  {
    key: "office-apollo",
    title: "Apollo Hospitals Office",
    location: "Chennai, INDIA",
    year: "2023",
    typology: "OFFICE",
    size: "—",
    status: "COMPLETED",
    images: imgs_office_apollo,
  },

  {
    key: "installation-death",
    title: "Death of Architecture — Installation",
    location: "Studio Project",
    year: "2023",
    typology: "INSTALLATION",
    size: "—",
    status: "COMPLETED",
    images: imgs_installation_death,
  },
  {
    key: "res-rukmini",
    title: "Rukmini Residence",
    location: "Kotturpuram, Chennai",
    year: "2025",
    typology: "RESIDENTIAL",
    size: "420 m²",
    status: "BUILT",
    images: imgs_res_rukmini,
    textAreas: [{}],
  },
  {
    key: "installation-kings",
    title: "Kings Birthday — Installation",
    location: "British Councilate, Chennai",
    year: "2022",
    typology: "INSTALLATION",
    size: "—",
    status: "COMPLETED",
    images: imgs_installation_kings,
  },

  {
    key: "res-45-degree",
    title: "45 Degree",
    location: "Chromepet, Chennai",
    year: "2024",
    typology: "RESIDENTIAL",
    size: "—",
    status: "COMPLETED",
    logo: logo45,
    images: imgs_res_45,
  },

  {
    key: "res-brothers",
    title: "House for Brothers",
    location: "Sithalapakkam, Chennai",
    year: "2022",
    typology: "RESIDENTIAL",
    size: "350 m²",
    status: "COMPLETED",
    images: imgs_res_brothers,
  },

  {
    key: "retail-annapoorna",
    title: "Annapoorna Masala — Retail",

    year: "2021",
    typology: "RETAIL",
    size: "200 m²",
    status: "PROPOSAL",
    images: imgs_retail_annapoorna,
  },

  {
    key: "residence-jana",
    title: "Artist Jana's Residence",
    location: "Ambattur, Chennai",
    year: "2025",
    typology: "RESIDENTIAL",
    size: "—",
    status: "ONGOING",
    images: imgs_residence_jana,
  },

  {
    key: "res-kotturpuram",
    title: "Kotturpuram Urban Habitat Housing",
    location: "Kotturpuram, Chennai, INDIA",
    year: "2022",
    typology: "RESIDENTIAL",
    size: "—",
    status: "UNBUILT",
    images: imgs_res_kotturpuram,
  },

  {
    key: "signages-elcot",
    title: "ELCOT — Signages",
    location: "Chennai, INDIA",
    year: "2022",
    typology: "SIGNAGE DESIGN",
    size: "—",
    status: "COMPLETED",
    images: imgs_signages_elcot,
  },

  {
    key: "unbuilt-madurai",
    title: "Madurai Mall",
    location: "Madurai, INDIA",
    year: "2021",
    typology: "INSTITUTIONAL",
    size: "—",
    status: "ONGOING",
    images: imgs_unbuilt_madurai,
  },

  {
    key: "unbuilt-memorial",
    title: "Universe of Music and Love — Memorial for Mr. Balasubramaniyam",
    location: "India",
    year: "2023",
    typology: "MEMORIAL CUM MUSEUM",
    size: "—",
    status: "UNBUILT",
    images: imgs_unbuilt_memorial,
    textAreas: [
      {
        subtitle: "MEMORIAL",
        texts: [
          "A memorial design celebrating the legacy of legendary singer Mr. Balasubramaniyam through architectural form and cultural storytelling.",
        ],
      },
    ],
    shareIcons: [
      { href: "mailto:?subject=Memorial%20Balasubramaniyam", name: "email" },
      { href: "#", name: "Facebook" },
      { href: "#", name: "Linkedin" },
      { href: "#", name: "Twitter" },
    ],
  },
];

export default componentData;

export const imagesByProject = {
  experience_thazhambur: imgs_experience_thazhambur,
  experience_pudhuthangal: imgs_experience_pudhuthangal,
  housing_hostel: imgs_housing_hostel,
  installation_death: imgs_installation_death,
  installation_kings: imgs_installation_kings,
  office_elcot: imgs_office_elcot,
  office_elcot_coimbatore: imgs_office_elcot_coimbatore,
  office_madarth: imgs_office_madarth,
  office_apollo: imgs_office_apollo,
  res_greenways: imgs_res_greenways,
  res_45: imgs_res_45,
  res_brothers: imgs_res_brothers,
  res_rukmini: imgs_res_rukmini,
  res_kotturpuram: imgs_res_kotturpuram,
  residence_jana: imgs_residence_jana,
  retail_annapoorna: imgs_retail_annapoorna,
  signages_elcot: imgs_signages_elcot,
  unbuilt_kanyakumari: imgs_unbuilt_kanyakumari,
  unbuilt_madurai: imgs_unbuilt_madurai,
  unbuilt_memorial: imgs_unbuilt_memorial,
};

// _______________________________PREVIOUS VERSION____________________________________

// // componentData.js
// // Exports an array of project data. Each project includes metadata and an images array
// // built with Vite's `import.meta.globEager` so local assets can be imported automatically.
// import logo45 from "../45.png";

// function loadImages(globPath) {
//   const modules = import.meta.globEager(globPath);
//   return Object.keys(modules)
//     .sort()
//     .map((k) => modules[k].default);
// }

// // Load images per project folder
// const imgs_experience = loadImages(
//   "../Compressed-Images/EXPERIENCE CENTRE- Thazhambur lake - interpretation centre/*.{png,jpg,jpeg,webp,svg}"
// );
// const imgs_installation_death = loadImages(
//   "../Compressed-Images/INSTALLATION - Death of Architecture/*.{png,jpg,jpeg,webp,svg}"
// );
// const imgs_installation_kings = loadImages(
//   "../Compressed-Images/INSTALLATION - Kings Birthday/*.{png,jpg,jpeg,webp,svg}"
// );
// const imgs_office_madarth = loadImages(
//   "../Compressed-Images/OFFICE - Madarth/*.{png,jpg,jpeg,webp,svg}"
// );
// const imgs_office_apollo = loadImages(
//   "../Compressed-Images/OFFICE- Apollo/*.{png,jpg,jpeg,webp,svg}"
// );
// const imgs_res_greenways = loadImages(
//   "../Compressed-Images/RESIDENTAL-Greenways/*.{png,jpg,jpeg,webp,svg}"
// );
// const imgs_res_45 = loadImages(
//   "../Compressed-Images/RESIDENTIAL - 45 degree/*.{png,jpg,jpeg,webp,svg}"
// );
// const imgs_res_brothers = loadImages(
//   "../Compressed-Images/RESIDENTIAL - House for brothers/*.{png,jpg,jpeg,webp,svg}"
// );
// const imgs_res_rukmini = loadImages(
//   "../Compressed-Images/RESIDENTIAL - Rukmini Residence/*.{png,jpg,jpeg,webp,svg}"
// );
// const imgs_retail_annapoorna = loadImages(
//   "../Compressed-Images/RETAIL -ANNAPOORNA MASALA/*.{png,jpg,jpeg,webp,svg}"
// );
// const imgs_unbuilt_kanyakumari = loadImages(
//   "../Compressed-Images/UNBUILT - Kanyakumari Bridge/*.{png,jpg,jpeg,webp,svg}"
// );
// const imgs_unbuilt_madurai = loadImages(
//   "../Compressed-Images/UNBUILT - Madurai Mall/*.{png,jpg,jpeg,webp,svg}"
// );

// const componentData = [
//   {
//     key: "experience-centre",
//     title: "Thazhambur Lake — Experience Centre",
//     location: "Thazhambur, INDIA",
//     year: "2024",
//     typology: "INTERPRETATION CENTRE",
//     size: "—",
//     status: "CONCEPT",
//     images: imgs_experience,
//     textAreas: [
//       {
//         subtitle: "ABOUT",
//         texts: [
//           "An interpretation centre located on Thazhambur lake that introduces visitors to the ecology and cultural history of the area through immersive exhibits and landscape interventions.",
//           "An interpretation centre located on Thazhambur lake that introduces visitors to the ecology and cultural history of the area through immersive exhibits and landscape interventions."
//         ],
//       },
//     ],
//     shareIcons: [
//       { href: "mailto:?subject=Thazhambur%20Lake", name: "email" },
//       { href: "#", name: "facebook" },
//       { href: "#", name: "linkedin" },
//       { href: "#", name: "twitter" },
//     ],
//   },

//   {
//     key: "installation-death",
//     title: "Death of Architecture — Installation",
//     location: "Studio Project",
//     year: "2023",
//     typology: "INSTALLATION",
//     size: "—",
//     status: "EXHIBITION",
//     images: imgs_installation_death,
//     textAreas: [
//       {
//         subtitle: "CONCEPT",
//         texts: [
//           "A sculptural installation exploring memory and material transformation through staged architectural fragments and lighting interventions.",
//         ],
//       },
//     ],
//     shareIcons: [
//       { href: "mailto:?subject=Death%20of%20Architecture", name: "email" },
//       { href: "#", name: "facebook" },
//       { href: "#", name: "linkedin" },
//       { href: "#", name: "twitter" },
//     ],
//   },

//   {
//     key: "installation-kings",
//     title: "Kings Birthday — Installation",
//     location: "Public Plaza",
//     year: "2022",
//     typology: "INSTALLATION",
//     size: "—",
//     status: "COMPLETED",
//     images: imgs_installation_kings,
//     textAreas: [
//       {
//         subtitle: "DESCRIPTION",
//         texts: [
//           "A temporary installation created for a public celebration combining participatory elements with ephemeral materials.",
//         ],
//       },
//     ],
//     shareIcons: [
//       { href: "mailto:?subject=Kings%20Birthday", name: "email" },
//       { href: "#", name: "facebook" },
//       { href: "#", name: "linkedin" },
//       { href: "#", name: "twitter" },
//     ],
//   },

//   {
//     key: "office-madarth",
//     title: "Madarth Office",
//     location: "Madarth, INDIA",
//     year: "2021",
//     typology: "OFFICE",
//     size: "1,200 m²",
//     status: "BUILT",
//     images: imgs_office_madarth,
//     textAreas: [
//       {
//         subtitle: "BRIEF",
//         texts: [
//           "A compact office building optimized for daylight and flexible workspace layouts.",
//         ],
//       },
//     ],
//     shareIcons: [
//       { href: "mailto:?subject=Madarth%20Office", name: "email" },
//       { href: "#", name: "facebook" },
//       { href: "#", name: "linkedin" },
//       { href: "#", name: "twitter" },
//     ],
//   },

//   {
//     key: "office-apollo",
//     title: "Apollo Office",
//     location: "City Centre",
//     year: "2020",
//     typology: "OFFICE",
//     size: "900 m²",
//     status: "BUILT",
//     images: imgs_office_apollo,
//     textAreas: [
//       {
//         subtitle: "PROGRAM",
//         texts: [
//           "An adaptive office fit-out focused on user well-being and material simplicity.",
//         ],
//       },
//     ],
//     shareIcons: [
//       { href: "mailto:?subject=Apollo%20Office", name: "email" },
//       { href: "#", name: "facebook" },
//       { href: "#", name: "linkedin" },
//       { href: "#", name: "twitter" },
//     ],
//   },

//   {
//     key: "res-greenways",
//     title: "Greenways Residential",
//     location: "Coastal Region",
//     year: "2025",
//     typology: "RESIDENTIAL",
//     size: "—",
//     status: "DESIGN",
//     images: imgs_res_greenways,
//     textAreas: [
//       {
//         subtitle: "OVERVIEW",
//         texts: [
//           "A small cluster of homes designed around shared green corridors and sustainable passive strategies.",
//         ],
//       },
//     ],
//     shareIcons: [
//       { href: "mailto:?subject=Greenways", name: "email" },
//       { href: "#", name: "facebook" },
//       { href: "#", name: "linkedin" },
//       { href: "#", name: "twitter" },
//     ],
//   },

//   {
//     key: "res-45-degree",
//     title: "Residential — 45 Degree",
//     location: "Unknown",
//     year: "2024",
//     typology: "RESIDENTIAL",
//     size: "—",
//     status: "DESIGN",
//     logo: logo45,
//     images: imgs_res_45,
//     textAreas: [
//       {
//         subtitle: "CONCEPT",
//         texts: [
//           "A study in rotation and orientation: homes arranged on a 45° grid to capture diagonal vistas and natural ventilation.",
//         ],
//       },
//     ],
//     shareIcons: [
//       { href: "mailto:?subject=Residential%2045%20Degree", name: "email" },
//       { href: "#", name: "facebook" },
//       { href: "#", name: "linkedin" },
//       { href: "#", name: "twitter" },
//     ],
//   },

//   {
//     key: "res-brothers",
//     title: "House for Brothers",
//     location: "Suburban Site",
//     year: "2019",
//     typology: "RESIDENTIAL",
//     size: "350 m²",
//     status: "BUILT",
//     images: imgs_res_brothers,
//     textAreas: [
//       {
//         subtitle: "DESCRIPTION",
//         texts: [
//           "A family house organized around a central courtyard and shared terraces.",
//         ],
//       },
//     ],
//     shareIcons: [
//       { href: "mailto:?subject=House%20for%20Brothers", name: "email" },
//       { href: "#", name: "facebook" },
//       { href: "#", name: "linkedin" },
//       { href: "#", name: "twitter" },
//     ],
//   },

//   {
//     key: "res-rukmini",
//     title: "Rukmini Residence",
//     location: "Hill Station",
//     year: "2022",
//     typology: "RESIDENTIAL",
//     size: "420 m²",
//     status: "BUILT",
//     images: imgs_res_rukmini,
//     textAreas: [
//       {
//         subtitle: "BRIEF",
//         texts: [
//           "A residence responding to sloping topography and views across the valley.",
//         ],
//       },
//     ],
//     shareIcons: [
//       { href: "mailto:?subject=Rukmini%20Residence", name: "email" },
//       { href: "#", name: "facebook" },
//       { href: "#", name: "linkedin" },
//       { href: "#", name: "twitter" },
//     ],
//   },

//   {
//     key: "retail-annapoorna",
//     title: "Annapoorna Masala — Retail",
//     location: "Market Street",
//     year: "2018",
//     typology: "RETAIL",
//     size: "200 m²",
//     status: "BUILT",
//     images: imgs_retail_annapoorna,
//     textAreas: [
//       {
//         subtitle: "PROJECT",
//         texts: [
//           "A compact retail fit-out with a focus on branding and customer flow.",
//         ],
//       },
//     ],
//     shareIcons: [
//       { href: "mailto:?subject=Annapoorna%20Masala", name: "email" },
//       { href: "#", name: "facebook" },
//       { href: "#", name: "linkedin" },
//       { href: "#", name: "twitter" },
//     ],
//   },

//   {
//     key: "unbuilt-kanyakumari",
//     title: "Kanyakumari Bridge",
//     location: "Kanyakumari, INDIA",
//     year: "2020",
//     typology: "UNBUILT",
//     size: "—",
//     status: "PROPOSAL",
//     images: imgs_unbuilt_kanyakumari,
//     textAreas: [
//       {
//         subtitle: "CONCEPT",
//         texts: [
//           "A conceptual bridge exploring structural expression and public accessibility.",
//         ],
//       },
//     ],
//     shareIcons: [
//       { href: "mailto:?subject=Kanyakumari%20Bridge", name: "email" },
//       { href: "#", name: "facebook" },
//       { href: "#", name: "linkedin" },
//       { href: "#", name: "twitter" },
//     ],
//   },

//   {
//     key: "unbuilt-madurai",
//     title: "Madurai Mall",
//     location: "Madurai, INDIA",
//     year: "2021",
//     typology: "UNBUILT",
//     size: "—",
//     status: "CONCEPT",
//     images: imgs_unbuilt_madurai,
//     textAreas: [
//       {
//         subtitle: "OVERVIEW",
//         texts: [
//           "A mixed-use mall proposal responding to regional climate and local retail patterns.",
//         ],
//       },
//     ],
//     shareIcons: [
//       { href: "mailto:?subject=Madurai%20Mall", name: "email" },
//       { href: "#", name: "facebook" },
//       { href: "#", name: "linkedin" },
//       { href: "#", name: "twitter" },
//     ],
//   },
// ];

// export default componentData;

// export const imagesByProject = {
//   experience: imgs_experience,
//   installation_death: imgs_installation_death,
//   installation_kings: imgs_installation_kings,
//   office_madarth: imgs_office_madarth,
//   office_apollo: imgs_office_apollo,
//   res_greenways: imgs_res_greenways,
//   res_45: imgs_res_45,
//   res_brothers: imgs_res_brothers,
//   res_rukmini: imgs_res_rukmini,
//   retail_annapoorna: imgs_retail_annapoorna,
//   unbuilt_kanyakumari: imgs_unbuilt_kanyakumari,
//   unbuilt_madurai: imgs_unbuilt_madurai,
// };
