"use strict";

    let inputText,
        inputDelim,
        check,
        composeArray = [],
        option = "random",
        input_textArea = document.querySelector('')
        output_textArea = document.querySelector('')
        bowie = document.querySelector('')
        yorke = document.querySelector('')
        compose = document.querySelector('')
        random = document.querySelector('')
        control_cut = document.querySelector('')
        control_swap = document.querySelector('')
        control_clear = document.querySelector('')
    // random number between two integers
    function randomMinMax(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
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
        var length = array.length,
            target, i;
        while (length) {
            // Pick an element while elements remain
            i = Math.floor(Math.random() * length--);
            // then swap with the next element
            target = array[m]; 
            array[length] = array[i];
            array[i] = target;
        }
        return array;
    }

    // check if appropriate amount of elements exist by option
    function checkArray(text, option) {
        let splitText;
        console.log("getting reaady to check", option);
        switch (option) {
            case "bowie":
                splitText = text.split(" ");
                check = testInput(splitText, 12);
                break;
            case "yorke": // prevent insertion of extra spaces
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
            checkOk("start");
            cutup(splitText, option);
            checkOk("end");
        } else {
            checkOk(option);
        }
    }
    // delim by space and shuffle
    function randomize(text) {
        let shuffledArray;
        shuffledArray = shuffle(text);
        text_output.val(shuffledArray.join(" "));
    }
    // randomly sort via groupings of 4 - 6 elements
    function sortBowie(text) {
        let final = [],
            numRemaining = text.length;
        let grouping, cutString;
        // shuffle while there are more than the min #
        while (numRemaining > 5) { 
            let chunkSize = randomMinMax(4, 6); 
            grouping = text.splice(0, chunkSize);
            cutString = grouping.join(" ");
            final.push(s);
            numRemaining -= chunkSize;
        }
        // shuffle if any elements remain
        if (numRemaining) {
            grouping = text.splice(0, numRemaining);
            cutString = grouping.join(" ");
            final.push(cutString);
        }
        randomize(final);
    }
    /*
    function addVerse(text){
        let a, b, l, v = [], m, n, o, p, q = text.length;
        m = randomMinMax(8, 12); //  the number of elements to grab; 12 - 20
        n = randomMinMax(4, 8); //  the number of lines for the verse; 4 - 8
        o = q - m; //  the range for the the position to grab from
        for (let i = 0; i < n; i++) { // grab the number of lines equal to n
            p = randomMinMax(1, o); //  the position to grab from
            l = text.splice(p, m);
            v[i] = l.join(" ");
        }
        b = v.join("\n");
        text_output.val(text_output.val() + "\n" + b);
    }
    function addChorus(text){
        console.log("verse");
    }
    */
    // move output text to input field, clear output
    function swap() {
        // move output text to input field
        text_input.val(text_output.val());
        // clear output field
        text_output.val('');
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
    function handleCut (e) {
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
    function handleSwap (e) {
        if (text_output.val()) {
            swap();
            readout.text("Moved Output to Input Field - Ready");
        }
    });
    // clear event handler
    function handleClear (e) {
        text_output.val('');
        text_input.val('');
        readout.text("Text cleared, mode: " + option + " - Ready");
    });
