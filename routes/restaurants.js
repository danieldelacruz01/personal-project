var express = require('express');
var router = express.Router();
var request = require('superagent')
var dotenv = require('dotenv')

//load environment variables
dotenv.load()

function searchZomato(obj, callback){
	request
		.get('https://developers.zomato.com/api/v2.1/search')
		.set('user-key', process.env.ZOMATO)
		.query(obj)
		.end(function(err,res){
			// console.log(res.body)
			callback(res.body)
		})	
}

/* GET restaurants listing. */
router.get('/', function(req, res, next) {

	searchZomato(req.query, function(result) {
		console.log(req.query)
		var resultaurants = {'restaurants':[]}

		for (var i = 0; i < result.restaurants.length; i++){
			var resultaurant = result.restaurants[i].restaurant
			var resultsObj = {
				"name": resultaurant.name,
				"location": resultaurant.location,
				"cuisines": resultaurant.cuisines,
				"rating": resultaurant.user_rating.aggregate_rating,
				"photo": resultaurant.featured_image,
				"menu": resultaurant.menu_url
			}
			resultaurants.restaurants.push(resultsObj)
		}

		res.send(resultaurants)
	})
});

module.exports = router;