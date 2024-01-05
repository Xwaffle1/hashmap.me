import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useState } from "react";

const axios = require("axios");

// var test = {firstName: "Chase", lastName: "Myers", "ID": 1, address: "123 Fake St. Apt 3"}

export default function Home() {
  const [apiToken, setApiToken] = React.useState("");

  function createHashmap(e) {
    e.preventDefault();

    axios
      .post("/api/create", {
        hashmapName: e.target.hashmapName.value,
      })
      .then((res) => {
        // console.log(`statusCode: ${res.statusCode}`)
        console.log(res);
        if (res.status == 200) {
          setApiToken(res.data.token);
          console.log("API TOKEN: " + apiToken);
        } else {
          setApiToken("");
        }
      })
      .catch((error) => {
        console.error(error);
        console.log(error.response.status);
        console.log(error.response.data.message);
        setApiToken(error.response.data.message);
      });
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8 md:px-6 lg:py-16">
      <h1 className="text-3xl font-bold tracking-tighter text-gray-900 dark:text-gray-100 m-8">
        Hashmap.me
      </h1>
      <div className="w-full max-w-md flex items-center space-x-2">
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-grow"
          placeholder="Hashmap name?"
        />
        <button className="inline-flex bg-black hover:text-black text-white items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-gray-300 h-10 px-4 py-2">
          Generate
        </button>
      </div>
      <div className="m-8 p-4 bg-yellow-200 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300 rounded-md w-full max-w-xl">
        <p>
          Be aware, once a token is generated, it{" "}
          <b>cannot be retrieved again</b>. Make sure to write down your token
          to access your hashmap. If you lose it, you'll need to generate a new
          one.
        </p>
      </div>
      <section className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          What is Hashmap.me?
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Hashmap.me is a streamlined service that lets you easily store and
          access your data records through HTTP, each linked to its own MongoDB
          collection, without the complexity of setting up a database.
        </p>
        <h2 className="text-2xl font-bold my-4 text-gray-900 dark:text-gray-100">
          Documentation
        </h2>
        <div className="space-y-8">
          {/* <!-- API Key Header Section --> */}
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              API Key Header
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              For all requests, include the following header with your Hashmap
              token:
            </p>
            <code className="block bg-gray-200 dark:bg-gray-800 rounded p-2 text-sm">
              x-api-key: [Your Hashmap Token]
            </code>
          </div>

          {/* <!-- Read Functionality Section --> */}
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Read Functionality
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              To retrieve all hashmap entry sets, perform a GET request to:
            </p>
            <code className="block bg-gray-200 dark:bg-gray-800 rounded p-2 text-sm">
              GET https://hashmap.me/api/read
            </code>
          </div>

          {/* <!-- Write Functionality Section --> */}
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Write Functionality
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              To insert or update an entry set, perform a PUT request to:
            </p>
            <code className="block bg-gray-200 dark:bg-gray-800 rounded p-2 text-sm">
              PUT https://hashmap.me/api/write
            </code>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Include the following in the request body:
            </p>
            <div className="bg-gray-200 dark:bg-gray-800 rounded p-2">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Body Parameters:
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
                <li>
                  <strong>KEY</strong>: Unique identifier for the value being
                  stored.
                </li>
                <li>
                  <strong>VALUE</strong>: The data to be stored in the hashmap.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
