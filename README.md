<div align="center">

# 🎨 Marcy Museum
### Contemporary Art Museum Website

A modern and responsive React application representing the official website of a contemporary art museum.

Explore the project »

</div>

---

## 📚 Table of Contents

- [About The Project](#about-the-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Project Structure](#project-structure)
- [UX / UI & Clean Code](#ux--ui--clean-code)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

---

## 🏛 About The Project

**Marcy Museum** is a modern, responsive web application built with React that showcases contemporary art exhibitions. The project demonstrates best practices in frontend development, including responsive design, clean code architecture, and accessibility standards.

The website includes:

- A dynamic Home page displaying featured exhibitions from a JSON array
- An Exhibitions page with detailed content
- A Visit page with location map and contact information
- Reusable Header and Footer components
- Responsive design using Flexbox and media queries
- Integration of third-party libraries

### Why this project?

- To apply React fundamentals in a real-world scenario
- To practice reusable component architecture
- To follow clean code and naming conventions
- To implement responsive and user-friendly design

---

## 🚀 Built With

Main technologies used in this project:

- React
- Vite
- React Router DOM
- Leaflet
- React Leaflet
- CSS3 (Flexbox & Media Queries)

---

## ⚙ Getting Started

To get a local copy up and running, follow these steps.

---

### 📌 Prerequisites

You need:

- Node.js installed
- npm (comes with Node)

Check your npm version:

npm install npm@latest -g

---

### 💻 Installation

1. Clone the repository:

git clone https://github.com/your_username/marcy-museum.git

2. Navigate to the project folder:

cd marcy-museum

3. Install dependencies:

npm install

4. Start development server:

npm run dev

The application will run at:

http://localhost:5173
http://localhost:5173/home

---

## 🖥 Usage

Marcy Museum allows users to:

- Explore featured exhibitions dynamically rendered from a JSON array
- Navigate between different sections using React Router
- View museum location via interactive map (Leaflet integration)
- Access contact information and opening hours

This project demonstrates:

- Component reusability
- Props usage
- Clean folder structure
- Responsive layout
- Third-party library integration

---

## 🗺 Roadmap

- Add ticket booking functionality
- Add exhibition detail pages
- Implement multi-language support
- Improve animations and transitions
- Deploy project online

See the repository issues for future improvements.

---

## 📂 Project Structure

marcy-museum/
├── public/               # Static assets
│   ├── logo.png
│   └── favicon.ico
├── src/
│   ├── assets/          # Images and media files
│   │   └── photos/
│   ├── components/      # Reusable components
│   │   ├── header/
│   │   │   ├── Header.jsx
│   │   │   └── Header.css
│   │   ├── footer/
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.css
│   │   └── exhibition-card/
│   │       ├── ExhibitionCard.jsx
│   │       └── ExhibitionCard.css
│   ├── pages/           # Page components
│   │   ├── home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.css
│   │   ├── exhibitions/
│   │   │   ├── Exhibitions.jsx
│   │   │   └── Exhibitions.css
│   │   ├── visit/
│   │   │   ├── Visit.jsx
│   │   │   └── Visit.css
│   │   └── policy/
│   │       ├── PrivacyPolicy.jsx
│   │       ├── CookiesPolicy.jsx
│   │       ├── Terms.jsx
│   │       └── Contact.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── package.json
├── vite.config.js
└── README.md

### Naming Conventions Used

- Folders: kebab-case
- Components: PascalCase
- CSS files: PascalCase
- CSS classes: kebab-case
- Variables: camelCase
- Boolean variables: is / has / should prefix
- Routes: kebab-case

---

## 🎨 UX / UI & Clean Code

### User Experience

- Clear navigation structure
- Consistent visual hierarchy
- Responsive design for mobile, tablet and desktop
- Accessible layout and readable typography

### Clean Code Principles

- Small and reusable components
- DRY principle applied
- Clear variable naming
- Logical folder structure
- Minimal but meaningful comments

---

## 🤝 Contributing

Contributions are welcome.

If you would like to improve this project:

1. Fork the repository
2. Create your Feature Branch  
   `git checkout -b feature/AmazingFeature`
3. Commit your changes  
   `git commit -m 'Add AmazingFeature'`
4. Push to the branch  
   `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License.

---

## 📬 Contact

Rita Alexia Marcè Acosta
GitHub: https://github.com/alexiamarcee

---

## 🙏 Acknowledgments

Helpful resources:

- Best README Template inspiration
- React Documentation
- React Router Documentation
- Leaflet Documentation
- Figma Design Inspiration
- Shopify Image Optimization Guide
- Flexbox Cheatsheet
- React Icons