var remote = require('remote');
var dialog = remote.require('dialog');
var fs = require('fs');
const app = remote.require('./app.js')



document.getElementById('select_file').addEventListener('click', function() {
  dialog.showOpenDialog({

    properties: ['openFile','multiSelections'],
    filters: [{name: 'JSON files', extensions: ['json']}]},function (fileNames) {

      if (fileNames === undefined) return;
      var len = fileNames.length;
      var fileName = fileNames.join();
    //  console.log(fileName)
    
    for (var j in fileNames){
      var filename = fileNames[j].replace(/^.*[\\\/]/, '')
      console.log(filename);
      console.log(fileNames[j]);
      $.getJSON(fileNames[j], function(data) {
        for(var j in fileNames){
          var filename = fileNames[j].replace(/^.*[\\\/]/, '')
          console.log(filename);
          console.log(fileNames[j]);
        
        console.log(filename);  
        var ul = document.getElementById("list");
        var li = document.createElement("li");
        //console.log(fileNames[j]); //full path of the file

        //console.log(filename) //only file name
        $("<li>"+
          "<a href="+"#"+"class="+"list-group-item"+">"+
          "<h4 class="+"list-group-item-heading"+">"+data.title+"</h4>"+
          "<p class="+"list-group-item-heading"+">"+filename+"</p>"+
          "</li>").appendTo("ul");
      }
      });
      // $.ajax({
      // url: "/home/shreya/",
      // success: function(data){
      // data = JSON.parse(data);
      // console.log(data);

      // $(data).find("a:contains(.json)").each(function(){
      // var files = $(this).attr("href");
      // console.log(files);

      // $('<p></p>').html(files).appendTo('')

      // });
      // }
      // });
    }
  });
}, false);