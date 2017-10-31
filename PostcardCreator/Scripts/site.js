function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
        output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
            f.size, ' bytes, last modified: ',
            f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
            '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}

function handleDragOver(evt) {
    bootbox.alert("Did this work?");
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Setup the dnd listeners.
//var dropZone = document.getElementById('dropzone');
//dropZone.addEventListener('dragover', handleDragOver, false);
//dropZone.addEventListener('drop', handleFileSelect, false);

$(document).ready(function () {
    // Upload Options Tabs...
    $("#file_upload").click(function () {
        $(this)[0].setAttribute("class", "nav-link active");
        //$("#drag_and_drop")[0].setAttribute("class", "nav-link");
        $("#web_cam")[0].setAttribute("class", "nav-link");
        $.ajax({
            type: "GET",
            url: "/Home/FileUpload",
            success: function (msg) {
                $("#holder").html(msg);
            }
        });
    });
    //$("#web_cam").click(function () {
    //    $(this)[0].setAttribute("class", "nav-link active");
    //    $("#file_upload")[0].setAttribute("class", "nav-link");
    //    //$("#web_cam")[0].setAttribute("class", "nav-link");
    //    $.ajax({
    //        type: "GET",
    //        url: "/Home/WebCam",
    //        success: function (msg) {
    //            $("#holder").html(msg);
    //        }
    //    });
    //});

    // Drag & Drop...
    $("#dropzone").on("dragover", handleDragOver);
    $("#dropzone").on("drop", handleFileSelect);

    // Saving the canvas image...
    $("#postcardCreator").load(function () {
        // Save new image...
        var image = document.getElementById('postcardCreator').toDataURL("image.png");
        image = image.replace('data:image.png;base64,', '');
        $.ajax({
            type: 'POST',
            url: '/Home/Change',
            data: '{ "imageData" : "' + image + '" }',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (msg) {
                bootbox.alert('Image saved successfully!');
            }
        });
    });
});