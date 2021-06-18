function rot13(str) {
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var result = "";

  function shift(letter) {
    var shiftNum = 13;
    var index = alphabet.indexOf(letter);

    if (index >= shiftNum) {
      return alphabet[index - shiftNum];
    } else if (index < shiftNum) {
      return alphabet[index - shiftNum + alphabet.length];
    }
  }

  for (let i = 0; i < str.length; i++) {
    if (str[i].match(/\w/)) {
      result = result.concat(
        shift(str[i])
      );
    } else if (str[i].match(/\s/) || str[i].match(/\W/)) {
      result = result.concat(str[i]);
    }
  }
  return result;
}

rot13("SERR PBQR PNZC");
