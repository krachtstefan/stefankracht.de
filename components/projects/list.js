const ProjectList = () => {
  return (
    <div className="project-list">
      <a>
        <img
          src={require('./../../assets/images/projects/raceday-me-logo.svg')}
          width="90%"
        />
        <h1>Personalized race day livetracking for runners</h1>
      </a>
      <a>
        <img
          src={require('./../../assets/images/projects/runverter-io-logo.svg')}
          width="90%"
        />
        <h1>A minimal and powerful calculator for runners</h1>
      </a>
    </div>
  );
};

export default ProjectList;
