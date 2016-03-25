var request = require('superagent')
var view = require('view')

const getGoogleMapData = function() {
  request
    .get('http://maps.googleapis.com/maps/api/geocode/json')
    .query({
      address: $('#searchTextField').val(),
      key: process.env.GMAPS
    })
    .end(function(err,res){
      var coords = res.body.results[0].geometry.location
      $('#lat').val(coords.lat)
      $('#lon').val(coords.lng)
    })
}

const getRestaurantData = function() {
  var query = {
    count: 3,
    radius: 500,
    sort: 'rating',
    order: 'desc',
    lat:  $('input#lat').val(),
    lon:  $('input#lon').val()
  }

  request
    .get('../restaurants')
    .query(query)
    .end(function(err,res){
      view.createDiv()
      view.appendResults(res.body)
    })
}

module.exports = {
  getRestaurantData: getRestaurantData, 
  getGoogleMapData: getGoogleMapData
}
