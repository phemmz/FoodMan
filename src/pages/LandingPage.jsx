import React, { Component } from 'react';
import { connect, Dispatch } from 'react-redux';

import { Navbar, NavItem, Row, Col, CardPanel } from 'react-materialize';
import Select from 'react-select';

import { getSearchResults } from '../actions/googleSearch';

/**
 *@returns {void}
 */
class LandingPage extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      searchResults: {}
    };

    this.handSearchQuery = this.handSearchQuery.bind(this);
  }

  componentDidMount() {
    this.props.getSearchResults();
  }

  /**
   * @returns {*} void
   */
  handSearchQuery() {
  }

  /**
   * @returns {HTMLDivElement} div
   */
  render() {
    return (
      <div>
        <Row className="landing-row">
          <Col s={10} offset="s1" className="landing-col">
            <Navbar brand="logo" className="nav-bar" right>
              <NavItem href="go.html">Getting Started</NavItem>
              <NavItem href="no.html">Components</NavItem>
            </Navbar>
          </Col>
          <Col s={8} offset="s2" className="select-landing">
            <div className="search-text">Search For Restaurants Nearby</div>
            <Select
              name="form-field-name"
              value={this.state.searchResults}
              onChange={this.handSearchQuery}
            />
          </Col>
        </Row>
        <Row className="restaurants-row">
          <Col s={12}>
            <div className="landing-business">
              Get The Popular Businesses In Town
            </div>
          </Col>
          <Col s={5} m={3}>
            <CardPanel className="lighten-4 black-text">
              <span>Restaurants</span>
            </CardPanel>
          </Col>
          <Col s={5} m={3}>
            <CardPanel className="lighten-4 black-text">
              <span>Hotels</span>
            </CardPanel>
          </Col>
        </Row>
        <div id="map" />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSearchResults: () => {
      return dispatch(getSearchResults());
    }
  };
};

export default connect(null, mapDispatchToProps)(LandingPage);
