"use client";
import React from 'react';
import NameTag from "./nametag";
import Header from '../header';
import Footer from '../footer';

const Page: React.FC = () => {

  return (
    <div className="bg-white w-screen h-screen">
      <div className="flex w-full justify-between">
        <Header />
      </div>

      <NameTag />

      <Footer />
    </div>
  );
};

export default Page;
