const Teaser = () => (
  <div className="project-teaser-list">
    <a href="https://raceday.me" target="_blank" rel="noopener">
      <img
        src={require('./../../assets/images/projects/raceday-me/raceday-me-logo.svg')}
        width="90%"
        alt="raceday.me logo"
      />
      <h1>Personalized race day live tracking for runners</h1>
    </a>
    <a href="https://runverter.io" target="_blank" rel="noopener">
      <img
        src={require('./../../assets/images/projects/runverter-io/runverter-io-logo.svg')}
        width="90%"
        alt="runverter.io logo"
      />
      <h1>A minimal and powerful calculator for runners</h1>
    </a>
  </div>
);

export default Teaser;
