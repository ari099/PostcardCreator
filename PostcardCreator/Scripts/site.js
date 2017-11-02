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
    //$("#newImage").load(function () {
    //    var canvas = document.getElementById('postcardCreator');
    //    var dataURL = canvas.toDataURL('image/png').replace('data:image/png;base64,', '');;
    //    var image = JSON.stringify(dataURL);
    //    $.ajax({
    //        type: 'POST',
    //        url: "/Home/Change",
    //        data: '{ "imageData" : "' + dataURL + '"}',
    //        contentType: 'application/json; charset=utf-8',
    //        dataType: 'json',
    //        success: function (msg) {
    //            alert('Done, Pic Uploaded');
    //        },
    //        error: function (e, ts, et) {
    //            //debugger;
    //            alert(ts);
    //        }
    //    });
    //});
    $("#send").bind("click", function () {
        var canvas = document.getElementById('postcardCreator');
        var image = canvas.toDataURL('image/png').replace('data:image/png;base64,', '');
        $("#modified").val(image);
        $("#newChange").submit();
        //var blob = canvas.toBlob((blob) => {
        //    var newImg = document.createElement('img'),
        //        url = URL.createObjectURL(blob);

        //    newImg.onload = () => {
        //        URL.revokeObjectURL(url);
        //    };

        //    newImg.src = url;
        //    //document.body.appendChild(newImg);

        //    var rq = new XMLHttpRequest();
        //    rq.open("POST", "/Home/Change", false);
        //    var formData = new FormData();
        //    formData.append(newImg);
        //    rq.send(formData);
        //});
        //if (image !== null) {
        //    $.ajax({
        //        url: "/Home/Change",
        //        type: "POST",
        //        data: '{"imageData": "' + image + '"}',
        //        async: false,
        //        cache: false,
        //        contentType: "application/json; charset=utf-8",
        //        dataType: "json"
        //    })
        //}
    });

    $("#upload").bind("click", function () {
        var imgVal = $("#file").val();
        if (imgVal == '')
            alert("Empty input file. Please upload an image");
        else {
            $.ajax({
                url: "/Home/Index",
                type: "POST",
                data: formData,
                async: false,
                success: function (data) {
                    // pass
                },
                cache: false,
                contentType: File,
                processData: false
            });
        }
    });

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
    $("#postcardCreator").on("load", function () {
        var image = document.getElementById('postcardCreator').toDataURL("image/png");
        image = image.replace('data:image/png;base64,', '');

        $.ajax({
            url: '@Url.Action("Change", "Home")',
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            data: { "imageData": "' + image + '" },
            success: function (response) {
                bootbox.alert("Image Uploaded!");
            },
            error: function (er) {
                bootbox.alert("Error uploading image");
                //window.location.href = "/Home/Index";
            }
        });
    });
});