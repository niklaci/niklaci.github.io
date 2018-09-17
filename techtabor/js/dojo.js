var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/javascript");
editor.setOptions({
    //enableBasicAutocompletion: true,
    //enableSnippets: true,
    //enableLiveAutocompletion: true,
    fontSize: 20 
});

var task_id = document.title;
function init(curr_task_id, prev_task_id) {
    task_id = curr_task_id;
    let initial_code = localStorage.getItem(task_id + "-program");
    if (!initial_code && prev_task_id) {
        initial_code = localStorage.getItem(prev_task_id + "-program");
    }
    if (initial_code) {
        editor.setValue(initial_code, -1);
    }
}

var line_number = 0;
var lines = [];
function input() {
    if (line_number < lines.length) {
        return lines[line_number++];
    } else {
        return "";
    }
}

function print(s) {
    let new_value = $("#stdout-text").val() + s;
    $("#stdout-text").val(new_value);
}

function runWithDelay() {
    $("#notification-area").html("<br>");
    $("#stdout-text").val("");
    setTimeout(run, 400);
}

function run() {
    console.log("Running program...");
    $("#stdout-text").val("");
    lines = $("#stdin-text").val().split('\n');
    console.log("Input lines: " + lines);
    line_number = 0;
    let code = editor.getValue();
    localStorage.setItem(task_id + "-program", code);
    try {
        $("#notification-area").hide();
        eval(code);
        $("#notification-area").text("A programod lefutott!");
        $("#notification-area").addClass("text-success");
        $("#notification-area").removeClass("text-danger");
        $("#notification-area").fadeIn(400);

    } catch (err) {
        $("#notification-area").text("Hiba a program futása során:  " + err.message);
        $("#notification-area").addClass("text-danger");
        $("#notification-area").fadeIn(400);
    }
}

function startTest() {
    $(".test-input-text").removeClass("test-failed");
    $(".test-input-text").removeClass("test-passed");
    $(".test-output-text").removeClass("test-failed");
    $(".test-output-text").removeClass("test-passed");
    $(".test-panel").removeClass("panel-success");
    $(".test-panel").removeClass("panel-danger");
    $("#notification-area").html("<br>");
    $("#stdout-text").val("");
    $("#stdin-text").val("");
    setTimeout(function() { chainedTest(1); }, 400);
}

function singleTest(k) {
    console.log("Running test #" + k);        
    let in_id = "test-input-" + k;
    let out_id = "test-output-" + k;
    let test_input = $("#" + in_id).text();
    console.log("Testing with input: " + test_input);
    $("#stdin-text").val(test_input);
    run();
    let expected_output = $("#" + out_id).text();
    if ($("#stdout-text").val() != expected_output) {
        console.log("Test #" + k + " failed");
        $("#" + in_id).addClass("test-failed");
        $("#" + out_id).addClass("test-failed");
        $("#test-panel-" + k).addClass("panel-danger");
        $("#" + in_id).removeClass("test-passed");
        $("#" + out_id).removeClass("test-passed");
        $("#test-panel-" + k).removeClass("panel-success");
        $("#notification-area").append(" Helytelen a kimenet a(z) " + k + ". tesztre.");
        $("#notification-area").addClass("text-danger");
        return false;
    }
    $("#" + in_id).addClass("test-passed");
    $("#" + out_id).addClass("test-passed");
    $("#test-panel-" + k).addClass("panel-success");
    $("#" + in_id).removeClass("test-failed");
    $("#" + out_id).removeClass("test-failed");
    $("#test-panel-" + k).removeClass("panel-danger");
    return true;
}

function chainedTest(k) {
    let test_cnt = $(".test-input-text").length;
    if (k > test_cnt) {
        console.log("All tests succeeded :)");
        localStorage.setItem(task_id + "-solved", true);
        $("#success-modal").modal();
    } else {
        if (singleTest(k)) {
            if (k < test_cnt) setTimeout(function() { 
                $("#notification-area").html("<br>");
                $("#stdout-text").val("");
                $("#stdin-text").val("");
            }, 400)
            // Call next test with some delay.
            setTimeout(function() { chainedTest(k + 1); }, 800);
        }
    }
}