import React, { Component } from 'react';
import { Link } from 'react-router-dom';

interface MenuItemProps {
    active: boolean,
    linkTo: Required<string>,
    cssClassName: string,
    title: Required<string>
}

class MenuItem extends Component<MenuItemProps> {
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

export default MenuItem;