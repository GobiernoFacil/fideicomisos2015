// deine la app
var app = {
  html : {
    fideicomisos : document.getElementById('lista'),
    year_select  : document.getElementById('select_year'),
    notas        : document.getElementById('lista-permanente'),
    year_form    : document.getElementById('select-by-year-form')
  },
  fd_template : doT.template(document.getElementById('list-item-template').text),
  list : [],
  get_data : function(action, config){
    var request = new XMLHttpRequest(),
        url     = '/data/' + action + '/'+ config.join('/'),
        that    = this;
        request.open('GET', url, true);
        request.onload = this.render_list.bind(this);
        request.send();
  },
  render_list : function(e){
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
  },
  get_data_by_year : function(e){
    e.preventDefault();
    var year = e.target.getElementsByTagName('select')[0].value;
    this.get_data('year', [year]);
  }
};

// agrega los eventos
app.html.year_form.onsubmit = app.get_data_by_year.bind(app);
