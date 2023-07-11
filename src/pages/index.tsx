import { type NextPage } from "next";
import { useEffect, useState } from "react";
import { SignInButton, useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import Head from "next/head";
import Link from "next/link";
import RadarChart from "react-svg-radar-chart";
import "react-svg-radar-chart/build/css/index.css";

import { api } from "../utils/api";
import { Entries } from "../components/entries";
import Layout from "../components/layout";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const { user } = useUser(); // Fetch the user object from Clerk

  const [data, setData] = useState([
    {
      data: {
        health: 0.9,
        sleep: 0.2,
        food: 0.2,
        emotionalIntelligence: 0.6,
        personalDevelopment: 0.9,
        work: 0.2,
        relationships: 0.4,
        nature: 0.5,
        exercise: 0.2,
      },
      meta: { color: "blue" },
      date: new Date(),
    },
    {
      data: {
        health: 0.9,
        sleep: 0.2,
        food: 0.2,
        emotionalIntelligence: 0.6,
        personalDevelopment: 0.9,
        work: 0.2,
        relationships: 0.4,
        nature: 0.5,
        exercise: 0.2,
      },
      meta: { color: "red" },
      date: new Date(),
    },
  ]);

  const captions = {
    health: "Health",
    sleep: "Sleep",
    food: "Food",
    emotionalIntelligence: "Emotional intelligence",
    personalDevelopment: "Personal development",
    work: "Work",
    relationships: "Relationships",
    nature: "Nature",
    exercise: "Exercise",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate new random values for the data array
      const newData = data.map((item) => {
        const newDataItem = { ...item };
        for (const key in newDataItem.data) {
          newDataItem.data[key] = Math.random();
        }
        return newDataItem;
      });
      setData(newData);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [data]);

  return (
    <>
      <Head>
        <title>Wheel of Life</title>
        <meta name="Wheel of Life app" content="For tracking and reflecting" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#000000] to-[#000000]">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <RadarChart captions={captions} data={data} size={200} />
            {!user ? <SignInButton /> : null}
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Home;
