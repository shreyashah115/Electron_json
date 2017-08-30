var remote = require('electron').remote
var dir = require('node-dir');
const dialog = require('electron').remote.dialog 
var fs = require('fs');
const app = remote.require('./app.js')

$(document).ready(function(){
    
    $("#hide").click(function(){
      $('#list').hide();
    });

    $("#hide").click(function(){
      $('.f-form')[0].reset();
      $('.f-form').show();
    });

    $("#list-files").click(function(){
      $('#list').show();
    });

    $("#list-files").click(function(){
      $('.f-form').hide();
    });

    $("#list").click(function(){
      $('.f-form').show();
    });

    $("#list").click(function(){
      $('#list').hide();
    });

});

$.fn.serializeObject = function(){

  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
      if (o[this.name] !== undefined) {
          if (!o[this.name].push) {
              o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || '');
      } else {
          o[this.name] = this.value || '';
      }
  });
  return o;
};

$('.f-form').on('submit', function() {
  var formData = JSON.stringify($(".f-form").serializeObject());

  dialog.showSaveDialog({
    defaultPath: __dirname + '/json/untitled.json',
    filters: [{name: 'JSON files', extensions: ['json']}]}, function (fileName) {

    if (fileName === undefined) return;

    fs.writeFile(fileName, formData, function (err) {   
       dialog.showMessageBox({ message: "The file has been saved.", buttons: ["OK"] });
    });

  });
  $('.f-form')[0].reset();

  return false;
});

document.getElementById('clear').addEventListener('click', function() {
  $('.f-form')[0].reset();
  return false;
});

document.getElementById('get_data').addEventListener('click', function() {
  
  dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections'],
    filters: [{name: 'JSON files', extensions: ['json']}]}, function (fileNames) {
    
    if (fileNames === undefined) return;
    var fileName = fileNames[0];

    $.getJSON(fileName, function(data) {

      for (var i in data) {

      $('input[name="'+i+'"]').val(data[i]);
      $('select[name="'+i+'"]').val(data[i]);

      }
    });
});

},false);

document.getElementById('list-files').addEventListener('click', function() {

  const files = __dirname + '/json/';
  var dict = [];
  var i = 0;
  var j = 0;
  
  fs.readdirSync(files).forEach(file => {
    dict.push({
      key: file,
      value: files.concat(file)
    })
  })

  dir.readFiles(files, {
    match: /.json$/
    }, function(err, content, next) {
        
        if (err) throw err;
        next();
        
        var obj = JSON.parse(content);
        var ul = document.getElementById("list");
        $(`<li class=list-group-item id=${dict[i++].value}><a 
          href=#><h4 class=list-group-item-heading>
          ${obj.title}</h4></a><p class=list-group-item-heading>
          ${obj.select}</p></li>`).appendTo("ul");
  });


  $('#list').on('click', 'li', function() {
 
    var $li = $(this);
    var id = $li.attr('id');
    get_fields(id)
  })

  function get_fields(x){
      
      var fileName = x;
      $.getJSON(fileName, function(data) {
        
        for (var i in data) {
        
        $('input[name="'+i+'"]').val(data[i]);
        $('select[name="'+i+'"]').val(data[i]);
      }
    });
  };

}, {once:true})