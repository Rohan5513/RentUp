// export const nav = [
//   {
//     text: "home",
//     path: "/",
//   },
//   {
//     text: "about",
//     path: "/about",
//   },
//   {
//     text: "services",
//     path: "/services",
//   },
//   {
//     text: "blog",
//     path: "/blog",
//   },
//   {
//     text: "pricing",
//     path: "/pricing",
//   },
//   {
//     text: "contact",
//     path: "/contact",
//   },
    
// ]

import  axios   from "axios";
import Aniket from "../images/customer/Aniket.jpg"

export const getCities = async () => {
  try {
    const response = await axios.get("http://localhost:8080/city/"); // Update the API endpoint
    console.log('from here'+response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};

export const getNavData = (user) => {
  const navData = [
      {
    text: "home",
    path: "/",
  },
  {
    text: "about",
    path: "/about",
  },
  // {
  //   text: "services",
  //   path: "/services",
  // },
  // {
  //   text: "blog",
  //   path: "/blog",
  // },
  {
    text: "contact",
    path: "/contact",
  },
  {
    text: "add property",
    path: "/property",
  },
    // Your other navigation items here
    {
      text: "Visits Requested",
      path: "/visits",
    },
    { text: user ? 'Logout' : 'Login', path: user? '/logout':'/login'},
    { text:user? 'Profile':'Sign up', path: user?'/profile':'/signup' },
  ];

  return navData;
};
export const featured = [
  {
    cover: "../images/hero/h1.png",
    name: "Family House",
    total: "122 Property",
  },
  {
    cover: "../images/hero/h2.png",
    name: "House & Villa",
    total: "155 Property",
  },
  {
    cover: "../images/hero/h3.png",
    name: "Apartment",
    total: "300 Property",
  },
  {
    cover: "../images/hero/h4.png",
    name: "Office & Studio",
    total: "80 Property",
  },
  {
    cover: "../images/hero/h6.png",
    name: "Villa & Condo",
    total: "80 Property",
  },
]
export const list = [
  {
    id: 1,
    cover: "../images/list/p-1.png",
    name: "Red Carpet Real Estate",
    location: "210 Zirak Road, Canada",
    category: "For Rent",
    price: "$3,700",
    type: "Apartment",
  },
  {
    id: 2,
    cover: "../images/list/p-2.png",
    name: "Fairmount Properties",
    location: "5698 Zirak Road, NewYork",
    category: "For Sale",
    price: "$9,750",
    type: "Condos",
  },
  {
    id: 3,
    cover: "../images/list/p-7.png",
    name: "The Real Estate Corner",
    location: "5624 Mooker Market, USA",
    category: "For Rent",
    price: "$5,860",
    type: "Offices",
  },
  {
    id: 4,
    cover: "../images/list/p-4.png",
    name: "Herringbone Realty",
    location: "5621 Liverpool, London",
    category: "For Sale",
    price: "$7,540",
    type: "Homes & Villas",
  },
  {
    id: 5,
    cover: "../images/list/p-5.png",
    name: "Brick Lane Realty",
    location: "210 Montreal Road, Canada",
    category: "For Rent",
    price: "$4,850",
    type: "Commercial",
  },
  {
    id: 6,
    cover: "../images/list/p-6.png",
    name: "Banyon Tree Realty",
    location: "210 Zirak Road, Canada",
    category: "For Sale",
    price: "$2,742",
    type: "Apartment",
  },
]
export const awards = [
  {
    icon: <i class='fa-solid fa-trophy'></i>,
    num: "32 M	",
    name: "Blue Burmin Award",
  },
  {
    icon: <i class='fa-solid fa-briefcase'></i>,
    num: "43 M",
    name: "Mimo X11 Award",
  },
  {
    icon: <i class='fa-solid fa-lightbulb'></i>,
    num: "51 M",
    name: "Australian UGC Award",
  },
  {
    icon: <i class='fa-solid fa-heart'></i>,
    num: "42 M",
    name: "IITCA Green Award",
  },
]
export const location = [
  {
    id: 1,
    name: "New Orleans, Louisiana",
    Villas: "12 Villas",
    Apartments: "10 Apartments",
    Offices: "07 Offices",
    cover: "./images/location/city-1.png",
  },
  {
    id: 2,
    name: "Jerrsy, United State",
    Villas: "12 Villas",
    Apartments: "10 Apartments",
    Offices: "07 Offices",
    cover: "./images/location/city-2.png",
  },
  {
    id: 3,
    name: "Liverpool, London",
    Villas: "12 Villas",
    Apartments: " 10 Apartments",
    Offices: "07 Offices",
    cover: "./images/location/city-3.png",
  },
  {
    id: 4,
    name: "NewYork, United States",
    Villas: "12 Villas",
    Apartments: " 10 Apartments",
    Offices: "07 Offices",
    cover: "./images/location/city-4.png",
  },
  {
    id: 5,
    name: "Montreal, Canada",
    Villas: "12 Villas",
    Apartments: " 10 Apartments",
    Offices: "07 Offices",
    cover: "./images/location/city-5.png",
  },
  {
    id: 6,
    name: "California, USA",
    Villas: "12 Villas",
    Apartments: " 10 Apartments",
    Offices: "07 Offices",
    cover: "./images/location/city-6.png",
  },
]
export const team = [
  {
    list: "50",
    cover: "../images/customer/team-1.jpg",
    address: "Liverpool, Canada",
    name: "Sargam S. Singh",
    icon: [<i class='fa-brands fa-facebook-f'></i>, <i class='fa-brands fa-linkedin'></i>, <i class='fa-brands fa-twitter'></i>, <i class='fa-brands fa-instagram'></i>],
  },
  {
    list: "70",
    cover: "../images/customer/team-2.jpg",
    address: "Montreal, Canada",
    name: "Harijeet M. Siller",
    icon: [<i class='fa-brands fa-facebook-f'></i>, <i class='fa-brands fa-linkedin'></i>, <i class='fa-brands fa-twitter'></i>, <i class='fa-brands fa-instagram'></i>],
  },
  {
    list: "80",
    cover: "../images/customer/team-3.jpg",
    address: "Denever, USA",
    name: "Anna K. Young",
    icon: [<i class='fa-brands fa-facebook-f'></i>, <i class='fa-brands fa-linkedin'></i>, <i class='fa-brands fa-twitter'></i>, <i class='fa-brands fa-instagram'></i>],
  },
  {
    list: "51",
    cover: "../images/customer/team-4.jpg",
    address: "2272 Briarwood Drive",
    name: "Michael P. Grimaldo",
    icon: [<i class='fa-brands fa-facebook-f'></i>, <i class='fa-brands fa-linkedin'></i>, <i class='fa-brands fa-twitter'></i>, <i class='fa-brands fa-instagram'></i>],
  },
  {
    list: "42",
    cover: "../images/customer/team-5.jpg",
    address: "2272 Briarwood Drive",
    name: "Michael P. Grimaldo",
    icon: [<i class='fa-brands fa-facebook-f'></i>, <i class='fa-brands fa-linkedin'></i>, <i class='fa-brands fa-twitter'></i>, <i class='fa-brands fa-instagram'></i>],
  },
  {
    list: "38",
    cover: "../images/customer/team-5.jpg",
    address: "Montreal, USA",
    name: "Adam K. Jollio",
    icon: [<i class='fa-brands fa-facebook-f'></i>, <i class='fa-brands fa-linkedin'></i>, <i class='fa-brands fa-twitter'></i>, <i class='fa-brands fa-instagram'></i>],
  },
]
export const price = [
  {
    plan: "Silver",
    price: "199",
    ptext: "per month",
    list: [
      {
        icon: <i class='fa-solid fa-check'></i>,
        text: "Login from 2 Devices",
      },
      {
        icon: <i class='fa-solid fa-check'></i>,
        text: "Add Free Experience",
      },
      {
        icon: <i class='fa-solid fa-check'></i>,
        text: "1 month customer support for rented property",
      },
      { change: "color", icon: <i class='fa-solid fa-x'></i>, text: "List Unlimited Properties in a month" },
      { change: "color", icon: <i class='fa-solid fa-x'></i>, text: "Contact Unlimited Brokers" },
    ],
  },
  {
    best: "Best Value",
    plan: "Gold",
    price: "299",
    ptext: "per month",
    list: [
      {
        icon: <i class='fa-solid fa-check'></i>,
        text: "Login from 4 Devices",
      },
      {
        icon: <i class='fa-solid fa-check'></i>,
        text: "Add Free Experience",
      },
      {
        icon: <i class='fa-solid fa-check'></i>,
        text: "2 month customer support for rented property",
      },
      {
        icon: <i class='fa-solid fa-check'></i>,
        text: "List Unlimited Properties in a month",
      },
      {
        change: "color",
        icon: <i class='fa-solid fa-x'></i>,
        text: "Contact Unlimited Brokers",
      },
    ],
  },
  {
    plan: "Platinum",
    price: "499",
    ptext: "per month",
    list: [
      {
        icon: <i class='fa-solid fa-check'></i>,
        text: "Login from 8 Devices",
      },
      {
        icon: <i class='fa-solid fa-check'></i>,
        text: "Add Free Experience",
      },
      {
        icon: <i class='fa-solid fa-check'></i>,
        text: "List Unlimited Properties in a month",
      },
      {
        icon: <i class='fa-solid fa-check'></i>,
        text: "1 month customer support for rented property",
      },
      {
        icon: <i class='fa-solid fa-check'></i>,
        text: "Contact Unlimited Brokers",
      },
    ],
  },
]
// export const footer = [
//   {
//     title: "LAYOUTS",
//     text: [{ list: "Home Page" }, { list: "About Page" }, { list: "Service Page" }, { list: "Property Page" }, { list: "Contact Page" }, { list: "Single Blog" }],
//   },
//   {
//     title: "ALL SECTIONS",
//     text: [{ list: "Headers" }, { list: "Features" }, { list: "Attractive" }, { list: "Testimonials" }, { list: "Videos" }, { list: "Footers" }],
//   },
//   {
//     title: "COMPANY",
//     text: [{ list: "About" }, { list: "Blog" }, { list: "Pricing" }, { list: "Affiliate" }, { list: "Login" }, { list: "Changelog" }],
//   },
// ]

export const footer = [
  {
    title: "LAYOUTS",
    text: [{ list: "Home Page" }, { list: "About Page" }, { list: "Service Page" }, { list: "Property Page" }, { list: "Contact Page" }, { list: "Single Blog" }],
  },
  {
    title: "ALL SECTIONS",
    text: [{ list: "Headers" }, { list: "Features" }, { list: "Attractive" }, { list: "Testimonials" }, { list: "Videos" }, { list: "Footers" }],
  },
  {
    title: "COMPANY",
    text: [{ list: "About" }, { list: "Blog" }, { list: "Pricing" }, { list: "Affiliate" }, { list: "Login" }, { list: "Changelog" }],
  },
];

export const socialMediaLinks = [
  { platform: "Facebook", link: "https://www.facebook.com/yourpage" },
  { platform: "Twitter", link: "https://twitter.com/yourpage" },
  { platform: "Instagram", link: "https://www.instagram.com/yourpage" },
  // Add more social media platforms and their links as needed
];

// add to Data.js for ABOUT

export const teamMembers = [
  {
    name: "Kamlesh Deokar",
    prn: "230940120051",
    college: "CDAC ACTS",
    profilePicture: "../images/customer/kmalesh.jpg",
  },
  {
    name: "Suraj Wankhade",
    prn: "230940120203",
    college: "CDAC ACTS",
    profilePicture: "../images/customer/Suraj.jpg",
  },
  {
    name: "Akash Gholve",
    prn: "230940120063",
    college: "CDAC ACTS",
    profilePicture: "src\components\images\customer\Akash.jpg",
  },
  {
    name: "Rohan Auti",
    prn: "230940120155",
    college: "CDAC ACTS",
    profilePicture: "../images/customer/Rohan.jpg",
  },
  {
    name: "Aniket ",
    prn: "230940120024",
    college: "CDAC ACTS",
    profilePicture: "../images/customer/Aniket.jpg",
  },
  // Add details of other team members as needed
];
  
  export const getAreas = async (city) => {
  try {
    const response = await axios.get(`http://localhost:8080/area/${city}`); // Update the API endpoint for areas
    return response.data;
  } catch (error) {
    console.error(`Error fetching areas for ${city}:`, error);
    return [];
  }
};


export const getAllProperties = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/properties`);
    return response.data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
};
  




