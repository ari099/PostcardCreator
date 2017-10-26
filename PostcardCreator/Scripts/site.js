$(document).ready(function () {
    // Upload Options Tabs...
    $("#file_upload").click(function () {
        $(this)[0].setAttribute("class", "nav-link active");
        $("#drag_and_drop")[0].setAttribute("class", "nav-link");
        $("#web_cam")[0].setAttribute("class", "nav-link");
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
        $("#web_cam")[0].setAttribute("class", "nav-link");
        $.ajax({
            type: "GET",
            url: "/Home/DragAndDrop",
            success: function (msg) {
                $("#holder").html(msg);
            }
        });
    });
    $("#web_cam").click(function () {
        $(this)[0].setAttribute("class", "nav-link active");
        $("#file_upload")[0].setAttribute("class", "nav-link");
        $("#drag_and_drop")[0].setAttribute("class", "nav-link");
        $.ajax({
            type: "GET",
            url: "/Home/WebCam",
            success: function (msg) {
                $("#holder").html(msg);
            }
        });
    });
});