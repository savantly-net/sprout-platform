import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

class MenuItem extends Component {
    render() {
        return (
            <li className={ this.props.active ? 'nav-item active' : 'nav-item' }>
                <Link className="nav-link" to={this.props.linkTo}>
                    <i className={`${this.props.cssClassName} menu-icon`} ></i>
                    <span className="menu-title">{this.props.title}</span>
                </Link>
            </li>
        );
    }
}

MenuItem.propTypes = {
    linkTo: PropTypes.string.isRequired,
    cssClassName: PropTypes.string,
    title: PropTypes.string.isRequired,
    active: PropTypes.bool,
}

export default MenuItem;