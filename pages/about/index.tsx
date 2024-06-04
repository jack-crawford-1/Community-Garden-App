'use client'

import Link from 'next/link'

function AboutPage() {
  const openExternalLink = () => {
    window.open('https://jackcrawford.co.nz', '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6 md:p-10">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 w-full md:w-2/3">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Community Gardens App
        </h1>
        <h2 className="text-2xl font-semibold mb-2">Project Overview</h2>
        <p className="mb-4">
          The Community Gardens App is designed to help users locate and add
          community garden sites. Users can click on the map to add new garden
          sites or click on existing markers to view details about the gardens.
          The app leverages various modern web technologies to provide a
          seamless and interactive user experience.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Plan</h2>
        <p className="mb-4">
          The plan for the Community Gardens App includes the following steps:
        </p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>
            Develop a user-friendly interface for interacting with the map.
          </li>
          <li>
            Implement authentication to allow users to add and manage garden
            sites.
          </li>
          <li>Integrate with Google Maps API for map functionalities.</li>
          <li>Use Prisma and SQLite for database management.</li>
          <li>
            Deploy the application using Next.js for server-side rendering.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold mb-2">Barriers</h2>
        <p className="mb-4">
          Some of the barriers encountered during the development of the
          Community Gardens App include:
        </p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>
            Handling asynchronous data fetching and state management in React.
          </li>
          <li>Ensuring responsive design across different devices.</li>
          <li>Managing authentication and user sessions securely.</li>
          <li>
            Integrating various APIs and ensuring smooth interaction between
            them.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold mb-2">Learnings</h2>
        <p className="mb-4">
          Throughout the development of the Community Gardens App, several key
          learnings were achieved:
        </p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>
            Effective use of React hooks for state and side-effect management.
          </li>
          <li>Importance of responsive design and mobile-first approach.</li>
          <li>
            Best practices for integrating third-party APIs like Google Maps.
          </li>
          <li>Handling authentication and authorization in a secure manner.</li>
        </ul>
        <h2 className="text-2xl font-semibold mb-2">Technology</h2>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>
            Next.js: Used for building the server-side rendered application.
          </li>
          <li>React: Used for building the user interface components.</li>
          <li>Prisma: Used as an ORM to interact with the database.</li>
          <li>
            SQLite: Used as the database for storing garden site information.
          </li>
          <li>NextAuth: Used for authentication and managing user sessions.</li>
          <li>Tailwind CSS: Used for styling the application.</li>
          <li>
            Google Maps API: Used for map functionalities and displaying
            markers.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold mb-2">Future</h2>
        <p className="mb-4">
          Future plans for the Community Gardens App include:
        </p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>
            Adding more detailed information and images for each garden site.
          </li>
          <li>Implementing user reviews and ratings for garden sites.</li>
          <li>
            Enhancing the search functionality to filter garden sites based on
            various criteria.
          </li>
          <li>Expanding the app to support multiple languages.</li>
          <li>
            Integrating social media sharing features to promote community
            gardens.
          </li>
        </ul>
      </div>
      <Link href="/">
        <div className="text-blue-500 hover:underline">Back to Garden App</div>
      </Link>
      <div
        onClick={openExternalLink}
        className="text-blue-500 hover:underline mt-4 cursor-pointer"
      >
        Back to Landing Site
      </div>
    </div>
  )
}

export default AboutPage
