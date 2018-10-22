import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Navbar, NavItem, Row, Col, CardPanel } from 'react-materialize';
import { Async } from 'react-select';

import SearchPlaces from '../actions/googleSearch';
import { placesAutoComplete, getPlaceDetails } from '../utils/googleApiHelper';

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
      searchResults: null,
      option: null,
      loadingResults: false
    };

    this.handleSearchQuery = this.handleSearchQuery.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }



  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
    } else {
      alert("Not supported");
    }
  }

  showPosition(position) {
    console.log("lat: ", position.coords.latitude, "long: ", position.coords.longitude);
  }

  showError(error) {
    console.log(error);
  }

  /**
   * @param {*} searchKey
   * @returns {*} void
   */
  handleSearchQuery(searchKey) {
    this.setState({ loadingResults: false });
    if (!this.state.loadingResults) {
      return placesAutoComplete(searchKey)
        .then((response) => {
          this.setState({ loadingResults: true });
          return { options: response };
        })
        .catch(() => {
          this.setState({ loadingResults: true });
        });
    }
  }

  /**
   * @returns {*} void
   * @param {*} value
   */
  handleSearchClick(value) {
    this.setState({
      value,
      loadingResults: false
    });
    getPlaceDetails(value.place_id)
      .then(() => {
        this.props.history.push(`/reviews/${value.place_id}`);
      });
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
            <Async
              name="form-field-name"
              autoload={false}
              value={this.state.value}
              loadOptions={this.handleSearchQuery}
              onChange={this.handleSearchClick}
              valueKey="description"
              labelKey="description"
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
      </div>
    );
  }
}

export default LandingPage;
