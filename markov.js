/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let markovChain = {};
    for(let i = 0; i < this.words.length; i++){
       if(this.words[i] in markovChain){
          this.words[i + 1] == undefined ? markovChain[this.words[i]].push(null) : markovChain[this.words[i]].push(this.words[i + 1])
       } else {
          this.words[i + 1] == undefined ? markovChain[this.words[i]] = [null] : markovChain[this.words[i]] = [this.words[i + 1]]
       }

    }
    this.chains = markovChain;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let rand = Math.round(Math.random() * numWords)
    if(rand < 1){
      rand = 1
    }
    let count = 0
    let str = ""
    while(count < rand){
      let word = this.words[Math.round(Math.random() * (this.words.length - 1))]
      str += `${word} `
      count += 1
      if(count >= rand){
        break
      }
      let secondWord = this.chains[word][Math.round(Math.random() * (this.chains[word].length - 1))]
      if(secondWord === null){
        continue
      }
      str += `${secondWord} `
      count += 1
    }
    return str

  }
}

module.exports = {
  MarkovMachine
}
