import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: true,
    };
  }

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const activeNavItem = this.props.history.location.pathname.substring(1);
    return (
      <nav
        className={`navbar ${
          this.props.isHome ? 'fixed-top' : ''
        } navbar-expand-lg navbar-dark`}
        style={{ backgroundColor: 'black' }}
      >
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img
              src={`${process.env.PUBLIC_URL}/flash.svg`}
              style={{ height: '2rem' }}
              className="mr-2"
              alt="logo"
            />{' '}
            F L A S H
          </Link>
          <button
            className={`navbar-toggler navbar-toggler-right ${
              this.state.collapsed ? 'collapsed' : ''
            }`}
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={this.toggleNavbar}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${
              this.state.collapsed ? '' : 'show'
            }`}
            id="navbarSupportedContent"
            onClick={this.toggleNavbar}
          >
            <ul className="navbar-nav ml-auto">
              <li
                className={`nav-item ${
                  activeNavItem === 'training' ? 'active' : ''
                }`}
                key="training"
              >
                <Link className="nav-link" to="/training">
                  Training
                </Link>
              </li>
              <li
                className={`nav-item ${
                  activeNavItem === 'inference' ? 'active' : ''
                }`}
                key="inference"
              >
                <Link className="nav-link" to="/inference">
                  Inference
                </Link>
              </li>
              <li
                className={`nav-item ${
                  activeNavItem === 'about' ? 'active' : ''
                }`}
                key="about"
              >
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ isHome }) => {
  return { isHome };
};

export default connect(mapStateToProps)(withRouter(Navbar));
