var currentWord = ""
var mode = 'dictionary'

function capitalize(string) {
    if(!string) return ""
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function showData(words) {
    allDictionaryEntries(words)
    showTable(words)
}

function applySca2(word, filename) {
    return fetch(filename)
    .then(response => response.text())
    .then(project => {
        theform.rules.value = project
        parsesc()
        return runSCA(word)
    })
}

/**
 * TODO: homonyms using wordsReverse
 */
function showWord() {
    return loadData()
    .then((words) => {
        if(currentWord == "") return 200
        let worde
        let wordd = currentWord
        //console.log(wordd)
        for(let i in words) if(words[i].ascii == wordd) worde = words[i]
        if(worde == undefined) return 404
        //console.log(worde)
        for(let i in worde){
            //console.log(i)
            let x = document.getElementById(i)
            if (x!=null) x.innerHTML = worde[i]
        }
        document.getElementById("wordd").innerHTML = worde.word
        return 200
    })
}

/*
function currentWord() {
    let url = window.location.href
    let word = url.match(/(\?|\?.*\&)(word=)([^&=]+)/)[3]
    return word
}
*/

function changeMode(newMode) {
    console.log(newMode)
    mode = newMode
    let dictionaryTable = document.getElementById("dictionaryTable")
    let dictionaryStyled = document.getElementById("dictionaryStyled")
    if(mode == 'table'){
        dictionaryTable.style.display = "block"
        dictionaryStyled.style.display = "none"
    }
    if(mode == 'dictionary'){
        dictionaryTable.style.display = "none"
        dictionaryStyled.style.display = "flex"
    }
    return
}

function showSingleWord(word) {
    currentWord = word
    let dictionaryTable = document.getElementById("dictionaryTable")
    let dictionaryStyled = document.getElementById("dictionaryStyled")
    let singleWord = document.getElementById("singleWord")
    return showWord()
    .then((status) =>{
        if(status != 200) return 404
        if(singleWord.style.visibility == "hidden") {
            singleWord.style.visibility = "visible"
            dictionaryTable.style.visibility = "hidden"
            dictionaryStyled.style.visibility = "hidden"
        } else {
            singleWord.style.visibility = "hidden"
            dictionaryTable.style.visibility = "visible"
            dictionaryStyled.style.visibility = "visible"
        }
        return 200
    })
}

function getParams() {
    let url = window.location.href
    let params = url.match(/.*\?(.*)/)
    if(params) params = params[1]
    params = String(params).split("&")
    let pars = {}
    for (let i in params) {
        let split = params[i].split("=")
        if(split && split.length==2) pars[split[0]] = split[1]
    }
    return pars
}

function checkParams() {
    let pars = getParams()
    //console.log(pars)
    if(pars.word) {
        console.log(pars.word)
        showSingleWord(pars.word)
    }
}

function copyCurrentWordLink() {
    let url = window.location.href.match(/(.*)(\?.*)?/)[1]
    let copyText = `${url}?word=${currentWord}`
    let input = document.createElement("input");
    input.value = copyText;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input); 
}