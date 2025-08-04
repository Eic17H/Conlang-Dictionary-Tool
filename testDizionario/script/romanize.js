const letters = [
    {ascii: "P1", latin: "p", ipa: "p"},
    {ascii: "P2", latin: "b", ipa: "b"},
    {ascii: "P3", latin: "φ", ipa: "pʰ"},
    {ascii: "P4", latin: "f", ipa: "ɸ"},
    {ascii: "P5", latin: "v", ipa: "β"},
    {ascii: "D1", latin: "t", ipa: "t̪"},
    {ascii: "D2", latin: "δ", ipa: "d̪"},
    {ascii: "D3", latin: "θ", ipa: "t̪ʰ"},
    {ascii: "D4", latin: "þ", ipa: "θ"},
    {ascii: "D5", latin: "ð", ipa: "ð"},
    {ascii: "T1", latin: "ʈ", ipa: "t"},
    {ascii: "T2", latin: "d", ipa: "d"},
    {ascii: "T3", latin: "ƭ", ipa: "tʰ"},
    {ascii: "T4", latin: "s", ipa: "s"},
    {ascii: "T5", latin: "z", ipa: "z"},
    {ascii: "C1", latin: "c", ipa: "c"},
    {ascii: "C2", latin: "γ", ipa: "ɟ"},
    {ascii: "C3", latin: "ç", ipa: "cʰ"},
    {ascii: "C4", latin: "ʃ", ipa: "ɕ"},
    {ascii: "C5", latin: "ʒ", ipa: "ʑ"},
    {ascii: "K1", latin: "k", ipa: "k"},
    {ascii: "K2", latin: "g", ipa: "ɡ"},
    {ascii: "K3", latin: "χ", ipa: "kʰ"},
    {ascii: "K4", latin: "ƙ", ipa: "x"},
    {ascii: "K5", latin: "ɣ", ipa: "ɣ"},
    {ascii: "Q1", latin: "q", ipa: "q"},
    {ascii: "Q2", latin: "ɋ", ipa: "ɢ"},
    {ascii: "Q3", latin: "ϙ", ipa: "qʰ"},
    {ascii: "Q4", latin: "h", ipa: "χ"},
    {ascii: "Q5", latin: "ⱶ", ipa: "ʁ"},
    {ascii: "N1", latin: "m", ipa: "m"},
    {ascii: "N2", latin: "n", ipa: "n"},
    {ascii: "N3", latin: "ŋ", ipa: "ŋ"},
    {ascii: "L1", latin: "l", ipa: "l"},
    {ascii: "L2", latin: "ł", ipa: "ʟ"},
    {ascii: "L3", latin: "ļ", ipa: "l̥"},
    {ascii: "R1", latin: "r", ipa: "r"},
    {ascii: "R2", latin: "ʀ", ipa: "ʀ"},
    {ascii: "R3", latin: "ɽ", ipa: "r̥"},
    {ascii: "O1", latin: "o", ipa: "o"},
    {ascii: "O2", latin: "ʌ", ipa: "ɤ"},
    {ascii: "O3", latin: "ǫ", ipa: "õ"},
    {ascii: "A1", latin: "ɑ", ipa: "ɒ̈"},
    {ascii: "A2", latin: "a", ipa: "ä"},
    {ascii: "A3", latin: "ą", ipa: "ɒ̈̃"},
    {ascii: "E1", latin: "ø", ipa: "ø"},
    {ascii: "E2", latin: "e", ipa: "e"},
    {ascii: "E3", latin: "ę", ipa: "ø̃"},
    {ascii: "U1", latin: "u", ipa: "u"},
    {ascii: "U2", latin: "ɯ", ipa: "ɯ"},
    {ascii: "U3", latin: "ų", ipa: "ũ"},
    {ascii: "Y1", latin: "ɵ", ipa: "ə̹"},
    {ascii: "Y2", latin: "ǝ", ipa: "ə̜"},
    {ascii: "Y3", latin: "ǝ̨", ipa: "ə̃"},
    {ascii: "I1", latin: "y", ipa: "y"},
    {ascii: "I2", latin: "i", ipa: "i"},
    {ascii: "I3", latin: "į", ipa: "ỹ"},
    {ascii: "J", latin: "j", ipa: "j"},
    {ascii: "W", latin: "w", ipa: "w"}
]

// pbφfvtδθþðʈdƭszcγçʃʒkgχƙɣqɋϙhⱶmnŋlłļrʀɽoʌǫɑaąøeęuɯųɵǝǝ̨yiįjw

function romanize(word, mode) {
    if(!mode) mode = "latin"
    for(let i in letters) {
        let regex = new RegExp(letters[i].ascii, 'g')
        word = word.replaceAll(regex, letters[i][mode])
    }
    return word
}