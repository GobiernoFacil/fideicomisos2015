// deine la app
var app = {};

app.html = {
  fideicomisos : document.getElementById('lista'),
  year_select  : document.getElementById('select_year'),
  notas        : document.getElementById('lista-permanente'),
  fd_template  : document.getElementById('list-item-template'),
  year_form    : document.getElementById('select-by-year-form')
};

app.fd_template = doT.template(app.html.fd_template.text);

app.list = [];

app.get_data = function(action, config){
  var request = new XMLHttpRequest(),
      url     = '/data/' + action + '/'+ config.join('/'),
      that    = this;
      request.open('GET', url, true);
      request.onload = this.render_list.bind(this);
      request.send();
}

app.render_list = function(e){
  var request = e.currentTarget;
  if(request.status >= 200 && request.status < 400){
    var data = JSON.parse(request.responseText);
    this.list = data;

    this.html.fideicomisos.innerHTML = "";

    for(var i=0; i<data.length; i++){
      var el = document.createElement('li');
      el.innerHTML = this.fd_template(data[i]);
      this.html.fideicomisos.appendChild(el);
    }
  }
}

app.get_data_by_year = function(e){
  e.preventDefault();
  var year = e.target.getElementsByTagName('select')[0].value;
  this.get_data('year', [year]);
}

// agrega los eventos
app.html.year_form.onsubmit = app.get_data_by_year.bind(app);
