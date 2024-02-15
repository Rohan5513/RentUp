import React from 'react';
import Banner from '../components/Banner';
import HouseList from '../components/HouseList'
import Pricing from '../components/Pricing';
import PropertyCarousel from '../components/PropertyCarousel';

const Home = () => {
  return <div className='min-h-[1800px]'>
  <Banner/>
  {/* <HouseList/> */}
  <PropertyCarousel/>
  <Pricing/>
  </div>;
};

export default Home;
