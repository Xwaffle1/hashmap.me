"use client";
import React, { useEffect, useRef, useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/components//prism-go";
import "prismjs/themes/prism-tomorrow.css"; // or any other theme you prefer
import Image from "next/image";

// const nodePre = useRef<HTMLPreElement>(null)

const axios = require("axios");

// var test = {firstName: "Chase", lastName: "Myers", "ID": 1, address: "123 Fake St. Apt 3"}

type Tabs = "nodejs" | "curl" | "go";

export default function Home() {
  const [apiToken, setApiToken] = React.useState("");
  const [error, setError] = React.useState("");
  const [inputText, setInputText] = React.useState("");
  const [activeTab, setActiveTab] = React.useState<Tabs>("nodejs");
  const [loading, setLoading] = React.useState(false);

  function createHashmap() {
    if (!inputText || inputText.trim().length === 0 || loading === true) {
      return;
    }

    setLoading(true);

    axios
      .post("/api/create", {
        hashmapName: inputText?.replace(" ", "-").replace(".", "-")
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
        setError("");
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        console.log(error.response.status);
        console.log(error.response.data.message);
        setApiToken("");
        setError(error.response.data.message);
        setLoading(false);
      });
  }

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8 md:px-6 lg:py-16">
      <div className="flex flex-row justify-center justify-items-center gap-0 mb-4">
        <div className="flex flex-col justify-center" style={{maxWidth: 64}}>
          <Image src="/favi.png" alt="Hashmap.me Logo" width={100} height={100} layout="fit" />
        </div>
        <h1 className="text-3xl font-bold tracking-tighter text-gray-900 dark:text-gray-100 my-8 mx-2">
          Hashmap.me
        </h1>
      </div>
      <div className="w-full max-w-md flex items-center space-x-2">
        <input
          // @ts-ignore
          onChange={(e) => setInputText(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-grow"
          placeholder="Hashmap name?"
        />
        <button
          onClick={() => {
            createHashmap();
          }}
          disabled={
            !inputText || inputText.trim().length === 0 || loading === true
          }
          className="inline-flex bg-black hover:text-black text-white items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-gray-300 h-10 px-4 py-2"
        >
          Generate
        </button>
      </div>
      {apiToken && (
        <div className="mt-8 p-4 bg-green-200 text-green-700 dark:bg-green-800 dark:text-green-300 rounded-md w-full max-w-xl">
          <p><span className="text-green-700 font-bold">Token: {" "}</span>{apiToken}</p>
        </div>
      )}
      {error && (
        <div className="mt-8 p-4 bg-red-200 text-red-700 dark:bg-red-800 dark:text-red-300 rounded-md w-full max-w-xl">
          <p>{error}</p>
        </div>
      )}
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
            <code className="block bg-gray-200  rounded p-2 text-sm">
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
            <code className="block bg-gray-200  rounded p-2 text-sm">
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
            <code className="block bg-gray-200  rounded p-2 text-sm">
              PUT https://hashmap.me/api/write
            </code>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Include the following in the request body:
            </p>
            <div className="bg-gray-200  rounded p-2">
              <p className="text-sm font-medium text-gray-900">
                Body Parameters:
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700 ">
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
      <section className="m-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Examples
        </h2>
        <div dir="ltr" data-orientation="horizontal" className="w-full">
          <div
            role="tablist"
            aria-orientation="horizontal"
            className="h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground grid w-full grid-cols-3 gap-4"
            tabIndex={0}
            data-orientation="horizontal"
            style={{ outline: "none" }}
          >
            <button
              type="button"
              role="tab"
              aria-selected="false"
              aria-controls="radix-:r8:-content-nodejs"
              data-state="active"
              id="radix-:r8:-trigger-nodejs"
              className={`inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 py-2 px-4 rounded-md transition-colors ${
                activeTab === "nodejs"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
              }`}
              tabIndex={-1}
              onClick={() => setActiveTab("nodejs")}
            >
              Node.js
            </button>
            <button
              type="button"
              role="tab"
              aria-selected="false"
              aria-controls="radix-:r8:-content-curl"
              data-state="inactive"
              id="radix-:r8:-trigger-curl"
              className={`inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 py-2 px-4 rounded-md transition-colors ${
                activeTab === "curl"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
              }`}
              tabIndex={-1}
              data-orientation="horizontal"
              data-radix-collection-item=""
              onClick={() => setActiveTab("curl")}
            >
              cURL
            </button>
            <button
              type="button"
              role="tab"
              aria-selected="true"
              aria-controls="radix-:r8:-content-go"
              data-state="inactive"
              id="radix-:r8:-trigger-go"
              className={`inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 py-2 px-4 rounded-md transition-colors ${
                activeTab === "go"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
              }`}
              tabIndex={0}
              data-orientation="horizontal"
              data-radix-collection-item=""
              onClick={() => setActiveTab("go")}
            >
              Go
            </button>
          </div>
          <div
            data-state="active"
            data-orientation="horizontal"
            role="tabpanel"
            aria-labelledby="radix-:r8:-trigger-nodejs"
            id="radix-:r8:-content-nodejs"
            tabIndex={0}
            className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            // style={}
            hidden={activeTab !== "nodejs"}
          >
            <pre className="block bg-gray-200 dark:bg-gray-800 rounded p-2 text-sm">
              <code data-language={"jsx"} className={`language-jsx`}>
                {`var myHeaders = new Headers();
myHeaders.append("x-api-key", "YOUR-API-KEY");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://hashmap.me/api/read", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));`}
              </code>
            </pre>
            {/* </code> */}
          </div>
          <div
            data-state="inactive"
            data-orientation="horizontal"
            role="tabpanel"
            aria-labelledby="radix-:r8:-trigger-curl"
            id="radix-:r8:-content-curl"
            tabIndex={1}
            className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            hidden={activeTab !== "curl"}
          >
            <pre className="block bg-gray-200 dark:bg-gray-800 rounded p-2 text-sm">
              <code data-language={"jsx"} className={`language-jsx`}>
                {`curl --location 'https://hashmap.me/api/read' \r
  --header 'x-api-key: YOUR-API-KEY'`}
              </code>
            </pre>
          </div>
          <div
            data-state="inactive"
            data-orientation="horizontal"
            role="tabpanel"
            aria-labelledby="radix-:r8:-trigger-go"
            id="radix-:r8:-content-go"
            tabIndex={2}
            className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            hidden={activeTab !== "go"}
          >
            <pre className="block bg-gray-200 dark:bg-gray-800 rounded p-2 text-sm">
              <code data-language={"go"} className={`language-go`}>
                {`package main

import (
  "fmt"
  "net/http"
  "io/ioutil"
)

func main() {

  url := "https://hashmap.me/api/read"
  method := "GET"

  client := &http.Client {
  }
  req, err := http.NewRequest(method, url, nil)

  if err != nil {
    fmt.Println(err)
    return
  }
  req.Header.Add("x-api-key", "YOUR-API-KEY")

  res, err := client.Do(req)
  if err != nil {
    fmt.Println(err)
    return
  }
  defer res.Body.Close()

  body, err := ioutil.ReadAll(res.Body)
  if err != nil {
    fmt.Println(err)
    return
  }
  fmt.Println(string(body))
}`}
              </code>
            </pre>
          </div>
        </div>
      </section>
    </main>
  );
}
