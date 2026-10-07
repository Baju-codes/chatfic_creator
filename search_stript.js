// const search_form_output = document.getElementById('search_form_output')
const search_term = document.getElementById("search_term")
const engine_input = document.getElementById("insert_logo_here")
const autcomplete_input = document.getElementById("search_autocomplete")
const dym_input = document.getElementById("dym_here")
const search_stats_input = document.getElementById("search_stats_here")
const search_html_output = document.getElementById("search_html_output")
const skin_custom_color = document.getElementById("custom_color")



function checkIfCustom(that) {
    if (that.value == "Custom") {
        document.getElementById("custom_engine_inputs").style.display = "block";
    } else {
        document.getElementById("custom_engine_inputs").style.display = "none";
    }
}


function SubmitSearchForm(){
    search_html_output.replaceChildren()
    document.getElementById("search_result_view").style.display = "block";
    // search_form_output.replaceChildren()
    search_term.replaceChildren()
    engine_input.replaceChildren()
    autcomplete_input.replaceChildren()
    dym_input.replaceChildren()
    search_stats_input.replaceChildren()
    var res = document.getElementById("search_form_input")
    var engine_type = res[0].value
    var custom_name = res[1].value
    var custom_color = res[2].value
    var query = res[3].value
    var dym = res[4].value
    var search_stats = res[5].value
    var autocompletes = res[6].value
    let messages = autocompletes.split("\n")
    var LOGO = ""
    var AUTOCOMPLETE = ``
    var SEARCH_TERM = ""
    var DYM = ""
    // var SEARCH_STATS = ""
    // search_form_output.insertAdjacentText("beforeEnd", `${messages}`)
    if (query == ""){
       search_term.insertAdjacentText("beforeEnd", `${"|"}`) 
       SEARCH_TERM = "|"
    }
    else{
        search_term.insertAdjacentText("beforeEnd", `${query}`)
        // search_term.insertAdjacentText("beforeEnd", `${" |"}`)
        SEARCH_TERM = query
    }

    if (engine_type == "Default"){
       engine_input.insertAdjacentHTML("beforeEnd", `<p class="search_logo default_logo">Search &#128270;</p>`)
       LOGO = `<p class="search_logo default_logo">Search &#128270;<span class="hide"> Engine <br /><br />Search Term:</span> </p>`
    }
    else if (engine_type == "Google"){
        engine_input.insertAdjacentHTML("beforeEnd", `<p class="search_logo google_logo">
                    <span class="google_blue">G</span>
                    <span class="google_red">o</span>
                    <span class="google_yellow">o</span>
                    <span class="google_blue">g</span>
                    <span class="google_green">l</span>
                    <span class="google_red">e</span>
                </p>`)
        LOGO = `<p class="search_logo google_logo">
                    <span class="google_blue">G</span>
                    <span class="google_red">o</span>
                    <span class="google_yellow">o</span>
                    <span class="google_blue">g</span>
                    <span class="google_green">l</span>
                    <span class="google_red">e</span>
                <span class="hide"> Search Engine <br /><br />Search Term:</span> </p>`
    }
    else if (engine_type == "Old Google"){
        engine_input.insertAdjacentHTML("beforeEnd", `<p class="search_logo googleold_logo">
                    <span class="google_blue">G</span>
                    <span class="google_red">o</span>
                    <span class="google_yellow">o</span>
                    <span class="google_blue">g</span>
                    <span class="google_green">l</span>
                    <span class="google_red">e</span>
                </p>`)
        LOGO = `<p class="search_logo googleold_logo">
                    <span class="google_blue">G</span>
                    <span class="google_red">o</span>
                    <span class="google_yellow">o</span>
                    <span class="google_blue">g</span>
                    <span class="google_green">l</span>
                    <span class="google_red">e</span>
                <span class="hide"> Search Engine <br /><br />Search Term:</span> </p>`
    }
    else if (engine_type == "Custom"){
       engine_input.insertAdjacentHTML("beforeEnd", `<p class="search_logo custom_logo" style="color:${custom_color};">${custom_name}</p>`)
    //    var custom_color_output = document.getElementById("custom_logo")
    //    custom_color_output.style.color = custom_color
        LOGO = `<p class="search_logo custom_logo">${custom_name} <span class="hide"> Search Engine <br /><br />Search Term:</span> </p>`
    }

    if (autocompletes !== ""){
        for(let item of messages){
            autcomplete_input.insertAdjacentHTML("beforeEnd", `<p class="search_autocomplete"> <span>${query} <b>${item}</b></span><br/> </p>`)
            AUTOCOMPLETE += `<div><p class="search_autocomplete"> <span class="hide">Search Autocomplete Sugestion:</span> <span>${query} <b>${item}</b></span><br/> </p> </div>` 
        }
    }
    
    if (dym !== ""){
        dym_input.insertAdjacentHTML("beforeEnd", `<span class="search_dym1">Did you mean: </span><span class="search_dym2">${dym}</span>`)
        DYM = `<span class="search_dym1">Did you mean: </span><span class="search_dym2">${dym}</span>`
    }
    if (search_stats !== ""){
        search_stats_input.insertAdjacentHTML("beforeEnd", `${search_stats}`)
    }
    
    // search_form_output.insertAdjacentText("beforeEnd", `${item}`)
    // search_form_output.insertAdjacentHTML("beforeEnd", "<br>")



    // handling the raw html
    search_html_output.insertAdjacentText("beforeEnd", `<p><span class="hide">Start of search engine</span></p>`)
    search_html_output.insertAdjacentText("beforeEnd", `<div class="browser">`)
    // search_html_output.insertAdjacentHTML("beforeEnd", "<br>")
    search_html_output.insertAdjacentText("beforeEnd", `<p> ${LOGO} </p>`)
    // search_html_output.insertAdjacentHTML("beforeEnd", "<br>")
    search_html_output.insertAdjacentText("beforeEnd", `<p class="search_bar"> <span class="search_term"> ${SEARCH_TERM} </span></p>`)
    // search_html_output.insertAdjacentHTML("beforeEnd", "<br>")
    if (autocompletes !== ""){
        search_html_output.insertAdjacentText("beforeEnd", `${AUTOCOMPLETE}`)
        // search_html_output.insertAdjacentHTML("beforeEnd", "<br>")
    }
    
    if (dym !== ""){
        search_html_output.insertAdjacentText("beforeEnd", `<p class="search_dym"> ${DYM} </p>`)
        // search_html_output.insertAdjacentHTML("beforeEnd", "<br>")
    }
    if (search_stats !== ""){
        search_html_output.insertAdjacentText("beforeEnd", `<p class="search_stats"> <span class="hide">Search resulted in:</span> ${search_stats}</p>`)
        // search_html_output.insertAdjacentHTML("beforeEnd", "<br>")
    }
    
    search_html_output.insertAdjacentText("beforeEnd", `<p><span class="hide">End of search engine</span></p>`)
    search_html_output.insertAdjacentText("beforeEnd", `</div>`)

    //workskin custom searcg color handling
    skin_custom_color.replaceChildren()
    skin_custom_color.insertAdjacentText("beforeEnd", `${custom_color}`)

}


function Del_search(){
    document.getElementById("search_result_view").style.display = "none";
    // search_form_output.replaceChildren()
    search_term.replaceChildren()
    engine_input.replaceChildren()
    autcomplete_input.replaceChildren()
    dym_input.replaceChildren()
    search_html_output.replaceChildren()
}


function copy_raw_text_output(id){
    var r = document.createRange()
    r.selectNode(document.getElementById(id))
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(r)
    document.execCommand('copy')
    window.getSelection().removeAllRanges()
}



function toggle_general_ex(){
    var x = document.getElementById("general_search_ex")
    var y = document.getElementById("dym_ex")
    var z = document.getElementById("custom_search_ex")
    var a = document.getElementById("workskin_ex")
    var b = document.getElementById("search_stats_ex")
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

function toggle_dym_ex(){
    var x = document.getElementById("general_search_ex")
    var y = document.getElementById("dym_ex")
    var z = document.getElementById("custom_search_ex")
    var a = document.getElementById("workskin_ex")
    var b = document.getElementById("search_stats_ex")
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

function toggle_custom_search_ex(){
    var x = document.getElementById("general_search_ex")
    var y = document.getElementById("dym_ex")
    var z = document.getElementById("custom_search_ex")
    var a = document.getElementById("workskin_ex")
    var b = document.getElementById("search_stats_ex")
    x.style.display = "none"
    y.style.display = "none"
    a.style.display = "none"
    b.style.display = "none"
    if (z.style.display === "block") {
        z.style.display = "none"
    } else {
        z.style.display = "block"
    }
}

function toggle_workskin_ex(){
    var x = document.getElementById("general_search_ex")
    var y = document.getElementById("dym_ex")
    var z = document.getElementById("custom_search_ex")
    var a = document.getElementById("workskin_ex")
    var b = document.getElementById("search_stats_ex")
    x.style.display = "none"
    y.style.display = "none"
    z.style.display = "none"
    b.style.display = "none"
    if (a.style.display === "block") {
        a.style.display = "none"
    } else {
        a.style.display = "block"
    }
}


function toggle_search_stats_ex(){
    var x = document.getElementById("general_search_ex")
    var y = document.getElementById("dym_ex")
    var z = document.getElementById("custom_search_ex")
    var a = document.getElementById("workskin_ex")
    var b = document.getElementById("search_stats_ex")
    x.style.display = "none"
    y.style.display = "none"
    z.style.display = "none"
    a.style.display = "none"
    if (b.style.display === "block") {
        b.style.display = "none"
    } else {
        b.style.display = "block"
    }
}
