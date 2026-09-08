// Single source of truth for contact + availability.
// Edit here. These values are rendered on the homepage and the About page.

export const site = {
  name: "Clint Mathews",
  email: "mathewsclint28@gmail.com",
  phone: "+91 70255 89085",
  github: "https://github.com/Clint-Mathews",
  linkedin: "https://www.linkedin.com/in/clint-mathews/",
  resume: "/CLINT-MATHEWS.pdf",
};

export const availability = {
  status: "Open to work, full-time & select contract",
  cells: [
    {
      label: "Full-time",
      value: "Open to the right role",
      note: "2 months' notice",
    },
    {
      label: "Contract",
      value: "Open to select projects",
      note: "Fixed scope, fixed end date",
    },
    {
      label: "Timezone",
      value: "IST · UTC+5:30",
      note: "~4h daily overlap with US East",
    },
    {
      label: "Core stack",
      value: "Go · Python · TypeScript",
      note: "NestJS · FastAPI · React · GCP",
    },
  ],
};

export const stats = [
  { n: "8,200", k: "Chargers live" },
  { n: "6M", k: "Messages / day" },
  { n: "99.95%", k: "Uptime" },
  { n: "$9K", k: "Cut / month" },
];
