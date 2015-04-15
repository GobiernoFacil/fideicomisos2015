

var request = new XMLHttpRequest();
request.open('GET', '/data/year/2014', true);

request.onload = function(){
  if(request.status >= 200 && request.status < 400){
    var data = JSON.parse(request.responseText);
    console.log(data);
  }
  else{
    // dup :/
  }
}

request.onerror = function(){
  // die x_____x
}

request.send();