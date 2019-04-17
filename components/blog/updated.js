import PropTypes from 'prop-types';

const Updated = props => {
  return (
    <div className="update">
      <h3>updated in {props.in}</h3>
      <p>{props.children}</p>
    </div>
  );
};

Updated.propTypes = {
  in: PropTypes.string.isRequired
};

export default Updated;
