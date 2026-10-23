
function About() {
  const features = [
    {
     
      title: "Quality Ingredients",
      description: "We source the best ingredients for authentic taste.",
    },
    {
      
      title: "Wide Variety",
      description: "Explore dishes from different cuisines.",
    },
    {
      
      title: "Fast & Reliable Delivery",
      description: "Get your favorite meals delivered quickly.",
    },
    {
     
      title: "Secure & Simple Payment",
      description: "Your transactions are safe with us.",
    },
  ];

  return (
    <section className="about-page">
      <div className="about-hero">
        <div className="about-header">
          <div className="about-main"></div>

          <div>
            <h1>About ShopKart</h1>
            <p>Good food brings people together</p>
          </div>
        </div>

        <div className="about-story-card">
          <h2>Our Story</h2>

          <p className="about-story-text">
            ShopKart Foods is a modern food e-commerce platform
            built with a passion for great food and seamless online
            shopping. We bring you a wide variety of delicious meals
            from different cuisines, right to your doorstep.
          </p>

          <div className="about-features">
            {features.map((feature, index) => (
              <div className="about-feature" key={index}>
                <div className={`about-feature-icon icon-${index}`}>
                  {feature.icon}
                </div>

                <div className="about-feature-text">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
