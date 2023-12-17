"use client";
import { createContext, useEffect, useState } from "react";
import React from 'react';
import Header from '../header';
import Footer from '../footer';


function Home() {


  const handleTitleChange = () => {
    const currentTime = new Date();

    const formattedTime = currentTime.toLocaleTimeString();

    localStorage.setItem('title', formattedTime);
    window.location.reload();
  };


  return (

    <div className="bg-white w-screen h-screen">
      <div className="flex w-full justify-between">

          <Header />

      </div>
      <button onClick={handleTitleChange}>Change Title to current time</button>

      
    <Footer />

    </div>

  );
}

export default Home;
