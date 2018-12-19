
var rad = function(x) {
  return x * Math.PI / 180;
};

var getDistance = function(p1, p2) {
  var R = 6378137; //Haversine Earth’s mean radius in meter
  var p1lat=parseFloat(p1.lat);
  var p1lng=parseFloat(p1.lng);
  var p2lat=parseFloat(p2.lat);
  var p2lng=parseFloat(p2.lng);

  var dLat = rad(p2lat - p1lat);
  var dLong = rad(p2lng - p1lng);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1lat)) * Math.cos(rad(p2lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};

var getListDistance=function(arrDriver,requestLocation){
	var list=[];
    arrDriver.map(driver=>{
    	if(driver.driver_status!=2)
    	{
    		var location={
    			lat:requestLocation.tripLatitude,
    			lng:requestLocation.tripLongitude
    		}
    		driver.dist=getDistance(driver.location, location);
    		list.push(driver);
    	}
    })
    return list.sort(function(a, b){
	    return a.dist-b.dist
    });
}
var send_request=function(soket_driver,request,check)
{
    return new Promise((resolve, reject) => {
    	var thoi_han=false;
    	soket_driver.emit("server_send_request",request);
    	
    	var action=setTimeout(()=>{
            reject(thoi_han);
    	}, 12000)

    	soket_driver.on("accept_request",function(data){
           console.log("driver da chap nhan");
           clearTimeout(action);
           thoi_han=true
           resolve(thoi_han);
        });
    })
}
exports.sendRequestForDriver=function(socket,requestLocation,arrDriver,arrRequest){
	 var arrDistance=[];
     var arrDistance=getListDistance(arrDriver,requestLocation);
     if(arrDistance.length>0)
     {
     	var tt=0;
     	var t=0;
     	for (var i=0;i<=arrDistance.length;i++) {

     		(function(ind) {
     			var action=setTimeout(function(){
     				if(t==arrDistance.length)
     				{
     					tt=1;
     				}
     				if(tt==0)
     				{
     					if(arrDistance[t].driver_status===1){
     						send_request(arrDistance[t],requestLocation)
     					.then(result=>{
     						console.log("ket thuc");
     						arrDistance[t].driver_status=2;
     						tt=1;
     					})
     					.catch(err=>{
     						console.log(err);
     						console.log("driver nay khong nhan");
     						t++;
     					});
     					}
     				}
     			}, ind*14000);
     		})(i);
     	}
     }

    // if(arrDistance.length>0)
    // {
    // 	var loop=0;
    // 	var i=0
    // 	do{
    // 	 send_request(arrDistance[i],requestLocation)
    // 	 .then(result=>{
    	 	
    // 	 		console.log("ket thuc");
    // 	 		loop=0;
    	 	
    // 	 })
    // 	 .catch(err=>{
    // 	 	console.log(err);
    // 	 	console.log("driver nay khong nhan");
    // 	 	loop=1;
    // 	 		if(i<arrDistance.length)
    // 	 		{
    // 	 			i++;
    // 	 		}
    // 	 });
    // 	 console.log("heloo alibaba");
    // 	}while(loop==1)
    // }
    // arrDistance.map(e=>{
    // 	console.log(e.dist);
    // })
}

//g
exports.sendRequestForDriver10s=function(socket,requestLocation,arrDriver,arrRequest){
  var arrDistance=[];
    var arrDistance=getListDistance(arrDriver,requestLocation);
    if(arrDistance.length>0)
    {
      var tt=0;
      var t=0;
      for (var i=0;i<=arrDistance.length;i++) {

        (function(ind) {
          var action=setTimeout(function(){
            if(t==arrDistance.length)
            {
              tt=1;
            }
            if(tt==0)
            {
              if(arrDistance[t].driver_status===1){
                send_request(arrDistance[t],requestLocation)
              .then(result=>{
                console.log("ket thuc");
                arrDistance[t].driver_status=2;
                tt=1;
              })
              .catch(err=>{
                console.log(err);
                console.log("driver nay khong nhan");
                t++;
              });
              }
            }
          }, ind*14000);
        })(i);
      }
    }
}

//g: driver tu choi request
var refuse_request=function(soket_driver,request,check)
{
    return new Promise((resolve, reject) => {
    	var thoi_han=false;
    	soket_driver.emit("driver_refuse_request",request);
    	
    	var action=setTimeout(()=>{
            reject(thoi_han);
    	}, 12000)

    	soket_driver.on("refuse_request",function(data){
           console.log("driver tu choi yeu cau");
           clearTimeout(action);
           thoi_han=true
           resolve(thoi_han);
        });
    })
}
exports.driverRefuseRequest=function(socket,requestLocation,arrDriver,arrRequest){
  var arrDistance=[];
    var arrDistance=getListDistance(arrDriver,requestLocation);
    if(arrDistance.length>0)
    {
      var tt=0;
      var t=0;
      for (var i=0;i<=arrDistance.length;i++) {

        (function(ind) {
          var action=setTimeout(function(){
            if(t==arrDistance.length)
            {
              tt=1;
            }
            if(tt==0)
            {
              if(arrDistance[t].driver_status===1){
                refuse_request(arrDistance[t],requestLocation)
              .then(result=>{
                console.log("driver nay khong nhan");
                arrDistance[t].driver_status=3;
                tt=1;
              })
              .catch(err=>{
                console.log(err);
                console.log("driver nay khong nhan");
                t++;
              });
              }
            }
          }, ind*14000);
        })(i);
      }
    }
}