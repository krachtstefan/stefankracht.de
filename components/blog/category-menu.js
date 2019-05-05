import PropTypes from 'prop-types';
import ActiveLink from './../../components/misc/active-link';

const CategoryMenu = props => {
  let { categoryName, categories } = props;
  return (
    <nav
      role="navigation"
      aria-label="category navigation"
      className="cat-menu"
    >
      <ul>
        <li>
          <a href="#">{categoryName}</a>
          <ul>
            {Object.keys(categories).map(category => {
              return (
                <li key={category}>
                  <ActiveLink
                    activeClassName="active"
                    href={props.href(category)}
                    as={props.as(category)}
                    highlightOn={props.highlightOn(category)}
                  >
                    <a>{categories[category]}</a>
                  </ActiveLink>
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
    </nav>
  );
};

CategoryMenu.propTypes = {
  categories: PropTypes.object.isRequired,
  categoryName: PropTypes.string.isRequired,
  href: PropTypes.func.isRequired,
  as: PropTypes.func.isRequired,
  highlightOn: PropTypes.func.isRequired
};

export default CategoryMenu;
