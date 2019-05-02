export default class Scrollprogress extends React.Component {
  componentDidMount() {
    const root = document.body.style;

    // Initialize variables
    root.setProperty(
      '--scroll',
      window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
    );

    // Scroll events
    window.addEventListener('scroll', scroll, false);
    function scroll() {
      root.setProperty(
        '--scroll',
        window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
      );
    }
  }

  render = () => {
    return <div className="progress" />;
  };
}
