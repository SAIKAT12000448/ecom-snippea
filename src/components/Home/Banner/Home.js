import React from 'react';
import Navigation from '../../Shared/Navigation';
import BannerHome from './BannerHome';
import ElectronicsItem from '../Category/ElectronicsItem';
import Fashions from '../Category/Fashions';
import MobileAccessories from '../Category/MobileAccessories';
import Footer from '../../Shared/Footer/Footer';
import Menubar from '../MenuBar/Menubar';
import TopDeals from '../TopItem/TopDeals';
import TopRated from '../TopItem/TopRated';
import Searchbar from '../../Shared/Searchbar';
import DownloadBanner from './DownloadBanner';

const Home = () => {
    return (
        <div>
                <Navigation></Navigation>
                <Searchbar></Searchbar>
                <BannerHome></BannerHome>
                <Menubar></Menubar>
                <TopDeals></TopDeals>
                <TopRated></TopRated>
                <BannerHome></BannerHome>
                <ElectronicsItem></ElectronicsItem>
                <Fashions></Fashions>
                <MobileAccessories></MobileAccessories>
                <DownloadBanner></DownloadBanner>
                <Footer></Footer>
        </div>
    );
};

export default Home;