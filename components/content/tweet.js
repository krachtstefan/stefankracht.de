import PropTypes from 'prop-types';

export const Tweet = props => (
  <>
    <blockquote className="twitter-tweet">
      <a
        href={`https://twitter.com/KenBauer/status/${
          props.id
        }?ref_src=twsrc%5Etfw`}
        target="_blank"
      >
        See original Tweet
      </a>
    </blockquote>
    <script
      async
      src="https://platform.twitter.com/widgets.js"
      charSet="utf-8"
    />
  </>
);

Tweet.propTypes = {
  id: PropTypes.string.isRequired
};
