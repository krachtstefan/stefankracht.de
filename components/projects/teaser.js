export default () => {
  return (
    <div className="project-teaser-list">
      <a href="https://raceday.me" target="_blank">
        <img
          src={require('./../../assets/images/projects/raceday-me/raceday-me-logo.svg')}
          width="90%"
        />
        <h1>Personalized race day live tracking for runners</h1>
      </a>
      <a href="https://runverter.io" target="_blank">
        <img
          src={require('./../../assets/images/projects/runverter-io/runverter-io-logo.svg')}
          width="90%"
        />
        <h1>A minimal and powerful calculator for runners</h1>
      </a>
    </div>
  );
};
