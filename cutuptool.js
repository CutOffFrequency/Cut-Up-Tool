"use strict";

$(function(){

    var inputText,
        inputDelim,
        check,
        option = "random",
        text_input = $('#text_input'),
        text_output = $('#text_output'),
        bowie = $('#bowie'),
        yorke = $('#yorke'),
        random = $('#random'),
        input = $('#input'),
        output = $('#output'),
        options = $('#options'),
        readout = $('#status_readout'),
        cutit = $('#cutit'),
        cutitagain = $('#cutitagain'),
        clear = $('#clear');
    // toggles options label classes for css styling
    function toggleLabel(option) {
        switch (option) {
            case "bowie":
                $('#bowieLabel').addClass("btn-options-active");
                $('#yorkeLabel').removeClass("btn-options-active");
                $('#randomLabel').removeClass("btn-options-active");
                break;
            case "yorke":
                $('#bowieLabel').removeClass("btn-options-active");
                $('#yorkeLabel').addClass("btn-options-active");
                $('#randomLabel').removeClass("btn-options-active");
                break;
            case "random":
                $('#bowieLabel').removeClass("btn-options-active");
                $('#yorkeLabel').removeClass("btn-options-active");
                $('#randomLabel').addClass("btn-options-active");
                break;
            default:
                readout.text("error from function:toggleLabel");
        }
    }
    // displays status of shuffle, if check fails pass option
    function checkOk(status) {
        switch (status) {
            case "start":
                readout.text("Sorting - Please Wait");
                break;
            case "end":
                readout.text("Finished - Ready");
                break;
            case "bowie":
                readout.text("Failed check, please try again with more text");
                break;
            case "yorke":
                readout.text("Failed check, please try again with more text separated by commas");
                break;
            case "random":
                readout.text("Failed check, please try again with more text");
                break;
            default:
                readout.text("error from function:checkOK");
        }
    }
    // this is the whole point of this thing
    function shuffle(array) {
        var m = array.length,
            t,
            i,
            shuffledString;
        while (m) {
            // While there remain elements to shuffle…
            i = Math.floor(Math.random() * m--); // Pick a remaining element…
            t = array[m]; // And swap it with the current element.
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    }
    // called below to compare length to target
    function testInput(textArray, targetLength) {
        console.log("testing");
    if (textArray.length > targetLength) {
            console.log("test ok");
            return check = "ok";
        } else {
            console.log("test fail");
            return check = "fail";
        }
    }
    // check to see an appropriate amount of elements exist by option
    function checkArray(text, option) {
        var fail, splitText;
        console.log("getting reaady to check", option);
        switch (option) {
            case "bowie":
                splitText = text.split(" ");
                check = testInput(splitText, 12);
                break;
            case "yorke":
                splitText = text.split(", "); // ", " to prevent insertion of extra spaces when ranomize is invoked
                check = testInput(splitText, 3);
                break;
            case "random":
                splitText = text.split(" ");
                check = testInput(splitText, 4);
                break;
            default:
                console.log("you broke it");
                break;
        }
        if (check === "ok") {
            console.log("check ok!");
            checkOk("start");
            cutup(splitText, option);
            checkOk("end");
        } else {
            console.log("check fail!");
            checkOk(option);
        }
    }
    // delim by space and shuffle
    function randomize(text) {
        var shuffledArray;
        shuffledArray = shuffle(text);
        text_output.val(shuffledArray.join(" "));
    }
    // sort into an array q by groups of 4 - 6 elements
    function sortBowie(text) {
        var m,
            q,
            r,
            s,
            q = [],
            t = text.length;
        while (t > 5) { // while there are enough elements in the array to grab up to 6 elements
            m = Math.floor(Math.random() * (6 - 4 + 1)) + 4; // determine the number of elements to move; 4 - 6
            r = text.splice(0, m); // select the appropriate elements, stringify & move to q
            s = r.join(" ");
            q.push(s);
            t -= m; // decrement by m
        }
        if (t > 0) { // if there's anything left: stringify and push to q, same process as above
            r = text.splice(0, m);
            s = r.join(" ");
            q.push(s);
        }
        randomize(q);
    }
    // invoke sort for bowie else randomize
    function cutup(text, option) {
        // console.log("cut up", option)
        if (option === "bowie") sortBowie(text);
        if (option === "yorke") randomize(text);
        if (option === "random") randomize(text);
    }
    // radio event listener
    options.click(function (e) {
        if (e.target.type === "radio") {
            option = e.target.id;
            toggleLabel(e.target.id);
            readout.text("Mode changed to: " + option + " - Ready");
        }
    });
    // shuffle event handler
    cutit.click(function (e) {
        inputText = text_input.val();
        switch (option) {
            case "bowie":
                checkArray(inputText, option);
                break;
            case "yorke":
                checkArray(inputText, option);
                break;
            case "random":
                checkArray(inputText, option);
                break;
        }
    });
    // swap event handler
    cutitagain.click(function (e) {
        var blip, outValue = text_output.val();
        if (outValue) {
            text_input.val(outValue);
            text_output.val('');
            readout.text("Moved Output to Input Field - Ready");
        }
    });
    // clear event handler
    clear.click(function (e) {
        text_output.val('');
        text_input.val('');
        readout.text("Text cleared, mode: " + option + " - Ready");
    });
});
