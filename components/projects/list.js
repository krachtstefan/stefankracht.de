import Link from 'next/link';
import { config } from './../../config';
import { findPostbyId } from './../../lib/blog';
let racedayArticle = findPostbyId(12);
let runverterArticle = findPostbyId(7);

const List = () => {
  return (
    <div className="project-list">
      <div>
        <img
          src={require('./../../assets/images/projects/raceday-me/raceday-me-logo.svg')}
          width="90%"
          alt="raceday.me logo"
        />

        <h1>Personalized race day live tracking for runners</h1>
        <img
          sizes="100vw"
          src={require('./../../assets/images/projects/raceday-me/raceday-me-screen-600.png')}
          srcSet={`
            ${require('./../../assets/images/projects/raceday-me/raceday-me-screen-600.png')} 600w, 
            ${require('./../../assets/images/projects/raceday-me/raceday-me-screen-1000.png')} 1000w,
            ${require('./../../assets/images/projects/raceday-me/raceday-me-screen-1800.png')} 1800w`}
          alt="screenshot of the racerday.me website that shows a demo of a marathon live tracking"
        />
        <p>
          <a href="https://raceday.me" target="_blank" rel="noopener">
            Raceday.me
          </a>{' '}
          is my biggest side project so far. It's{' '}
          <Link
            as={config.routing.blogPost.nextLink.as(racedayArticle.url)}
            href={config.routing.blogPost.nextLink.href(racedayArticle.url)}
          >
            <a>the world's first personalized race day live tracking</a>
          </Link>{' '}
          that considers your very own time goal and calculates progression and
          predictions while you're running and lets your friend watch your
          progress. It uses your phone and is independet from the organizers
          tracking so it works on any race.
        </p>
      </div>
      <div>
        <img
          src={require('./../../assets/images/projects/runverter-io/runverter-io-logo.svg')}
          width="90%"
          alt="runverter.io logo"
        />
        <h1>A minimal and powerful calculator for runners</h1>
        <img
          sizes="100vw"
          src={require('./../../assets/images/projects/runverter-io/runverter-io-screen-600.png')}
          srcSet={`
            ${require('./../../assets/images/projects/runverter-io/runverter-io-screen-600.png')} 600w, 
            ${require('./../../assets/images/projects/runverter-io/runverter-io-screen-1000.png')} 1000w,
            ${require('./../../assets/images/projects/runverter-io/runverter-io-screen-1800.png')} 1800w`}
          alt="screenshot of the runverter.io website that shows a pace calculator"
        />
        <p>
          I like running and playing with data and numbers but I was never
          satisfied with the state of running calculators out there. So I
          decided to build my own state of the art swiss army knife for runners.{' '}
          <a href="https://runverter.io" target="_blank" rel="noopener">
            Runverter.io
          </a>{' '}
          was born. Read the{' '}
          <Link
            as={config.routing.blogPost.nextLink.as(runverterArticle.url)}
            href={config.routing.blogPost.nextLink.href(runverterArticle.url)}
          >
            <a>release article</a>
          </Link>{' '}
          for a deep dive into all the features.
        </p>
      </div>
      <div>
        <img
          src={require('./../../assets/images/projects/linnr/linnr-logo.svg')}
          width="80%"
          alt="Linnr Logo"
        />

        <h1>LINNR - it's not snake!</h1>
        <img
          sizes="100vw"
          src={require('./../../assets/images/projects/linnr/linnr-title-card.png')}
          alt="Linnr Artwork by Christian Wischnewski"
        />
        <p>
          <a href="https://linnr.de" target="_blank" rel="noopener">
            Linnr
          </a>{' '}
          is a tribute game I made with{' '}
          <a href="https://wischnik.de" target="_blank" rel="noopener">
            Christian Wischnewski
          </a>
          . We both were so eager to participate in a game jam, that we started
          this as an experiment to see how far we can go as game dev newbies. In
          January 2020 we submitted it to the{' '}
          <a
            href="https://itch.io/jam/finally-finish-something-2020"
            target="_blank"
            rel="noopener"
          >
            Finally Finish Something 2020
          </a>{' '}
          jam and ranked place 56 of 293 - we even made place 18 in the visuals
          category (thanks to christian). Go give it a try, I bet you can't beat
          the{' '}
          <a href="https://linnr.de/highscore" target="_blank" rel="noopener">
            highscore
          </a>
          !
        </p>
      </div>
      <div>
        <img
          src={require('./../../assets/images/projects/stickerlicious/stickerlicious-logo.svg')}
          width="80%"
          alt="stickerlicious logo"
        />
        <h1>Pixel MacBook sticker</h1>
        <img
          sizes="100vw"
          src={require('./../../assets/images/projects/stickerlicious/stickerlicious-screen-600.png')}
          srcSet={`
            ${require('./../../assets/images/projects/stickerlicious/stickerlicious-screen-600.png')} 600w, 
            ${require('./../../assets/images/projects/stickerlicious/stickerlicious-screen-1000.png')} 1000w,
            ${require('./../../assets/images/projects/stickerlicious/stickerlicious-screen-1800.png')} 1800w`}
          alt="screenshot of the stickerlicious online shop for macbook stickers"
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
            available as open source at GitHub
          </a>
          .
        </p>
      </div>
      <div>
        <img
          src={require('./../../assets/images/projects/skycheck/skycheck-logo.svg')}
          width="80%"
          alt="skycheck logo"
        />
        <h1>Finding flights. Simple.</h1>
        <img
          sizes="100vw"
          src={require('./../../assets/images/projects/skycheck/skycheck-screen-600.png')}
          srcSet={`
            ${require('./../../assets/images/projects/skycheck/skycheck-screen-600.png')} 600w, 
            ${require('./../../assets/images/projects/skycheck/skycheck-screen-1000.png')} 1000w,
            ${require('./../../assets/images/projects/skycheck/skycheck-screen-1800.png')} 1800w`}
          alt="screenshot of the skycheck flight search website"
        />
        <p>
          Skycheck.com was the awesome startup I've been working at since the
          last couple of years. I had the great chance to join the development
          team in the early days and be a part of a growing and exciting
          project. Skycheck aims to provide the easiest way to find the best
          flights out there in the cluttered internet and also acts as a flight
          search technology provider for large travel websites. It shut down in
          2018 but I will still list it here since it shaped me as a developer
          and deserves to be mentioned.
        </p>
      </div>
    </div>
  );
};

export default List;
