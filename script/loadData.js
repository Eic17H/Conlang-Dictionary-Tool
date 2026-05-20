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
var path = "https://raw.githubusercontent.com/Eic17H/Conlangs/refs/heads/main/Dictionary"

/*

*/
function loadData() {
    // Fetch list of families (currently unused, but will be useful eventually when multiple families are supported)
    return fetch(`https://raw.githubusercontent.com/Eic17H/Conlangs/refs/heads/main/Dictionary/families.txt`)
    .then(response => response.text())
    .then((data) => {
        // Hard coded to load "giw"
        // Loads the word list from a single file
        //data = data.split("\n")
        return loadLanguage(`https://raw.githubusercontent.com/Eic17H/Conlangs/refs/heads/main/Dictionary/giw/words.md`)
    })
}

/*
    Reads a word list in raw markdown and returns a JS object containing the words
*/
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
        // Loading descendants
        /**
         * New logic:
         * Base path (I'll call it @)
         * Assuming this is just for one family for now, I'll generalize it eventually
         * Find @/family.txt and parse it into a tree structure
         *      giw! (plz (lyz!, tdn!), pns (nus!)) should become:
         *          giw = {
         *              shown: true,
         *              plz: {
         *                  lyz: {shown: true},
         *                  tdn: {shown: true}
         *              },
         *              pns: {
         *                  nus: {shown: true}
         *              }
         *          }
         *      That means that the dictionary will use data for giw,
         *      and for each word, the descendant tree will look like this:
         *          word = {
         *              word: "...",
         *              ...
         *              descendants: {
         *                  plz: {
         *                      word: "...",
         *                      descendants: {
         *                          lyz: {
         *                              word: "...",
         *                              shown: true
         *                          },
         *                          tdn: {
         *                              word: "...",
         *                              shown: true
         *                          }
         *                      }
         *                  },
         *                  pns: {
         *                      word: "...",
         *                      descendants: {
         *                          nus: {
         *                              word: "...",
         *                              shown: true
         *                          }
         *                      }
         *                  }
         *              }
         *          }
         *      Showing descendants can thus be overridden for individual words
         *      ( such as words that only survive in one branch )
         * I'm getting ahead of myself
         * 
         * Base path as @
         * Get language info (local name, translated name) from @/settings.txt
         * Get family info from @/family.txt
         * Use the family info to read subfolders
         * For example, you found plz, then you open the folder @/plz
         *      For each word in the data, apply the sound changes
         *      Add the language info to the object that stores the language info as a tree
         *      Do the same with the subfolders
         * So it would be like:
         *      words = loadWords()
         *      function evolve(lang, basepath) {
         *          
         *      }
         * I can't do it
         * I'll just hardcode it for now, sorry
         */
        for(let i in words)
            words[i].descendants = {plz: {word: "", descendants: {lyz: {word: ""}, tdn: {word: ""}}}, pns: {word: "", descendants: {nus: {word: ""}}}}
        
        // I hate this
        return initializeSca2("plz").then (() => {
            for(let i in words) words[i].descendants.plz.word = runSCA(words[i].word).split("\n")[0]
            return initializeSca2("plz/lyz").then (() => {
                for(let i in words) words[i].descendants.plz.descendants.lyz.word = runSCA(words[i].descendants.plz.word).split("\n")[0]
                return initializeSca2("plz/tdn").then (() => {
                    for(let i in words) words[i].descendants.plz.descendants.tdn.word = runSCA(words[i].descendants.plz.word).split("\n")[0]
                    return initializeSca2("pns").then (() => {
                        for(let i in words) words[i].descendants.pns.word = runSCA(words[i].word).split("\n")[0]
                        return initializeSca2("pns/nus").then (() => {
                            for(let i in words) words[i].descendants.pns.descendants.nus.word = runSCA(words[i].descendants.pns.word).split("\n")[0]
                            return customSort(words)
                        })
                    })
                })
            })
        })
    })
}
