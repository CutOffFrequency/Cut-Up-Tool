"use strict";

$(function(){

    var inputText,
        inputDelim,
        check,
        composeArray = [],
        option = "random",
        text_input = $('#text_input'),
        text_output = $('#text_output'),
        bowie = $('#bowie'),
        bowieL = $('#bowieLabel'),
        yorke = $('#yorke'),
        yorkeL = $('#yorkeLabel'),
        random = $('#random'),
        randomL = $('#randomLabel'),
        compose = $('#compose'),
        composeL = $('#composeLabel'),
        chorus = $('#chorus'),
        verse = $('#verse'),
        input = $('#input'),
        output = $('#output'),
        options = $('#options'),
        readout = $('#status_readout'),
        cutit = $('#cutit'),
        cutitagain = $('#cutitagain'),
        clear = $('#clear');
    // random number between two integers
    function randomMinMax(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // changes options label classes
    function reclassLabel(reclass) {
        for (var i = 0; i < reclass.addActive.length; i++) {
            reclass.addActive[i].addClass("btn-options-active");
        }
        for (var i = 0; i < reclass.removeActive.length; i++) {
            reclass.removeActive[i].removeClass("btn-options-active");
        }
        for (var i = 0; i < reclass.addHidden.length; i++) {
            reclass.addHidden[i].addClass("hidden");
        }
        for (var i = 0; i < reclass.removeHidden.length; i++) {
            reclass.removeHidden[i].removeClass("hidden");
        }
    }
    // toggles reclassLabel function to change options label classes
    function toggleLabel(option) {
        var reclass = {};
        switch (option) { // set reclass object properties as arrays of elements to reclass
            case "bowie":
                reclass.addActive = [bowieL];
                reclass.removeActive = [yorkeL, randomL, composeL];
                reclass.addHidden = [chorus, verse];
                reclass.removeHidden = [cutit, cutitagain];
                break;
            case "yorke":
                reclass.addActive = [yorkeL];
                reclass.removeActive = [bowieL, randomL, composeL];
                reclass.addHidden = [chorus, verse];
                reclass.removeHidden = [cutit, cutitagain];
                break;
            case "random":
                reclass.addActive = [randomL];
                reclass.removeActive = [bowieL, yorkeL, composeL];
                reclass.addHidden = [chorus, verse];
                reclass.removeHidden = [cutit, cutitagain];
                break;
            case "compose":
                reclass.addActive = [composeL];
                reclass.removeActive = [bowieL, yorkeL, randomL];
                reclass.addHidden = [cutit, cutitagain];
                reclass.removeHidden = [chorus, verse];
                break;
            default:
                readout.text("error from toggleLabel case");
        }
        reclassLabel(reclass);
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
            case "compose":
                readout.text("Failed check, please try again with more text");
                break;
            default:
                readout.text("error from checkOK case");
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
    // compare length to target
    function testInput(textArray, targetLength) {
        console.log("testing");
    if (textArray.length > targetLength) {
            console.log("testInput ok");
            return check = "ok";
        } else {
            console.log("testInput fail");
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
            case "yorke": // preventing insertion of extra spaces when randomize is invoked
                splitText = text.split(", "); 
                check = testInput(splitText, 3);
                break;
            case "random":
                splitText = text.split(" ");
                check = testInput(splitText, 4);
                break;
            case "compose":
                splitText = text.split(" ");
                check = testInput(splitText, 20);
                break;
            default:
                readout.text("error from checkArray case");
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
            m = randomMinMax(4, 6); // the number of elements to move; 4 - 6
            r = text.splice(0, m); // select the appropriate elements, stringify & move to q
            s = r.join(" ");
            q.push(s);
            t -= m; // decrement by m
        }
        if (t) { // if there's anything left: stringify and push to q, same process as above
            r = text.splice(0, t);
            s = r.join(" ");
            q.push(s);
        }
        randomize(q);
    }
    function addVerse(text){
        var a,
            b,
            l,
            v = [],
            m,
            n,
            o,
            p,
            q = text.length;
        m = randomMinMax(8, 12); //  the number of elements to grab; 12 - 20
        n = randomMinMax(4, 8); //  the number of lines for the verse; 4 - 8
        o = q - m; //  the range for the the position to grab from
        for (var i = 0; i < n; i++) { // grab the number of lines equal to n
            console.log("o: ", o);
            p = randomMinMax(1, o); //  the position to grab from
            console.log("p ", p);
            l = text.splice(p, m);
            console.log("l: ",l," text by p: ",text[p]," snippet from text at p: ", text.splice(p, m));
            v[i] = l.join(" ");
        }
        b = v.join("\n");
        text_output.val(text_output.val() + "\n" + b);
    }
    function addChorus(text){
        console.log("verse");
    }
    // move output text to input field, clear output
    function swap() { 
        text_input.val(text_output.val()); // move output text to input field
        text_output.val(''); // clear output field
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
        if (e.target.type === "radio" && e.target.name === "mode") {
            option = e.target.id;
            toggleLabel(e.target.id);
            if (option === "compose") {
                readout.text("Mode changed to: " + option + " - New options ready");
            } else {
                readout.text("Mode changed to: " + option + " - Ready");
            }
        } else {
            if ($(e.target).hasClass("compose-option")) {
                switch (e.target.id) {
                    case "verse":
                        addVerse(text_input.val().split(" "));
                        break;
                    case "chorus":
                        addChorus(text_input.val().split(" "));
                        break;
                    default:
                        console.log("error from compose_option case");
                }

            };
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
            default:
                console.log("error from cutit case");
        }
    });
    // swap event handler
    cutitagain.click(function (e) {
        var blip;
        if (text_output.val()) {
            swap();
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
