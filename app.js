const { ipcRenderer } = require("electron")
// import { transponder } from "./communicator.js";
const {transponder} = require('./communicator')


transponder(ipcRenderer)

// let form = document.querySelector("form")
// let input = document.querySelector("input")
// let responses = document.querySelector("#responses")

// form.addEventListener("submit", async (e) => {
//     e.preventDefault()
//     let line = input.value
//     input.value = "ici"
//     let responseText = await ipcRenderer.invoke("console", line)
//     let response = document.createElement("div")
//     response.textContent = responseText
//     responses.appendChild(response)
// })