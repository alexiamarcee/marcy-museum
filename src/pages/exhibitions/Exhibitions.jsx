import ExhibitionCard from "../../components/exhibition-card/ExhibitionCard";
import "./Exhibitions.css";

// Extended exhibition data
const allExhibitions = [
    {
      id: 1,
      title: "Silly Cat",
      artist: "Karen",
      description: "Silliest of them all.",
      image: silly
    },
    {
      id: 2,
      title: "Duck with a hat",
      artist: "Daniel",
      description: "All hat and no cattle.",
      image: duck
    },
    {
      id: 3,
      title: "Hungry dog",
      artist: "Alex",
      description: "Fattie dof spotted.",
      image: dog
    }
  ];

    function Exhibitions() {
  return (
    <div className="exhibitions-page">
      
      {/* Page Header */}
      <section className="exhibitions-header">
        <div className="header-content">
          <h1 className="page-title">Our Exhibitions</h1>
          <p className="page-description">
            Discover our diverse collection of contemporary artworks from talented artists around the world. 
            Each exhibition offers a unique perspective and invites you to explore new dimensions of creativity.
          </p>
        </div>
      </section>

      {/* Exhibitions Grid */}
      <section className="exhibitions-content">
        <div className="exhibitions-container">
          <div className="exhibitions-grid">
            {allExhibitions.map((exhibition) => (
              <ExhibitionCard
                key={exhibition.id}
                title={exhibition.title}
                artist={exhibition.artist}
                description={exhibition.description}
                image={exhibition.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="exhibitions-cta">
        <div className="cta-content">
          <h2>Plan Your Visit</h2>
          <p>
            Experience these exhibitions in person at Marcy Museum. 
            Open Tuesday through Sunday, 10:00 AM - 7:00 PM.
          </p>
          <a href="/visit" className="cta-button">
            Visit Information
          </a>
        </div>
      </section>

    </div>
  );
}

export default Exhibitions;