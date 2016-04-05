var inputText,
    inputDelim,
    check,
    option = "random",
    text_input = document.getElementById("text_input"),
    text_output = document.getElementById("text_output"),
    bowie = document.getElementById("bowie"),
    yorke = document.getElementById("yorke"),
    random = document.getElementById("random"),
    input = document.getElementById("input"),
    output = document.getElementById("output"),
    options = document.getElementById("options"),
    readout = document.getElementById("status_readout");
// displays status of shuffle, if check fails pass option
function checkOk(status) {
	console.log("checking",status);
	switch (status) {
    case "start":
        readout.textContent = "Sorting - Please Wait";
    break;
    case "end":
        readout.textContent = "Finished - Ready"
    break;
    case"bowie":
        readout.textContent = "Failed check, please try again with more text"
    break;
    case "yorke":
        readout.textContent = "Failed check, please try again with more text separated by commas"
    break;
    case "random":
        readout.textContent = "Failed check, please try again with more text"
    break;
    default:
        readout.textContent = "Something is wrong"
	}
}
// this is the whole point of this thing
function shuffle(array) {
    var m = array.length, t, i, shuffledString;
    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);
        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array
}
// check to see an appropriate amount of elements exist by option
function testInput(textArray, targetLength) {
	arrayLength = textArray.length;
	console.log("testing",textArray,arrayLength);
	if (arrayLength > targetLength) {
		console.log("test ok");
		return check = "ok";
	} else {
		return check = "fail";
		console.log("test fail");
	}
}
function checkArray(text, option) {
	var fail, splitText; 
	console.log("getting reaady to check",option, splitText);
	switch (option) {
	case "bowie":
	    splitText = text.split(" ");
	    check = testInput(splitText, 12);
	break;
	case "yorke":
	    splitText = text.split(",");
	    check = testInput(splitText, 3);
	break;
	case "random":
	    splitText = text.split(" ");
	    console.log("switch syntax ok");
	    check = testInput(splitText, 4);
	break;
	default: 
	    console.log("you broke it");
	break;
	}
	console.log(check,"is what it really is tho");
    if (check === "ok") {
    	console.log("check ok!!");
		checkOk("start");
        cutup(splitText, option);
		checkOk("end");
	} else {
		console.log("check fail!!");
		checkOk(option);
	}
}
// delim by space and shuffle
function randomize(text) {
	var shuffledArray;
	console.log("sorting",option);
	shuffledArray = shuffle(text);
	text_output.value = shuffledArray.join(" ");
}
// sort into an array q by groups of 4 - 6 elements
function sortBowie(text) {
    var m, q, r, s, q = [], t = text.length;
    // while there are enough elements in the array to grab up to 6 elements
    while (t > 5) {
        // determine the number of elements to move; 4 - 6 
    	m = Math.floor(Math.random() * (5 - 3 + 1)) + 3;
    	// select the appropriate elements, stringify & move to q
        r = text.splice(0, m);
        s = r.join(" ");
        q.push(s);
        // decrement by m
        t -= m;
    }
    // if there's anything left: stringify and push to q
    if (t) {
        r = text.splice(0, m);
        s = r.join(" ");
        q.push(s);    	
    }
    randomize(q);
}
// invokes the proper sort function
function cutup (text, option) {
	console.log("cut up", option)
    if (option === "bowie") sortBowie(text);
    if (option === "yorke") randomize(text);
    if (option === "random") randomize(text);
}
// prevents more than one checkbox from being checked, updateds option value
function setMode (mode){
    bowie.checked = mode === bowie ? true : false;
    yorke.checked = mode === yorke ? true : false;
    random.checked = mode === random ? true : false;
    if (mode === bowie) option = "bowie";
    if (mode === yorke) option = "yorke";
    if (mode === random) option = "random";
}
// checkbox event listener
options.addEventListener("click", function (e) {
	if (e.target === bowie || e.target === yorke || e.target === random) {
		setMode(e.target);
	}
})
// input event handler
text_input.onkeyup = function (e) {
	if (event.which === 13) {
		inputText = text_input.value;
		console.log(option,"should run");
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
    }
}