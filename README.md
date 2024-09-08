# E-Commerce Platform - Frontend (Next.js)

## Overview

This repository contains the frontend application for an e-commerce platform, built using **Next.js**. The application provides a user-friendly interface for browsing products, managing the shopping cart, viewing and updating the wishlist, and tracking orders. It communicates with a backend API to handle data management and user authentication.

## Features

- **Product Listings**: Display and filter products by categories, subcategories, and various attributes.
- **Search Functionality**: Search for products using keywords.
- **Wishlist**: Add or remove products from the wishlist.
- **Cart Management**: Add, update, or remove products from the cart.
- **Order Tracking**: View order details and download invoices.
- **Authentication**: User sign-up, login, and logout functionalities.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Animation**: Smooth scroll animations using AOS.
- **SEO Optimization**: Proper meta tags, Open Graph, and Twitter cards for enhanced search engine visibility and social sharing.

## Tech Stack

- **Next.js**: React framework for server-side rendering and static site generation.
- **React**: UI library for building user interfaces.
- **Axios**: HTTP client for making API requests.
- **Styled Components**: For component-level styling (or use CSS/SCSS as applicable).
- **Toast Notifications**: For user feedback and alerts.
- **AOS**: Animate On Scroll library for adding animations to elements on scroll.

## Prerequisites

Ensure you have the following installed on your local machine:

- **Node.js** (v16 or later)
- **npm**

Access to the backend API is also required for full functionality.

## Getting Started

### Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/dhrumesh7/ecommerce-nextjs
cd ecommerce-nextjs
```

### Install Dependencies

After cloning the repository, install the necessary dependencies by running:

```bash
npm install
```

### Environment Variables

Add environment variables in the next.config.js


### Running the Development Server

To run the development server, use the following command:

```bash
npm run dev
```
Open http://localhost:3000 in your browser to view the application.


### Building for Production

To create an optimized production build, use the command:

```bash
npm run build
```

Then, to start the server:

```bash
npm run start
```

This will serve the production-ready version of the application.

