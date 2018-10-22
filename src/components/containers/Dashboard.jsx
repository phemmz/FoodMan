import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'react-materialize';
import { Async } from 'react-select';

import Carousel from '../common/Carousel';
import { getPlaceDetails } from '../../utils/googleApiHelper';

class Dashboard extends Component {
  /**
   * @returns {*} void
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      place: []
    };
  }

  /**
   * @returns {*} void
   */
  componentWillMount() {
    this.getDetails(this.props.match.params.placeId);
  }

  getDetails (placeId) {
    getPlaceDetails(placeId)
      .then((place) => {
        this.setState({ place });
      });
  }

  /**
   * @returns {*} void
   */
  render() {
    return (
      <div className="dashboard-main">
        <div className="dashboard-nav">
          <h4 className="nav-logo">Logo</h4>
          {/* <Async className="dashboard-search" /> */}
        </div>
        <div className="place-details">
          <h4>{this.state.place.name}</h4>
          <h5>{this.state.place.rating}</h5>
          <div className="place-btns">
            <button>Overview</button><button>Reviews</button>
          </div>
          {/* {
            this.state.place.length !== 0 ?
              this.state.place.photos.map((photo) => {
                const photoUrl = `${photo.getUrl({maxWidth: 400, maxHeight: 400})}`
                return (
                  <img src={photoUrl} key={photoUrl} />
                );
              }) : ''
          } */}
        </div>
        {
          this.state.place.photos &&
          <Carousel placeImages={this.state.place.photos} />
        }
      </div>
    );
  }
}


export default Dashboard;
