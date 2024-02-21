let button = document.getElementById("submit")
let input = document.getElementById("input01")
let responseMessage = document.getElementById("response")

function clearText(){
    responseMessage.innerText = ""
}

button.addEventListener("click", (e) => {
    let content = input.value
    fetch("/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({reminder: content})
    })
    .then(function(res) {return res.json(); })
    .then(function(data){
        let stringedData = JSON.stringify(data);
        responseMessage.innerText = stringedData.replace(/['"]+/g, '')
        setTimeout(clearText, 5000)
    })
});