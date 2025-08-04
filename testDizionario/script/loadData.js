/**
 * Reads a word list from a markdown table
 * Returns the word list as an array of objects
 */
function loadData() {
    return fetch(".\\data\\giw\\giw.md")
    .then(response => response.text())
    .then((data) => {
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
            }
        }
        return customSort(words)
    })
}