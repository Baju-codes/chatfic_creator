const names_output = document.getElementById("names_output")
const text_output = document.getElementById("text_output")
const raw_text_output = document.getElementById("raw_text_output")
const error_output = document.getElementById("error_output")
const names_dict = new Map()
const me_color = document.getElementById("me_color")
const me_tail_color = document.getElementById("me_tail_color")
const you_color = document.getElementById("you_color")
const you_tail_color = document.getElementById("you_tail_color")

const you_typing_color = document.getElementById("you_typing_color")
const you_typing_color_after = document.getElementById("you_typing_color_after")
const me_typing_color = document.getElementById("me_typing_color")
const me_typing_color_after = document.getElementById("me_typing_color_after")

//testing purposes:
// names_dict.set("a", "aa")
// names_dict.set("b", "bbb")
//names_dict.set("Me", "me!")



function save_name_user() {
    names_output.replaceChildren()
    let person_name = document.getElementById("add_name").value
    let uper_name = person_name.charAt(0).toUpperCase() + person_name.slice(1).toLowerCase();
    let user = document.getElementById("add_user").value
    names_dict.set(uper_name, user)
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
    let uper_del_name = del_name.charAt(0).toUpperCase() + del_name.slice(1).toLowerCase();
    names_dict.delete(uper_del_name)
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
    document.getElementById("del_name").value = ""
}

function is_name_in_dict(person_name){
    //console.log(names_dict.has(person_name))
    let uper_name = person_name.charAt(0).toUpperCase() + person_name.slice(1).toLowerCase();
    return names_dict.has(uper_name)
}

function get_user(person_name){
    let uper_name = person_name.charAt(0).toUpperCase() + person_name.slice(1).toLowerCase();
    return names_dict.get(uper_name)
}

// 
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
            if (message === ''){
                continue
            }
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
                // console.log(n)
                let raw_message = name_and_text.slice(1).join(":").trim()
                let semi_message = raw_message.replace("<", "&lt;")
                let message = semi_message.replace(">", "&gt;")
                // console.log(message)
                // find out if message is a normal message or a reply
                let rep_names = n.split(",")
                //if normal message:
                if(rep_names.length === 1){
                    //see if name exists in dictionary
                    let temp = is_name_in_dict(rep_names[0].trim())

                    //handling of time
                    if(rep_names == "time" | rep_names == "Time"){
                        let type = "time"
                        text_back.push([type, message])
                    }
                    // if name not in dictionary break
                    else if (temp === false){
                    console.log(`Name "${rep_names[0].trim()}" does not exist in your current list of names`)
                    let type = "error"
                    let message = `Name "${rep_names[0].trim()}" does not exist in your current list of names`
                    text_back.push([type, message])
                    show_messages()
                    break
                    // if name is in dictionary:
                    } 
                    //handling of me messaging bubble
                    else if(message.toLowerCase() === "typing" & rep_names[0].toLowerCase() === "me"){
                        console.log("me_typing")
                        let type = "me_typing"
                        let user = get_user(rep_names[0])
                        text_back.push([type, user])
                    }
                    else if(message.toLowerCase() === "typing"){
                        let type = "typing"
                        let user = get_user(rep_names[0])
                        text_back.push([type, user])
                    }
                    //handling of messaging bubble
                    else if(rep_names[0].toLowerCase() === "me"){
                        //console.log("me_message")
                        let type = "me_message"
                        let user = get_user(rep_names[0])
                        text_back.push([type, user, message])
                    }
                    else if(rep_names[0].toLowerCase() === "you"){
                        //console.log("you_message")
                        let type = "you_message"
                        let user = get_user(rep_names[0])
                        text_back.push([type, user, message])
                    }
                    else{
                        let type = "message"
                        let user = get_user(rep_names[0])
                        text_back.push([type, user, message])
                    }
                //if message has two names, it's a reply
                }else if(rep_names.length === 2){
                    // see if the two names are in a dictionary
                    let temp1 = is_name_in_dict(rep_names[0].trim())
                    let temp2 = is_name_in_dict(rep_names[1].trim())
                    //if they aren't break
                    if (temp1 === false){
                        console.log(`Name "${rep_names[0].trim()}" does not exist in your current list of names`)
                        let type = "error"
                        let message = `Name "${rep_names[0].trim()}" does not exist in your current list of names`
                        text_back.push([type, message])
                        show_messages()
                        break
                    } else if(temp2 === false){
                        console.log(`Name "${rep_names[1].trim()}" does not exist in your current list of names`)
                        let type = "error"
                        let message = `Name "${rep_names[1].trim()}" does not exist in your current list of names`
                        text_back.push([type, message])
                        show_messages()
                        break
                    
                    } else if(rep_names[0].toLowerCase() === "me"){
                        let type = "me_reply"
                        let author = get_user(rep_names[0].trim())
                        let receiver = get_user(rep_names[1].trim())
                        text_back.push([type, author, receiver, message])
                    }
                    else if(rep_names[1].toLowerCase() === "me"){
                        let type = "reply_to_me"
                        let author = get_user(rep_names[0].trim())
                        let receiver = get_user(rep_names[1].trim())
                        text_back.push([type, author, receiver, message])
                    }
                    //in a one on one conversation, you reply to me
                    else if(rep_names[0].toLowerCase() === "you" & rep_names[1].toLowerCase() === "me"){
                        let type = "you_to_me"
                        let author = get_user(rep_names[0].trim())
                        let receiver = get_user(rep_names[1].trim())
                        text_back.push([type, author, receiver, message])
                    }

                    // if message is a reply, log the message as a reply and save it
                    else {
                        let type = "reply"
                        let author = get_user(rep_names[0].trim())
                        let receiver = get_user(rep_names[1].trim())
                        text_back.push([type, author, receiver, message])
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
    let start_stuff = `<div class="phone"> <p class="messagebody"> <br>`
    let end_stuff = `</p></div>`
    preview += `${start_stuff}`
    raw_text_output.insertAdjacentText("beforeEnd", `${start_stuff}`)
    for(let message of text_back){
        //error handling
        if(message[0] == "error"){
            error_output.insertAdjacentHTML("afterBegin", `<b>Warning, text is incomplete due to an error! ${message[1]}</b>`)
        }
        //typing handling
        else if(message[0] == "typing"){
            preview += `<span class="typing-indicator"><span></span><span></span><span></span></span>`
            raw = `<span class="hide">${message[1]} is typing</span><span class="typing-indicator"><span></span><span></span><span></span></span>`
            raw_text_output.insertAdjacentText("beforeEnd", `${raw}`)
            raw_text_output.insertAdjacentHTML("beforeEnd", "<br>")
        }
        //me typing handling
        else if(message[0] == "me_typing"){
            preview += `<span class="me_typing-indicator"><span></span><span></span><span></span></span>`
            raw = `<span class="hide">${message[1]} (You) is typing</span><span class="me_typing-indicator"><span></span><span></span><span></span></span>`
            raw_text_output.insertAdjacentText("beforeEnd", `${raw}`)
            raw_text_output.insertAdjacentHTML("beforeEnd", "<br>")
        }
        //time handling
        else if(message[0] == "time"){
            preview += `<span class="time">${message[1]}</span><br>`
            raw = `<span class="time">${message[1]}</span><br></br>`
            raw_text_output.insertAdjacentText("beforeEnd", `${raw}`)
            raw_text_output.insertAdjacentHTML("beforeEnd", "<br>")
        }
        //regular message
        else if(message[0] === "message"){
            //  message is coming from someone else and will be displayed on the left and in gray
            preview += `<span class="names">${message[1]}</span><br><span class="text">${message[2]}</span> <br></br>`
            raw = `<span class="names">${message[1]}<span class="hide">: </span></span><br><span class="text">${message[2]}</span><br></br>`
            raw_text_output.insertAdjacentText("beforeEnd", `${raw}`)
            raw_text_output.insertAdjacentHTML("beforeEnd", "<br>")
        }
        // message is coming from "me"
        else if(message[0] === "me_message"){
                preview += `<span class="breply">${message[2]}</span><br></br>`
                //raw = `<span class="hide"><b></span>${message[1]}<span class="hide">: </b></span><span class="breply">${message[2]}</span><br></br>`
                raw = `<span class="hide">${message[1]} (You): <br></span><span class="breply">${message[2]}</span><br></br>`
                raw_text_output.insertAdjacentText("beforeEnd", `${raw}`)
                raw_text_output.insertAdjacentHTML("beforeEnd", "<br>")
        }
        //in a one on one convo, you send a messgae
        else if(message[0] === "you_message"){
            preview += `<span class="text">${message[2]}</span><br></br>`
            raw = `<span class="hide">${message[1]}: </span><br><span class="text">${message[2]}</span><br></br>`
            raw_text_output.insertAdjacentText("beforeEnd", `${raw}`)
            raw_text_output.insertAdjacentHTML("beforeEnd", "<br>")
        }
        // regular reply 
        else if((message[0] === "reply")){
            preview += `<span class="names">${message[1]} replied to ${message[2]}</span><br> <span class="text">${message[3]}</span><br></br>`
            raw = `<span class="names">${message[1]} replied to ${message[2]}<span class="hide">: </span></span><br> <span class="text">${message[3]}</span><br></br>`
            raw_text_output.insertAdjacentText("beforeEnd", `${raw}`)
            raw_text_output.insertAdjacentHTML("beforeEnd", "<br>")
        }
        // reply is coming from "me"
        else if(message[0] === "me_reply"){
                preview += `<span class="breply">${message[3]}</span><br></br>`
                raw = `<span class="hide">You replied to ${message[2]}: <br></span><span class="breply">${message[3]}</span><br></br>`
                raw_text_output.insertAdjacentText("beforeEnd", `${raw}`)
                raw_text_output.insertAdjacentHTML("beforeEnd", "<br>")
        }
        //  someone is replying to me
        else if (message[0] === "reply_to_me"){
            preview += `<span class="names">${message[1]} replied to you</span><br> <span class="text">${message[3]}</span><br></br>`
            raw = `<span class="names">${message[1]} replied to you:</span><br><span class="text">${message[3]}</span><br></br>`
            raw_text_output.insertAdjacentText("beforeEnd", `${raw}`)
            raw_text_output.insertAdjacentHTML("beforeEnd", "<br>")
        }
        // in a one on one conversation, you reply to me
        else if (message[0] === "you_to_me"){
            preview += `<span class="names">${message[1]} replied to you</span><br> <span class="text">${message[3]}</span><br></br>`
            raw = `<span class="names">${message[1]} replied to you:</span><br><span class="text">${message[3]}</span><br></br>`
            raw_text_output.insertAdjacentText("beforeEnd", `${raw}`)
            raw_text_output.insertAdjacentHTML("beforeEnd", "<br>")
        }
    }
    preview += `${end_stuff}`
    raw_text_output.insertAdjacentText("beforeEnd", `${end_stuff}`)
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

// function copy_raw_text_output(){
//     // Get the text field
//   var copyText = document.getElementById("raw_text_output");

//   // Select the text field
//   copyText.select();
//   copyText.setSelectionRange(0, 99999); // For mobile devices

//    // Copy the text inside the text field
//   navigator.clipboard.writeText(copyText.textContent);

//   // Alert the copied text
//   alert("Copied the text: " + copyText.textContent);
// }


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

function toggle_gen_ex(){
    var x = document.getElementById("general_ex")
    var y = document.getElementById("blue_message_ex")
    var z = document.getElementById("hide_span_ex")
    var a = document.getElementById("one_on_one_ex")
    var b = document.getElementById("feature_list_ex")
    y.style.display = "none"
    z.style.display = "none"
    a.style.display = "none"
    b.style.display = "none"
    if (x.style.display === "block") {
        x.style.display = "none"
    } else {
        x.style.display = "block"
    }
}

function toggle_blue_message_ex(){
    var x = document.getElementById("general_ex")
    var y = document.getElementById("blue_message_ex")
    var z = document.getElementById("hide_span_ex")
    var a = document.getElementById("one_on_one_ex")
    var b = document.getElementById("feature_list_ex")
    x.style.display = "none"
    z.style.display = "none"
    a.style.display = "none"
    b.style.display = "none"
    if (y.style.display === "block") {
        y.style.display = "none"
    } else {
        y.style.display = "block"
    }
}

function toggle_hide_span_ex(){
    var x = document.getElementById("general_ex")
    var y = document.getElementById("blue_message_ex")
    var z = document.getElementById("hide_span_ex")
    var a = document.getElementById("one_on_one_ex")
    var b = document.getElementById("feature_list_ex")
    y.style.display = "none"
    x.style.display = "none"
    a.style.display = "none"
    b.style.display = "none"
    if (z.style.display === "block") {
        z.style.display = "none"
    } else {
        z.style.display = "block"
    }
}

function toggle_one_on_one_ex(){
    var x = document.getElementById("general_ex")
    var y = document.getElementById("blue_message_ex")
    var z = document.getElementById("hide_span_ex")
    var a = document.getElementById("one_on_one_ex")
    var b = document.getElementById("feature_list_ex")
    y.style.display = "none"
    z.style.display = "none"
    x.style.display = "none"
    b.style.display = "none"
    if (a.style.display === "block") {
        a.style.display = "none"
    } else {
        a.style.display = "block"
    }
}

function toggle_feature_list_ex(){
    var x = document.getElementById("general_ex")
    var y = document.getElementById("blue_message_ex")
    var z = document.getElementById("hide_span_ex")
    var a = document.getElementById("one_on_one_ex")
    var b = document.getElementById("feature_list_ex")
    y.style.display = "none"
    z.style.display = "none"
    x.style.display = "none"
    a.style.display = "none"
    if (b.style.display === "block") {
        b.style.display = "none"
    } else {
        b.style.display = "block"
    }
}

// function test_me_message_color(){
//     var col = document.getElementById("me_message_color").value
//     console.log(col)
//     var el = document.getElementById("blue_color_example")
//     el.style.background = col
// }

// function test_you_message_color(){
//     var col = document.getElementById("you_message_color").value
//     var el = document.getElementById("gray_color_example")
//     el.style.background = col
// }


const me_defaultColor = "#1289fe";
const colorPicker = document.getElementById("me_message_color");
colorPicker.value = me_defaultColor;
colorPicker.addEventListener("input", update_me_color);
colorPicker.select();
function update_me_color(event) {
    const el = document.getElementById("blue_color_example");
    el.style.background = event.target.value;
}

const you_defaultColor = "#e5e5ea";
const colorPicker2 = document.getElementById("you_message_color");
colorPicker2.value = you_defaultColor;
colorPicker2.addEventListener("input", update_you_color);
colorPicker2.select();
function update_you_color(event) {
    const el = document.getElementById("gray_color_example");
    el.style.background = event.target.value;
}

function reset_worksin_colors(){
    //worksin me color replacement
    me_color.replaceChildren()
    me_tail_color.replaceChildren()
    me_typing_color.replaceChildren()
    me_typing_color_after.replaceChildren()
    var me_col = "#1289fe"
    me_color.insertAdjacentText("beforeEnd", `${me_col}`)
    me_tail_color.insertAdjacentText("beforeEnd", `${me_col}`)
    me_typing_color.insertAdjacentText("beforeEnd", `${me_col}`)
    me_typing_color_after.insertAdjacentText("beforeEnd", `${me_col}`)
    //example me color replacement
    const me_el = document.getElementById("blue_color_example");
    me_el.style.background = me_col;

    //worksin you color replacement
    you_color.replaceChildren()
    you_tail_color.replaceChildren()
    you_typing_color.replaceChildren()
    you_typing_color_after.replaceChildren()
    var you_col = "#e5e5ea"
    you_color.insertAdjacentText("beforeEnd", `${you_col}`)
    you_tail_color.insertAdjacentText("beforeEnd", `${you_col}`)
    you_typing_color.insertAdjacentText("beforeEnd", `${you_col}`)
    you_typing_color_after.insertAdjacentText("beforeEnd", `${you_col}`)
    //example you color replacement
    const you_el = document.getElementById("gray_color_example");
    you_el.style.background = you_col;
}

function update_worksin_colors(){
    me_color.replaceChildren()
    me_tail_color.replaceChildren()
    me_typing_color.replaceChildren()
    me_typing_color_after.replaceChildren()
    var me_col = document.getElementById("me_message_color").value
    console.log(me_col)
    // var el = document.getElementById("blue_color_example")
    // el.style.background = col
    // var el = document.getElementsByClassName("breply")
    // var el_aft = window.getComputedStyle(el, '::after');
    // console.log(content)
    // for(let e of el){
    // e.style.background = col
    // }
    // el.style.background = col
    me_color.insertAdjacentText("beforeEnd", `${me_col}`)
    me_tail_color.insertAdjacentText("beforeEnd", `${me_col}`)
    me_typing_color.insertAdjacentText("beforeEnd", `${me_col}`)
    me_typing_color_after.insertAdjacentText("beforeEnd", `${me_col}`)

    you_color.replaceChildren()
    you_tail_color.replaceChildren()
    you_typing_color.replaceChildren()
    you_typing_color_after.replaceChildren()
    var you_col = document.getElementById("you_message_color").value
    console.log(you_col)
    // var el = document.getElementById("gray_color_example")
    // el.style.background = col
    // var el_aft = window.getComputedStyle(el, '::after');
    // console.log(content)
    // for(let e of el){
    // e.style.background = col
    // }
    // el.style.background = col
    you_color.insertAdjacentText("beforeEnd", `${you_col}`)
    you_tail_color.insertAdjacentText("beforeEnd", `${you_col}`)
    you_typing_color.insertAdjacentText("beforeEnd", `${you_col}`)
    you_typing_color_after.insertAdjacentText("beforeEnd", `${you_col}`)
}
