import React from 'react';
import Navigation from '../../Shared/Navigation';
import './About.css'; // Import your CSS file for styling

const About = () => {
  return (
    <div>
      <Navigation />
      <div className="about-container">
        <div className="about-content">
          <h1 className='text-bold'>Welcome to QuirkyBuy</h1>
          <p>
            Dear Customer, In 2022, the first item ever ordered on Souq was
            delivered to a customer in Dubai. In the years that followed, we
            have worked hard to continually enhance your shopping experience by
            adding millions of products, offering faster delivery, and
            consistently focusing on great value.
          </p>

          <p>
            There have been many milestones for Souq over the past 2 years, and
            today, we have another to share with you. We are proud to announce
            that we are now QuirkyBuy.
          </p>

          <p>
            QuirkyBuy brings together the best of Souq’s local know-how and
            Quirky's global retailing experience, and features over 30 million
            products, including those previously available on Souq and five
            million products from Quirky product. Customers shopping on
            QuirkyBuy will enjoy the same commitment to great prices as on Souq,
            fast and reliable delivery, and a range of convenient payment
            options. For the first time ever at QuirkyBuy, customers will have
            the option of shopping in Arabic on both the QuirkyBuy App and the
            website.
          </p>

          <p>
            Our team in the region has grown to over 3,600 people, and each and
            every one of us is thrilled to invite you to join us on this
            journey. We consider this day one and will continue to innovate on
            your behalf with the addition of many new services and product
            offerings in the future, making it easier and faster to receive
            your orders.
          </p>

          <p>We look forward to serving you as QuirkyBuy. Thank you for being our customer.</p>

          <p>Ronalda Mouchawar Co-Founder of Souq, Vice President of QuirkyBuy.</p>

          <div className="mission-container">
            <h2>Our Mission</h2>
            <p>
              We aim to be Earth’s most customer-centric company. Our mission is
              to continually raise the bar of the customer experience by using
              the internet and technology to help consumers find, discover and
              buy anything, and empower businesses and content creators to
              maximize their success.
            </p>
          </div>

          <div className="principles-container">
            <h2>Our Leadership Principles</h2>
            <p>
              Our Leadership Principles aren't just a pretty inspirational wall
              hanging. These Principles work hard, just like we do. Quirkyians
              use them every day, whether they're discussing ideas for new
              projects, deciding on the best solution for a customer's problem,
              or interviewing candidates. It's just one of the things that makes
              QuirkyBuy peculiar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
