<div align="center">
  <a href="https://github.com/alexiamarcee/marcy-museum">
    <img src="src/assets/photos/logo.png" alt="Marcy Museum Logo" width="120" height="120" style="border-radius: 50%">
  </a>
  <h3 align="center">🎨 Marcy Museum</h3>
  <p align="center">
    A modern and responsive React application for a contemporary art museum.
    <br />
    <a href="https://github.com/alexiamarcee/marcy-museum"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/alexiamarcee/marcy-museum">View Demo</a>
    ·
    <a href="https://github.com/alexiamarcee/marcy-museum/issues">Report Bug</a>
    ·
    <a href="https://github.com/alexiamarcee/marcy-museum/issues">Request Feature</a>
  </p>
</div>

📚 Table of Contents

About The Project
Built With
Getting Started

Prerequisites
Installation


Usage
Roadmap
Project Structure
Internationalization
Firebase Integration
UX / UI & Clean Code
Contributing
License
Contact
Acknowledgments


🏛 About The Project
Marcy Museum is a modern, responsive web application built with React that represents the official website of a contemporary art museum located in Las Palmas de Gran Canaria. The project demonstrates best practices in frontend development, including responsive design, clean code architecture, internationalization, and real-time database integration.
🏠 Home Page
The Home page is the main landing page of the application. It features:

A hero section welcoming visitors with a title and description of the museum
A Current Exhibitions section that dynamically renders exhibition cards from a JavaScript data array (exhibitions.js). Each card displays an image, title, artist name and description — all fully translated into English, Spanish and French
An interactive map powered by Leaflet showing the exact museum location
Info cards displaying the museum address, opening hours and contact details

Other pages

Exhibitions — full grid of all artworks with translated titles and descriptions
Visit — museum info, opening hours, admission prices, accessibility, parking, interactive map and contact form
Forum — community forum with real-time Firebase integration (post and delete messages)
Legal pages — Privacy Policy, Cookies Policy, Terms & Conditions and Contact, all translated into three languages

Why this project?

To apply React fundamentals in a real-world scenario
To practice reusable component architecture
To follow clean code and naming conventions
To implement responsive and user-friendly design
To integrate real-time databases with Firebase
To implement multi-language support with i18next


🚀 Built With
Main technologies used in this project:

React
Vite
React Router DOM
Leaflet
React Leaflet
Firebase Realtime Database
i18next
react-i18next
i18next-http-backend
React Icons
CSS3 (Flexbox & Media Queries)


⚙ Getting Started
To get a local copy up and running, follow these steps.

📌 Prerequisites
You need:

Node.js installed
npm (comes with Node)

Check your npm version:
shnpm install npm@latest -g

💻 Installation

Clone the repository:

shgit clone https://github.com/alexiamarcee/marcy-museum.git

Navigate to the project folder:

shcd marcy-museum

Install dependencies:

shnpm install

Start development server:

shnpm run dev
The application will run at:
http://localhost:5173
http://localhost:5173/home

🖥 Usage
Marcy Museum allows users to:

Explore featured exhibitions dynamically rendered from a data array
Navigate between different sections using React Router
Switch between English, Spanish and French using the language switcher in the header
View museum location via interactive Leaflet map
Post and delete messages in the community forum in real time via Firebase
Access contact form and museum information
Read legal pages: Privacy Policy, Cookies Policy, Terms & Conditions

This project demonstrates:

Component reusability
Props usage
Clean folder structure
Responsive layout for mobile, tablet and desktop
Third-party library integration
Real-time database integration with Firebase
Internationalization (i18n) with i18next


🗺 Roadmap

 Dynamic exhibitions from a data array
 Interactive map with Leaflet
 Multi-language support (EN, ES, FR) with i18next
 Community Forum with Firebase Realtime Database
 Responsive design for mobile, tablet and desktop
 Custom museum logo in sticky header
 Legal pages with consistent formatting
 Add ticket booking functionality
 Add exhibition detail pages
 Improve animations and transitions
 Deploy project online

See the repository issues for future improvements.

📂 Project Structure
marcy-museum/
├── public/
│   ├── vite.svg
│   └── locales/               # i18n translation files
│       ├── en/
│       │   └── translation.json
│       ├── es/
│       │   └── translation.json
│       └── fr/
│           └── translation.json
├── src/
│   ├── assets/
│   │   ├── react.svg
│   │   └── photos/            # Images (logo, exhibitions)
│   │       ├── logo.png
│   │       ├── dog.jpg
│   │       ├── duck.jpg
│   │       └── silly.jpg
│   ├── components/
│   │   ├── exhibition-card/
│   │   │   ├── ExhibitionCard.jsx
│   │   │   └── ExhibitionCard.css
│   │   ├── footer/
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.css
│   │   ├── foro/              # Community Forum with Firebase
│   │   │   ├── Firebase-crud.js
│   │   │   ├── Firebase-setup.js
│   │   │   ├── Foro.jsx
│   │   │   └── Foro.css
│   │   ├── header/
│   │   │   ├── Header.jsx
│   │   │   └── Header.css
│   │   └── sample-form/
│   ├── data/
│   │   └── exhibitions.js     # Exhibitions data array
│   ├── i18n/                  # Internationalization
│   │   ├── config.ts
│   │   └── LocaleSwitcher.jsx
│   ├── pages/
│   │   ├── exhibitions/
│   │   │   ├── Exhibitions.jsx
│   │   │   └── Exhibitions.css
│   │   ├── home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.css
│   │   ├── locations/
│   │   │   ├── Locations.jsx
│   │   │   └── Locations.css
│   │   ├── policy/
│   │   │   ├── Contact.jsx
│   │   │   ├── CookiesPolicy.jsx
│   │   │   ├── Policy.css
│   │   │   ├── PrivacyPolicy.jsx
│   │   │   └── Terms.jsx
│   │   └── visit/
│   │       ├── Visit.jsx
│   │       └── Visit.css
│   ├── services/
│   │   └── Positions.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── .gitattributes
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js

Naming Conventions Used

Folders: kebab-case
Components: PascalCase
CSS files: PascalCase
CSS classes: kebab-case
Variables: camelCase
Boolean variables: is / has / should prefix
Routes: kebab-case


🌍 Internationalization
The project supports three languages using i18next and react-i18next:
LanguageCode🇬🇧 Englishen🇪🇸 Spanishes🇫🇷 Frenchfr
Translation files are located in public/locales/. The LocaleSwitcher component in the header allows users to switch language at any time. All content — navigation, exhibition cards, forum, legal pages and forms — is fully translated.

🔥 Firebase Integration
The community forum uses Firebase Realtime Database:

Messages load in real time on page load
Users can post new messages with their name and content
Users can delete any message in real time
Messages are displayed in reverse chronological order

Configuration is in src/components/foro/Firebase-setup.js.

🎨 UX / UI & Clean Code
User Experience

Sticky header with custom logo visible on all pages
Hamburger menu for smooth mobile navigation
Language switcher always accessible in the header
Consistent color palette and typography across all pages
Responsive design for mobile, tablet and desktop
Legal pages formatted with clear headings and readable text
Contact form with success feedback message

Clean Code Principles

Small and reusable components
DRY principle applied
Clear variable naming
Logical folder structure
Minimal but meaningful comments


🤝 Contributing
Contributions are welcome.
If you would like to improve this project:

Fork the repository
Create your Feature Branch
git checkout -b feature/AmazingFeature
Commit your changes
git commit -m 'Add AmazingFeature'
Push to the branch
git push origin feature/AmazingFeature
Open a Pull Request


📄 License
Distributed under the MIT License.

📬 Contact
Rita Alexia Marcè Acosta
GitHub: @alexiamarcee
Project Link: https://github.com/alexiamarcee/marcy-museum

🙏 Acknowledgments
Helpful resources:

Best README Template — README structure inspiration
React Documentation
React Router Documentation
Leaflet Documentation
React Leaflet Documentation
Firebase Documentation
i18next Documentation
react-i18next Documentation
MDN Flexbox Guide
React Icons
Figma Design Inspiration
Shields.io