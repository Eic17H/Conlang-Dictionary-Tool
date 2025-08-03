function showTable(words) {
    let labels = {
            word: {label: "Word", class: "word latin"},
            ipa: {label: "IPA", class: ""},
            pos: {label: "PoS", class: ""},
            class: {label: "Class", class: ""},
            ita: {label: "Italiano", class: "translation"},
            eng: {label: "English", class: "translation"}
        }
        let dicTab = document.getElementById("dictionaryTable")
        let row = ""
        for (let i in words[0]) {
            let label
            if(labels[i]) label = labels[i].label
            else label = i
            if(labels[i]) row += `<div class="cell" id="${i}_head">${label}</div>`
        }
        dicTab.innerHTML += `<div class="row columnHead">${row}</div>`
        for (let i in words) {
            let row = ""
            for (let j in words[i]) {
                let word = words[i][j]
                //if(["word", "ita", "eng"].includes(j)) word = capitalize(word)
                if(labels[j]) row += `<div class="cell ${labels[j].class}">${word}</div>`
            }
            dicTab.innerHTML += `<div class="row" onclick="showSingleWord('${words[i].ascii}')">${row}</div>`
        }
}