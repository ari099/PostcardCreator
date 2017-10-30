//Dropzone.options.dropzoneForm = {
//    init: function () {
//        this.on("complete", function (data) {
//            // var res = eval('(' + data.hr.responseText + ')');
//            var res = JSON.parse(data.xhr.responseText);
//        });
//    }
//};

$(document).ready(function () {
    // Upload Options Tabs...
    $("#file_upload").click(function () {
        $(this)[0].setAttribute("class", "nav-link active");
        $("#drag_and_drop")[0].setAttribute("class", "nav-link");
        //$("#web_cam")[0].setAttribute("class", "nav-link");
        $.ajax({
            type: "GET",
            url: "/Home/FileUpload",
            success: function (msg) {
                $("#holder").html(msg);
            }
        });
    });
    $("#drag_and_drop").click(function () {
        $(this)[0].setAttribute("class", "nav-link active");
        $("#file_upload")[0].setAttribute("class", "nav-link");
        //$("#web_cam")[0].setAttribute("class", "nav-link");
        $.ajax({
            type: "GET",
            url: "/Home/DragAndDrop",
            success: function (msg) {
                $("#holder").html(msg);
            }
        });
    });

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