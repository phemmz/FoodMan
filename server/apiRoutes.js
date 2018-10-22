import express from 'express';
import axios from 'axios';
import Places from 'google-places-js';

const router = express.Router();

const places = Places.create(
  {
    key: 'AIzaSyDG4QnNBgaSEBbEkzIybq9Fr1U4PLCvllI',
  }
);

router.get('/api/v1/textsearch/:searchText', (req, res) => {
  places.searchText(req.params.searchText).then((response) => {
    return res.status(200).json({
      confirmation: true,
      results: response,
    });
  }).catch((err) => {
    return res.status(500).json({
      confirmation: false,
      message: err
    });
  });
});

router.get('/api/v1/autocomplete/:searchText', (req, res) => {
  axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.params.searchText}&types=geocode&key=AIzaSyB5A9kymL0HdZd-0z0ppEbU_qiha0NmoGQ`)
  .then((response) => {
    return res.status(200).json({
      confirmation: true,
      results: response.data,
    });
  }).catch((err) => {
    return res.status(500).json({
      confirmation: false,
      message: err
    });
  });
});

router.get('/api/v1/placedetails/:placeId', (req, res) => {
  axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${req.params.placeId}&key=AIzaSyB5A9kymL0HdZd-0z0ppEbU_qiha0NmoGQ`)
  .then((response) => {
    return res.status(200).json({
      confirmation: true,
      results: response.data
    });
  }).catch((err) => {
    return res.status(500).json({
      confirmation: false,
      message: err,
    });
  });
});

router.get('/api/v1/placephotos/:referenceId', (req, res) => {
  axios.get(`https://maps.googleapis.com/maps/api/place/photourl?maxwidth=400&photoreference=${req.params.referenceId}&key=AIzaSyB5A9kymL0HdZd-0z0ppEbU_qiha0NmoGQ`)
  .then((response) => {
    return res.status(200).json({
      confirmation: true,
      results: response.data
    });
  }).catch((err) => {
    return res.status(500).json({
      confirmation: false,
      message: err,
    });
  });
});

export default router;
