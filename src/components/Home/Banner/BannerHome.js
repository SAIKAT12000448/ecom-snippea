
import banner1 from '../../../images/slideshow/banner1.jpg';
import banner2 from '../../../images/slideshow/banner2.jpg';
import banner3 from '../../../images/slideshow/banner3.jpg';
import banner4 from '../../../images/slideshow/banner4.jpg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './BannerHome.css'

const BannerHome = () => {
    const settings = {
        autoplay: true, 
        autoplaySpeed: 5000, 
        dots: true, 
        infinite: true, 
        speed: 1000, 
        slidesToShow: 1,
        slidesToScroll: 1, 
        adaptiveHeight: true
      };
  
    return (
        <div style={{width:"100%"}}>
        <Slider {...settings}>
          <div>
            <img  style={{  maxHeight:"35rem" , width:'100%'}} src={banner1} className="w-full   object-cover" alt="" />
          </div>
          <div>
            <img  style={{  maxHeight:"35rem", width: '100%'}} src={banner2} className="w-full  object-cover" alt="" />
          </div>
          <div>
            <img  style={{  maxHeight:"35rem", width: '100%'}} src={banner3} className="w-full  object-cover" alt="" />
          </div>
          <div>
            <img  style={{  maxHeight:"35rem", width: '100%'}} src={banner4} className="w-full  object-cover" alt="" />
          </div>
          {/* Add more slides as needed */}
        </Slider>
        </div>
    );
};

export default BannerHome;