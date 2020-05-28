import React from "react";
import { Header } from "../components/headers/header-component";
import { Banner } from "../components/banners/banner-component";

export function Home() {
  return (
    <>
      <Header mb="50%" />
      <Banner />
    </>
  );
}
