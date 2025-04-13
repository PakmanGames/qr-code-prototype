# 2PX3 Sprint 3 Team 5 Low Fidelity Prototype
This is the prototype to our solution to reduce operational costs for hospitals.  
We created a QR Code hybrid-check-in system for patients rushing to the ER at hospitals.

## Technologies Used

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### Libraries
![QRCode.react](https://img.shields.io/badge/QRCode.react-000000?style=for-the-badge&logo=qrcode&logoColor=white)
![HTML5-QRCode](https://img.shields.io/badge/HTML5_QRCode-000000?style=for-the-badge&logo=qrcode&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=react-hook-form&logoColor=white)

### Development Tools
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)

## Current Features
- **Patient Pre-registration Form**
  - Collects essential patient information including name, date of birth, and health card number
  - Allows patients to describe their symptoms and rate severity
  - Modern, user-friendly interface with responsive design
  - Confirmation modal to review information before submission

- **QR Code Generation**
  - Automatically generates a unique QR code containing patient information
  - QR code can be saved to device (PNG format)
  - Displays patient information alongside the QR code
  - Option to update information at any time

- **QR Code Scanner**
  - Real-time camera scanning for patient QR codes
  - Instant display of patient information upon successful scan
  - Mobile-responsive design
  - Option to scan multiple patients

- **Modern Hospital Theme**
  - Clean, professional design with blue and white color scheme
  - Consistent styling across all pages
  - Responsive layout for all device sizes
  - Intuitive navigation with visual icons

### Planned Features
- [ ] Multilingual Support
- [ ] Voice-guided input
- [ ] AI Agent to support symptom diagnosis
- [ ] AI Powered smart routing for nearby hospitals

## Prototype Evolution

##### Initial Prototype
![Initial Prototype](/public/images/prototype1.png)
- Basic form layout with essential patient information fields
- Simple, functional design focusing on core features
- Basic validation and error handling

##### Second Iteration
![Second Iteration](/public/images/prototype2.png)
- Enhanced UI with improved form layout
- Added confirmation modal for information review
- Improved validation and user feedback
- Better visual hierarchy and spacing

##### Current Version
![Current Version](/public/images/prototype3.png)
- Modern hospital theme with blue and white color scheme
- Responsive design for all device sizes
- Enhanced QR code generation and scanning
- Improved user experience with visual feedback
- Consistent styling across all pages

### Deployed on Vercel
Open [https://hospital-qr-code-system.vercel.app/](https://hospital-qr-code-system.vercel.app/) to try the app for yourself.

### Running the project

```bash
npm install

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
