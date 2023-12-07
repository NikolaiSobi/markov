/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

function createText(words){
    let newMarkov = new markov.MarkovMachine(words)
    console.log(newMarkov.makeText())
}

function createTextFromFile(path){
    fs.readFile(path, "utf8", function(err, data){
        if(err){
            console.error(`error could not read file from ${path} ${err}`)
            process.exit(1)
        } else {
            createText(data)
        }
    })
}

async function createTextFromURL(url){
    let response
    try {
        response = await axios.get(url)
    } catch (error) {
        console.error(`error could not get text from ${url}`)
        process.exit(1)
    }
    createText(response.data)
}

createTextFromFile("eggs.txt")