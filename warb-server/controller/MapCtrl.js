var mapRepo = require('../repos/MapRepos.js');

exports.getLatLong = function(req,res) {
   var address=req.body.address;
   var stringUrl=`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCHY7K0nxdBJ2MVMMVe46mJP8PvoezIUvc`;
   var url = encodeURI(stringUrl); 
   mapRepo.getMapAPI(url)
   .then(body=>{
   	var c={
   		address:body.results[0].formatted_address,
   		lat:body.results[0].geometry.location.lat,
   		lng:body.results[0].geometry.location.lng
   	}
   	res.json({
			returnCode:1,
			message:"get Lat Lng success!",
			object:c
		});
   })
   .catch(err=>{
   		res.json({
			returnCode:0,
			message:"get Lat Lng error!",
			error:err
		});
   })
}