/**
 * Generates a word's formatted dictionary entry from a template
 */
function dictionaryEntry(word) {
    let x = ""
    x += `<div onclick=showSingleWord("${word.ascii}") class="entry ${word.pos} ${word.class}">`
        x += `<span><b class="word giworlic">${word.word}</b></span> `
        x += `<span><b class="word latin">${word.word}</b></span>`
        if(word.pos || word.class) x += `, <i>`
            if(word.pos) x += word.pos
            if(word.pos && word.class) x += ` `
            if(word.class) x+= word.class
        if(word.pos || word.class) x += `</i>`
        if(word.ita || word.eng || word.longdef) x += `:`
        if(word.ita) x += ` ` + capitalize(word.ita) + `.`
        if(word.eng) x += ` ` + capitalize(word.eng) + `.`
        if(word.longdef) x += ` ` + capitalize(word.longdef) + `.`
        x += `<span style="font-size: 0px">${word.ascii}</span>`
    x += `</div>`
    return x
}

/**
 * Generates a dictionary view from a list of words
 */
function allDictionaryEntries(words) {
    let x = document.getElementById("dictionaryStyled")
    x.innerHTML += `<div class="dictionaryColumn" id="dictionaryColumn1"></div>`
    x.innerHTML += `<div class="dictionaryColumn" id="dictionaryColumn2"></div>`
    x.innerHTML += `<div class="dictionaryColumn" id="dictionaryColumn3"></div>`
    let x1 = document.getElementById("dictionaryColumn1")
    let x2 = document.getElementById("dictionaryColumn2")
    let x3 = document.getElementById("dictionaryColumn3")
    for(let i in words) {
        if(i < words.length/3) x1.innerHTML += dictionaryEntry(words[i])
        else if(i < words.length*2/3) x2.innerHTML += dictionaryEntry(words[i])
        else x3.innerHTML += dictionaryEntry(words[i])
    }
}