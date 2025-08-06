/**
 * TODO: allow for families
 * families.txt -> families{}
 */
let families = {
    giw: {
        name: {
            eng: "giworlic",
            ita: "giworlico",
            giw: "..."
        },
        endpoint: true,
        plz: {
            endpoint: false,
            lyz: {
                endpoint: true,
            },
            tdn: {
                endpoint: true,
            },
        },
        pns: {
            endpoint: false,
            ns1: {
                endpoint: true,
            },
            ns2: {
                endpoint: true
            },
            ns3: {
                endpoint: true
            },
        },
        pdb: {
            endpoint: false,
            db1: {
                endpoint: true,
            },
            db2: {
                endpoint: true
            },
            db3: {
                endpoint: true
            },
        }
    },
    kyl: {
        name: {
            eng: "proto-kayulit",
            ita: "proto-kayulit",
            giw: "..."
        },
    }
}
/**
 * Then vocabs: {giw: [], lyz: []} and so on
 * Each word has an origin field, if not null: {lang: "giw", word: "..."}
 * Not sure how to handle homonyms
 * 
 * For the URL, have https://addre.ss?lang=giw&word=...
 * Need to make a unique ID for each word based on data other than the word itself
 * It doesn't need to be that user-friendly. Make an ID based on PoS and class, if it's still not unique tell the user to input another ID in the data
 * The extra ID can also be added just from the second word on, to avoid breaking compatibility with previously inserted data
 * If the IDs aren't unique in the data, the ID in the url ?word= will lead to a disambiguation page
 * If the IDs are unique but the word in the URL is only the ASCII encoding and not the ID, also disambiguate
 * For example if you have P1A2C3-n-III-5 and P1A2C3-adj-22, ?word=P1A2C3 will disambiguate between the other two
 */

/**
 * Reads a word list from a markdown table
 * Returns the word list as an array of objects
 */
var wordsReverse = {}
var path = ""

function loadPath() {
    return "https://raw.githubusercontent.com/Eic17H/Conlangs/refs/heads/main/Dictionary"
    console.log()
    return fetch("../data/path.txt")
    .then(response => response.text())
    .then((data) => {
        path = data
        return 200
    })
}

function loadData() {
    return fetch(`${path}/families.txt`)
    .then(response => response.text())
    .then((data) => {
        data = data.split("\n")
        return loadLanguage(`${path}/${data[0]}/words.md`)
    })
}

function loadLanguage(path) {
    return fetch(path)
    .then(response => response.text())
    .then((data) => {
        //console.log(data)
        let i, j
        let regexp = /(\| [-]+ )+\|/g
        data = data.replaceAll(regexp, "")
        data = data.split("\n")
        for (i in data) {
            data[i] = data[i].replace(/(^\|)/, "")
            data[i] = data[i].replace(/(\|$)/, "")
            data[i] = data[i].split("|")
            for (j in data[i]) {
                data[i][j] = data[i][j].trim()
            }
        }
        let words = []
        for (i in data) {
            let word = {}
            if(i != 0 && data[i].length > 1) {
                for (j in data[i]) {
                    word[data[0][j]] = data[i][j]
                }
                word.word = romanize(word.ascii, 'latin')
                word.ipa = '/' + romanize(word.ascii, 'ipa') + '/'
                words.push(word)
                if(!wordsReverse[word.ascii]) wordsReverse[word.ascii] = []
                wordsReverse[word.ascii].push(words.length)
            }
        }
        return customSort(words)
    })
}