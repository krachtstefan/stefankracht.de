export default () => {
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

  return <div className="progress" />;
};
