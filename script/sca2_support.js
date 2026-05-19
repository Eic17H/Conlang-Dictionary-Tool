// Made by ChatGPT, I'm sorry
function runSCA(input) {
    // Simulate filling the form used by SCA2
    document.theform.ilex.value = String(input);
    // TODO: turn array of word objects into a string with line breaks

    // Set options
    document.theform.outtype[0].checked = true;
    document.theform.report.checked = false;
    document.theform.showdiff.checked = false;
    document.theform.rewout.checked = true;
    document.theform.useilex.checked = true;
    document.theform.showinterm.checked = false;
    document.theform.intonly.checked = false;

    // Trigger SCA2 processing
    process();

    // Extract processed output
    return document.getElementById("olex").innerText;
}

/**
 * Required hidden elements and form for SCA2 to function
 */
// Also used ChatGPT to figure this out
function initializeSca2(lang) {
    let filePath = `https://raw.githubusercontent.com/Eic17H/Conlangs/refs/heads/main/Dictionary/giw/${lang}/changes.txt`
    return fetch(filePath)
    .then(response => response.text())
    .then(data => {
        //console.log(data)
        //testing if the default function works
        let theText=data
        var ruln = theText.split("\n");
		var rulr = theText.split("\r");
		if (rulr > ruln) {
			var newS = "";
			for (var w = 0; w < rulr.length; w++)			
				newS += rulr[w] + "\n";
			theText = newS;
		}
        let rul = theText.split("\n");
        let nrul = rul.length
        console.log("=== rul ===")
        console.log(rul)
        var orul = "";
        var orew = "";
        var ocat = "";
        var olex = "";

        for (w = 0; w < nrul; w++) {
            var t = rul[w];
            if (find(t, "|") != -1) 
                orew += t + "\n";
            else if (find(t, "=") != -1) 
                ocat += t + "\n";
            else if (parseLex && find(t, "/") == -1 && t.charAt(0) != '-')
                olex += t + "\n";
            else
                orul += t + "\n";
        }
        //return 500
        /*
        console.log(path)
        data = data.replace("\r", "")
        data = String(data).split("\n\n")
            console.log(data)
        if(!data[0] || !data[1]) {
            console.error("The sca2 file isn't formatted correctly")
            console.log(data)
            return "500"
        }*/
        
        let sca2SupportElementText = `
        <!-- Required hidden elements and form for SCA2 to function -->
        <form name="theform" style="display:none">
                <textarea name="cats">${ocat/*data[0].match(/(.*=.*\n)+/)[0]*/}</textarea>
                <textarea name="rewrite">${orew/*data[0].match(/(\n.*\|.*)+/)[0]*/}</textarea>
                <textarea name="rules">${orul/*data[1]*/}</textarea>
                <textarea name="ilex"></textarea>
                <input type="radio" name="outtype" checked>
                <input type="radio" name="outtype">
                <input type="radio" name="outtype">
                <input type="checkbox" name="report">
                <input type="checkbox" name="showdiff">
                <input type="checkbox" name="rewout" checked>
                <input type="checkbox" name="useilex" checked>
                <input type="checkbox" name="showinterm">
                <input type="checkbox" name="intonly">
                </form>
                <div id="olex" style="display:none"></div>
                <div id="mytext" style="display:none"></div>
                `
        console.log("=======!!!!!!!!!!!! support element")
        console.log(sca2SupportElementText)
        let element = document.getElementById("sca2Support")
        if(!element)
            document.getElementsByTagName("body")[0].innerHTML += `<div id="sca2Support">\n${sca2SupportElementText}\n</div>`
        else
            element.innerHTML = sca2SupportElementText
        return 200
    })
}