import express from 'express';
import Places from 'google-places-js';

const router = express.Router();

const places = Places.create(
  {
    key: 'AIzaSyDG4QnNBgaSEBbEkzIybq9Fr1U4PLCvllI',
  }
);

router.get('/api/v1/textsearch/:searchText', (req, res) => {
  console.log(req.params.searchText, ' st')
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
  places.autocomplete(req.params.searchText).then((response) => {
    return res.status(200).json({
      confirmation: true,
      results: response,
    });
  }).catch((err) => {
    return res.status(500).json({
      confirmation: false,
      message: err,
    });
  });
});

router.get('/api/v1/placedetails/:placeId', (req, res) => {
  places.details(req.params.placeId).then((response) => {
    return res.status(200).json({
      confirmation: true,
      results: response
    });
  }).catch((err) => {
    return res.status(500).json({
      confirmation: false,
      message: err,
    });
  });
});

export default router;
