import React from 'react';
import Header from '../header';
import Footer from '../footer';

function Home() {
  return (
    <div className="bg-white w-screen h-screen">
      <div className="flex w-full justify-between">
        <Header title={'test'} />
      </div>

    <Footer />

    </div>
  );
}

export default Home;
