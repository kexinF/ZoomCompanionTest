"use client";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import React from 'react';
import zoomSdk from "@zoom/appssdk";
import NameTag from "./nametag";
import Header from '../header';
import Footer from '../footer';
import { affirmations, hands } from '../state';


const Page: React.FC = () => {
  async function configureSdk() {
    try {
      const configResponse = await zoomSdk.config({
        capabilities: [
          "setVirtualForeground",
          "removeVirtualForeground"
        ],
        version: "0.16.0",
      });
      const userContext = await zoomSdk.invoke("getUserContext");
    } catch (e) {
      console.log('zoom sdk not loaded: ' + e);
    }
  }

  configureSdk();

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
