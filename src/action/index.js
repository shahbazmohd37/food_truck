export const GETTRUCKDATA = 'GETTRUCKDATA';

export function getTruckData(data) {
    return {type: GETTRUCKDATA, data: data}
}

export function getTruckDataByDistance(data, currentLocation) {
    let currLat = currentLocation.lat;
    let currLong = currentLocation.lng;
    let newData = [];
  for (let i = 0; i < data.length; i++) {
      let lat1 = data[i].location.coordinates[1];
      let lon1 = data[i].location.coordinates[0];
      if (distanceInKmBetweenEarthCoordinates(lat1, lon1, currLat, currLong) <= 1) {
            newData.push(data[i]);
      }
  }
  console.log('in dispatching truck data');
  console.dir(newData);
  return getTruckData(newData);
}

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
  var earthRadiusKm = 6371;

  var dLat = degreesToRadians(lat2-lat1);
  var dLon = degreesToRadians(lon2-lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return earthRadiusKm * c;
}