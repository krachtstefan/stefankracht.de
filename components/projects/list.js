export default () => {
  return (
    <div className="project-list">
      <div>
        <img
          src={require('./../../assets/images/projects/raceday-me/raceday-me-logo.svg')}
          width="90%"
        />

        <h1>Personalized race day live tracking for runners</h1>
        <img
          sizes="100vw"
          src={require('./../../assets/images/projects/raceday-me/raceday-me-screen-600.png')}
          srcSet={`
            ${require('./../../assets/images/projects/raceday-me/raceday-me-screen-600.png')} 600w, 
            ${require('./../../assets/images/projects/raceday-me/raceday-me-screen-1000.png')} 1000w,
            ${require('./../../assets/images/projects/raceday-me/raceday-me-screen-1800.png')} 1800w`}
          alt=""
        />
        <p>
          <a href="https://raceday.me" target="_blank">
            Raceday.me
          </a>{' '}
          is the world's first personalized race day live tracking that
          considers your very own time goal and calculates progression and
          predictions while you're running and lets your friend watch your
          progress.
        </p>
      </div>
      <div>
        <img
          src={require('./../../assets/images/projects/runverter-io/runverter-io-logo.svg')}
          width="90%"
        />
        <h1>A minimal and powerful calculator for runners</h1>
        <img
          sizes="100vw"
          src={require('./../../assets/images/projects/runverter-io/runverter-io-screen-600.png')}
          srcSet={`
            ${require('./../../assets/images/projects/runverter-io/runverter-io-screen-600.png')} 600w, 
            ${require('./../../assets/images/projects/runverter-io/runverter-io-screen-1000.png')} 1000w,
            ${require('./../../assets/images/projects/runverter-io/runverter-io-screen-1800.png')} 1800w`}
          alt=""
        />
        <p>
          I like running and playing with data and numbers but I was never
          satisfied with the state of running calculators out there. So I
          decided to build my own state of the art swiss army knife for runners.{' '}
          <a href="https://runverter.io" target="_blank">
            Runverter.io
          </a>{' '}
          was born.
        </p>
      </div>
      <div>
        <img
          src={require('./../../assets/images/projects/stickerlicious/stickerlicious-logo.svg')}
          width="80%"
        />
        <h1>Pixel MacBook sticker</h1>
        <img
          sizes="100vw"
          src={require('./../../assets/images/projects/stickerlicious/stickerlicious-screen-600.png')}
          srcSet={`
            ${require('./../../assets/images/projects/stickerlicious/stickerlicious-screen-600.png')} 600w, 
            ${require('./../../assets/images/projects/stickerlicious/stickerlicious-screen-1000.png')} 1000w,
            ${require('./../../assets/images/projects/stickerlicious/stickerlicious-screen-1800.png')} 1800w`}
          alt=""
        />
        <p>
          Stickerlicious was a small online shop for pixel style MacBook
          stickers. The minimalistic stickers are designed to cover the apple
          logo and change the light to a completely new - and mostly pretty
          nerdy - shape. It just got started out of curiosity and ended up in a
          pretty nice project with loads of kind feedback. I shut down this shop
          early 2019 because of the lack of glowing apples on macbooks but all
          the desings have always been{' '}
          <a href="https://github.com/krachtstefan/stickerlicious-templates">
            available at github
          </a>
          .
        </p>
      </div>
      <div>
        <img
          src={require('./../../assets/images/projects/skycheck/skycheck-logo.svg')}
          width="80%"
        />
        <h1>Finding flights. Simple.</h1>
        <img
          sizes="100vw"
          src={require('./../../assets/images/projects/skycheck/skycheck-screen-600.png')}
          srcSet={`
            ${require('./../../assets/images/projects/skycheck/skycheck-screen-600.png')} 600w, 
            ${require('./../../assets/images/projects/skycheck/skycheck-screen-1000.png')} 1000w,
            ${require('./../../assets/images/projects/skycheck/skycheck-screen-1800.png')} 1800w`}
          alt=""
        />
        <p>
          Skycheck.com was the awesome startup I've been working at since the
          last couple of years. I had the great chance to join the development
          team in the early days and be a part of a growing and exciting
          project. SKYCHECK aims to provide the easiest way to find the best
          flights out there in the cluttered internet and also acts as a flight
          search technology provider for large travel websites.
        </p>
      </div>
    </div>
  );
};
