const names_output = document.getElementById("names_output")
const text_output = document.getElementById("text_output")
const raw_text_output = document.getElementById("raw_text_output")
const error_output = document.getElementById("error_output")
const names_dict = new Map()
//testing purposes:
// names_dict.set("bar", "Bar")
// names_dict.set("jim", "Jim")

function save_name_user() {
    names_output.replaceChildren()
    let person_name = document.getElementById("add_name").value
    let user = document.getElementById("add_user").value
    names_dict.set(person_name, user)
    console.log(names_dict)
    for(let [key, value] of names_dict){
        var del_id = toString(names_dict.get(key))
        names_output.insertAdjacentHTML("afterbegin", `<p> Name: ${key}, username: ${value} </p>`)
    }
    clear_names_dict()
}

function clear_names_dict(){
    document.getElementById("add_name").value = ""
    document.getElementById("add_user").value = ""
}

function del_one_name() {
    names_output.replaceChildren()
    let del_name = document.getElementById("del_name").value
    names_dict.delete(del_name)
    for(let [key, value] of names_dict){
        var del_id = toString(names_dict.get(key))
        names_output.insertAdjacentHTML("afterbegin", `<p> Name: ${key}, username: ${value} </p>`)
        document.getElementById("del_name").value = ""
    }
    document.getElementById("del_name").value = ""
}

function del_all_names(){
    names_output.replaceChildren()
    names_dict.clear()
    console.log(names_dict)
}

function is_name_in_dict(person_name){
    //console.log(names_dict.has(person_name))
    return names_dict.has(person_name)
}

let text_back = []
// messagess handling
function submit_text(){
    text_back = []
    let text_body = document.getElementById("text_area").value
    let text_processed = ""
    text_processed = text_body
    //if something's in the textbox:
    if (text_processed !== ''){
        //split it by new line characters into indivisual messages
        let messages = text_processed.split("\n")
        // for each message, split it itno name and text
        for(let message of messages){
            let name_and_text = message.split(":")
            // if no name is provided, break
            if (name_and_text.length < 2){
                console.log("Proved valid message in the form of 'name:text'")
                let type = "error"
                let message = "Proved valid message in the form of 'name:text'"
                text_back.push([type, message])
                show_messages()
                break
            } else{
                let n = name_and_text[0]
                let message = name_and_text.slice(1).join(":").trim()
                // find out if message is a normal message or a reply
                let rep_names = n.split(",")
                //if normal message:
                if(rep_names.length === 1){
                    //see if name exists in dictionary
                    let temp = is_name_in_dict(rep_names[0].trim())
                    // if name not in dictionary break
                    if (temp === false){
                    console.log(`Name "${rep_names[0].trim()}" does not exist in your curent list of names`)
                    let type = "error"
                    let message = `Name "${rep_names[0].trim()}" does not exist in your curent list of names`
                    text_back.push([type, message])
                    show_messages()
                    break
                    // if name is in dictionary: log the thing as a message and save it
                    } else{
                        let type = "message"
                        let user = names_dict.get(rep_names[0])
                        text_back.push([type, user, message])
                    }
                //if message has two names, it's a reply
                }else if(rep_names.length === 2){
                    // see if the two names are in a dictionary
                    let temp1 = is_name_in_dict(rep_names[0].trim())
                    let temp2 = is_name_in_dict(rep_names[1].trim())
                    //if they aren't break
                    if (temp1 === false){
                        console.log(`Name "${rep_names[0].trim()}" does not exist in your curent list of names`)
                        let type = "error"
                        let message = `Name "${rep_names[0].trim()}" does not exist in your curent list of names`
                        text_back.push([type, message])
                        show_messages()
                        break
                    } else if(temp2 === false){
                        console.log(`Name "${rep_names[1].trim()}" does not exist in your curent list of names`)
                        let type = "error"
                        let message = `Name "${rep_names[1].trim()}" does not exist in your curent list of names`
                        text_back.push([type, message])
                        show_messages()
                        break
                    // if they are, log the message as a reply and save it
                    } else{
                        let type = "reply"
                        let author = names_dict.get(rep_names[0].trim())
                        let reciever = names_dict.get(rep_names[1].trim())
                        text_back.push([type, author, reciever, message])
                    }
                } else{
                    console.log("Text has too many specified names")
                    let type = "error"
                    let message = "Text has too many specified names"
                    text_back.push([type, message])
                }
            }
        }
    } 
    console.log(text_back)
    show_messages(text_back)
}
function clear_text(){
    //var text_body = document.getElementById("text_area").value == ""
    document.getElementById("text_area").value = ''
    text_back = []
    text_output.replaceChildren()
    raw_text_output.replaceChildren()
    error_output.replaceChildren()
}
function show_messages(message_log){
    text_output.replaceChildren()
    raw_text_output.replaceChildren()
    error_output.replaceChildren()
    let preview = ""
    let raw = ""
    for(let message of text_back){
        if(message[0] == "error"){
            error_output.insertAdjacentHTML("afterBegin", `<b>Warning, text is incomplete due to an error! ${message[1]}</b>`)
            // preview += `<b>${message[1]}</b>`
            // preview += "<br>"
        }
        else if(message[0] === "message"){
            preview += `<b>${message[1]}</b>: ${message[2]}`
            preview += "<br>"
            raw = `<p><b>${message[1]}</b>: ${message[2]}</p>`
            raw_text_output.insertAdjacentText("beforeEnd", `${raw}`)
            raw_text_output.insertAdjacentHTML("beforeEnd", "<br>")
        }
        else if((message[0] === "reply")){
            preview += `<b>${message[1]}</b> replied to <b>${message[2]}</b>: ${message[3]}`
            preview += "<br>"
            raw = `<p><b>${message[1]}</b> replied to <b>${message[2]}</b>: ${message[3]}</p>`
            raw_text_output.insertAdjacentText("beforeEnd", `${raw}`)
            raw_text_output.insertAdjacentHTML("beforeEnd", "<br>")
        }
    }
    text_output.insertAdjacentHTML("afterbegin", `<p> ${preview}</p>`)
}

function copy_raw_text_output(id){
    var r = document.createRange()
    r.selectNode(document.getElementById(id))
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(r)
    document.execCommand('copy')
    window.getSelection().removeAllRanges()
}


function toggle_explain(){
    var x = document.getElementById("explain")
    if (x.style.display === "none") {
        x.style.display = "block"
    } else {
        x.style.display = "none"
    }
}


function toggle_ex(){
    var x = document.getElementById("ex")
    if (x.style.display === "block") {
        x.style.display = "none"
    } else {
        x.style.display = "block"
    }
}

function toggle_name_ex(){
    var x = document.getElementById("name_ex")
    if (x.style.display === "block") {
        x.style.display = "none"
    } else {
        x.style.display = "block"
    }
}

