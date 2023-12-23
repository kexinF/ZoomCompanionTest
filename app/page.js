"use client";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import React from 'react';
import zoomSdk from "@zoom/appssdk";
import NameTag from "./nametag"
import Header from './header';
import Footer from './footer';


export default function Home() {
  async function configureSdk() {
    try {
      const configResponse = await zoomSdk.config({
        capabilities: [
          "setVirtualForeground",
          "removeVirtualForeground"
        ],
        version: "0.16.0",
      });
      console.log("App configured", configResponse);
      const userContext = await zoomSdk.invoke("getUserContext");
    } catch (error) {
      console.log('zoom sdk not loaded')
    }
  }

  useEffect(() => {
    configureSdk();
  }, []);

  return (

    <div className="bg-white w-screen h-screen">
      <div className="flex w-full justify-between">

          <Header />

      </div>

      <NameTag />
      
    <Footer />

    </div>

  );
}
