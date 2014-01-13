var video = document.getElementById("photobooth");
var fs = require('fs');
var gui = require('nw.gui');
gui.Window.get().showDevTools();

navigator.webkitGetUserMedia({video:true, audio:true},
    function(stream) {
        video.src = window.webkitURL.createObjectURL(stream);
    }
);

video.onclick = function() {
    var filename = (new Date()).getTime();
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    var uri = canvas.toDataURL('image/jpeg');
    var data = uri.split(',')[1];
    var buffer = new Buffer(data, 'base64');
    var destination = '/Users/tom/Desktop/' + filename + '.jpg';

    fs.writeFile(destination, buffer, 'binary', function(err) {
        if (err) return console.log(err);
  	
        console.log('Photo saved as ', destination);
    });
};
