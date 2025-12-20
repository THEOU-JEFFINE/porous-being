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
