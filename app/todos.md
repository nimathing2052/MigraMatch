# MigraMatch App - Running & Deployment Guide

Welcome to the MigraDate App, a Tinder-style job-matching platform designed to connect international talent with German employers. This app leverages a swipe-based interface to simplify the job search process for immigrants while addressing bureaucratic challenges and talent shortages. This README provides a guide to running the app locally and deploying it online.

## Overview

MigraDate is an innovative application built to facilitate human-centered job matching. Users can swipe through job opportunities, with the app animating card interactions and providing a seamless experience. The app is ideal for developers, entrepreneurs, and policy enthusiasts looking to explore or deploy a scalable solution.

## Prerequisites

Before running or deploying the app, ensure you have the following installed:
*   **Node.js** (version 14 or newer)
*   **npm** (included with Node.js installation)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/migramatch.git
cd migramatch
```

### 2. Install Dependencies
Navigate to the `app` directory and install the required packages:

```cd app
npm install
```

### Running Locally
Follow these steps to run the app on your local machine:

### Navigate to the App Directory:

```
cd app
```

### Start the Development Server

```
npm start
```

### View the App:
The app will automatically open in your default browser at `http://localhost:3000`. Alternatively, manually navigate to this URL.

### Using the App:
* Swipe right (or click the heart) to indicate interest in a job.
* Swipe left (or click the X) to pass on a job.
* Cards animate with each interaction.
* Once all cards are reviewed and you find your "MATCH" restart the cycle to begin again.

#### Usage
**Local Development:** Use npm start to test features like swipe animations and card cycling.
**Deployed App:** Share the deployed URL with users or investors to demonstrate the swipe-based job-matching experience.
**Customization:** Modify the app’s job data or UI in the app directory’s source code to align with MigraMatch’s branding or specific job listings.

# MigraMatch

MigraMatch is a project aimed at connecting global talent with opportunities in Germany.

## Contributing

We welcome contributions to improve MigraDate! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m "Add new feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request on GitHub.

Please adhere to the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/).

## Support

For additional support or questions:

- Open an issue on the [GitHub repository](https://github.com/your/repo/issues).
- Contact the development team via email at [nimathing2052@gmail.com](mailto:nimathing2052@gmail.com).

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). See the `LICENSE` file for details.

## Acknowledgments

- Inspired by the MigraMatch vision to connect global talent with German opportunities.
- Built with the help of the open-source community and tools like [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/).
- Teamed with Johannes Müller and Nima Thing from Hertie School for the course - "Entreprenuership, Tech and Policy" 
