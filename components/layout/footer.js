export default () => (
  <footer>
    <p>
      You can find me on{' '}
      <a
        href="https://twitter.com/stefan_kracht"
        target="_blank"
        className="twitter"
      >
        Twitter
      </a>
      ,{' '}
      <a
        href="https://www.strava.com/athletes/3952530"
        target="_blank"
        className="strava"
      >
        Strava
      </a>
      ,{' '}
      <a
        href="https://www.instagram.com/stefan_kracht/"
        target="_blank"
        className="instagram"
      >
        Instagram
      </a>{' '}
      and{' '}
      <a
        href="https://github.com/krachtstefan"
        target="_blank"
        className="github"
      >
        Github
      </a>
    </p>
    <img
      id="me"
      src={require('./../../assets/images/stefan-kracht-pixelart.png')}
    />
  </footer>
);
