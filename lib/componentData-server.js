import fs from "fs";
import path from "path";

// Map of image folders with their metadata - using index as unique key
const folderConfigs = [
  {
    key: "exp_pudhuthangal",
    folder: "EXPERIENCE CENTRE -Pudhuthangal Lake",
    title: "Pudhuthangal Lake",
    typology: "Experience Centre",
  },
  {
    key: "exp_thazhambur",
    folder: "EXPERIENCE CENTRE- Thazhambur lake - interpretation centre",
    title: "Thazhambur Lake",
    typology: "Experience Centre",
  },
  {
    key: "housing_hostel",
    folder: "HOUSING - HOSTEL AT MADURAI",
    title: "Hostel Madurai",
    typology: "Housing",
  },
  {
    key: "installation_death",
    folder: "INSTALLATION - Death of Architecture",
    title: "Death of Architecture",
    typology: "Installation",
  },
  {
    key: "installation_kings",
    folder: "INSTALLATION - Kings Birthday",
    title: "Kings Birthday",
    typology: "Installation",
  },
  {
    key: "office_elcot",
    folder: "OFFICE - ELCOT CORPORATE OFFICE",
    title: "ELCOT Corporate Office",
    typology: "Office",
  },
  {
    key: "office_madarth",
    folder: "OFFICE - Madarth",
    title: "Madarth",
    typology: "Office",
  },
  {
    key: "office_elcot_corp",
    folder: "OFFICE - PROPOSED ELCOT COIMBATORE",
    title: "ELCOT Coimbatore",
    typology: "Office",
  },
  {
    key: "office_apollo",
    folder: "OFFICE- Apollo",
    title: "Apollo",
    typology: "Office",
  },
  {
    key: "residence_jana",
    folder: "RESIDENCE - JANA ARTIST",
    title: "Jana Artist Residence",
    typology: "Residential",
  },
  {
    key: "res_45",
    folder: "RESIDENTIAL - 45 degree",
    title: "45 Degree",
    typology: "Residential",
  },
  {
    key: "res_greenways",
    folder: "RESIDENTIAL - Greenways",
    title: "Greenways",
    typology: "Residential",
  },
  {
    key: "res_brothers",
    folder: "RESIDENTIAL - House for brothers",
    title: "House for Brothers",
    typology: "Residential",
  },
  {
    key: "res_kotturpuram",
    folder: "RESIDENTIAL - KOTTURPURAM URBAN HABITAT HOUSING",
    title: "Kotturpuram Urban Habitat",
    typology: "Residential",
  },
  {
    key: "res_rukmini",
    folder: "RESIDENTIAL - Rukmini Residence",
    title: "Rukmini Residence",
    typology: "Residential",
  },
  {
    key: "retail_annapoorna",
    folder: "RETAIL -ANNAPOORNA MASALA",
    title: "Annapoorna Masala",
    typology: "Retail",
  },
  {
    key: "signages_elcot",
    folder: "SIGNAGES - ELCOT",
    title: "ELCOT Signages",
    typology: "Signage",
  },
  {
    key: "unbuilt_kanyakumari",
    folder: "UNBUILT - Kanyakumari Bridge",
    title: "Kanyakumari Bridge",
    typology: "Unbuilt",
  },
  {
    key: "unbuilt_madurai",
    folder: "UNBUILT - Madurai Mall",
    title: "Madurai Mall",
    typology: "Unbuilt",
  },
  {
    key: "unbuilt_memorial",
    folder:
      "UNBUILT - UNIVERSE OF MUSIC AND LOVE - MEMORIAL FOR MR. BALASUBRAMANIYAM",
    title: "Universe of Music & Love",
    typology: "Unbuilt",
  },
];

function getImageUrlsFromFolder(folderPath) {
  try {
    const fullPath = path.join(
      process.cwd(),
      "public",
      "assets",
      "Compressed-Images",
      folderPath,
    );
    if (!fs.existsSync(fullPath)) {
      return [];
    }

    const files = fs.readdirSync(fullPath);
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|webp|gif)$/i.test(file),
    );

    return imageFiles.map(
      (file) => `/assets/Compressed-Images/${folderPath}/${file}`,
    );
  } catch (error) {
    console.error(`Error reading folder ${folderPath}:`, error);
    return [];
  }
}

// Build componentData dynamically with proper format for the gallery component
const componentData = folderConfigs
  .map((config) => ({
    key: config.key,
    title: config.title,
    typology: config.typology,
    images: getImageUrlsFromFolder(config.folder),
  }))
  .filter((item) => item.images.length > 0);

export default componentData;
