export const placesAutoComplete = (map) => {
  return new Promise((resolve, reject) => {
    const service = new google.maps.places.AutocompleteService();

    service.getQueryPredictions({ input: map }, (predictions, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        return reject(status)
      } else {
        resolve(predictions);
      }
    })
  })
}

export const getPlaceDetails = (placeId) => {
  return new Promise((resolve, reject) => {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -33.866, lng: 151.1958},
      zoom: 15
    });

    const service = new google.maps.places.PlacesService(map);
    console.log(placeId, 'service');
    service.getDetails({placeId}, (place, status) => {
      console.log(place, 'place');
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        return reject(status);
      } else {
        resolve(place);
      }
    })
  })
}
