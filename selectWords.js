

//Initial set-up
function inspectRefsAndMeta(block){
    document.getElementsByClassName('inspectionBlock')[0].style.display = 'block'
    document.getElementsByClassName("document")[0].style.paddingLeft = "120px"
    document.addEventListener('click', function(e) {
        e = e || window.event;
        var target = e.target || e.srcElement
        redHighlightTextbox(target)
    }, false);

    //make copy of current version
    //save outgoing version?

    clearInspectionBlock()
    populateInspectionBlock(block)
}

function clearInspectionBlock(){
    document.getElementsByClassName('inspectionBlock')[0].innerHTML = ''
}

function populateInspectionBlock(block){
    let inspection_block = document.getElementsByClassName('inspectionBlock')[0]
    let text = textBlock(block).getAttribute('text').split(' ')
    var span_text = ''
    for (word of text){span_text += '<span>'+ word +' </span>'}
    let word_ids = textBlock(block).getAttribute('word_ids').split(',')
    let refs_block  = refsBlock(block).getElementsByClassName('ref_block')
    let refs = refsBlock(block).getElementsByClassName('ref')
    inspection_block.innerHTML += "<div class='inspection_text_block'>"+ span_text +"</div>"
    inspection_block.innerHTML += "<div class='inspection_refs_block'>REFERENCES</div>"
    // inspection_block.innerHTML += "<div class='inspection_meta_block'>META-DATA  ----------     UNDER CONSTRUCTION</div>"

    loadInRefsBlocks(refs_block, inspection_block, word_ids)
    // loadMeta(inspection_block, word_ids)
    loadEndButtons(inspection_block)
}

function loadEndButtons(inspection_block){
    let reset_button = "<button onclick=reset_button() class='reset_button'>RESET</button>"
    let apply_button = "<button onclick=apply_button() class='apply_button'>APPLY</button>"
    inspection_block.innerHTML += "<div>"+ reset_button + apply_button +"</div>"
}

function reset_button(){
    document.getElementsByClassName('inspectionBlock')[0].style.display = 'none'
    document.getElementsByClassName('inspectionBlock')[0].innerHTML = ''
    document.getElementsByClassName("document")[0].style.paddingLeft = "300px"
}

function apply_button(){
    document.getElementsByClassName('inspectionBlock')[0].style.display = 'none'
    document.getElementsByClassName('inspectionBlock')[0].innerHTML = ''
    document.getElementsByClassName("document")[0].style.paddingLeft = "300px"
}

function redHighlightTextbox(e){
    let classes = ['ref_text', 'ref_level', 'ref_path', 'ref_regminer_id', 'meta_type', 'meta_text']
    if ( classes.includes(e.className) ){
        e.style.backgroundColor = "lightpink"
    }
}




// REFERENCES
function loadInRefsBlocks(refs_block, inspection_block, word_ids){
    for (ref_block of refs_block){
        let refs = ref_block.getElementsByClassName('ref')
        let text = (refs[0].getAttribute('ref'))//.replace(/\+/g, ' ')
        let ref_word_ids = refs[0].getAttribute('word_IDs')
        let regminer_id = refs[0].getAttribute('regminer_id')

        let input_text        = "Text: <input id='ref_input' class='ref_text' value="+ text +">"
        let input_word_ids    = "WordIds: <input id='ref_input' class='ref_word_ids' value="+ ref_word_ids +">"
        let input_regminer_id = "Regminer-ID: <input id='ref_input' class='ref_regminer_id' value="+ regminer_id +">"
        let update_button     = "<button onclick=updateBlockDefiner(this.parentElement) class='update_block_button'>Update</button>"
        let delete_block_button = "<button onclick=deleteReferenceBlock(this.parentElement.parentElement) class='delete_ref_block_button'>-</button>"

        let ref_block_definer = "<div class='ref_block_definer'>" + input_regminer_id + update_button + delete_block_button + '<br>' + input_text + '<br>' + input_word_ids + "</div>"
        let inspection_ref_block = "<div class='inspection_ref_block'>" + ref_block_definer + "</div>"
        inspection_block.getElementsByClassName('inspection_refs_block')[0].innerHTML += inspection_ref_block

        loadInRefLines(refs, inspection_block, word_ids)
    }
    let add_ref_block_button = "<button onclick=addReferenceBlock(this.parentElement.parentElement) class='add_ref_block_button'>Add Reference Block</button>"
    document.getElementsByClassName('inspection_refs_block')[0].innerHTML += "<div class='add_block_button'>"+ add_ref_block_button + "</div>"
}

function loadInRefLines(refs, inspection_block, word_ids){
    for (ref of refs){
        // let amendment = ref.getAttribute('amendment')
        // let doc_name = ref.getAttribute('doc_name')
        // let end_point =  ref.getAttribute('end_point')
        let level = ref.getAttribute('level')
        let ref_word_ids = ref.getAttribute('word_IDs').split(',')
        let path = ref.getAttribute('path')
        let reference = (ref.getAttribute('ref')).replace(/\+/g, ' ')
        // let ref_count = ref.getAttribute('ref_count')
        let regminer_id = ref.getAttribute('regminer_id')
        // let start_point = ref.getAttribute('start_point')

        let input_level       = "Level: <input id='ref_input' class='ref_level' value="+ level +">"
        let input_path        = "Path:  <input id='ref_input' class='ref_path' value="+ path +">"
        let input_regminer_id = "RegId: <input id='ref_input' class='ref_regminer_id' value="+ regminer_id +">"
        let update_button     = "<button onclick=updateReference(this.parentElement) class='update_button'>Update</button>"
        let delete_button     = "<button onclick=deleteReference(this.parentElement) class='delete_button'>Delete</button>"
        let reference_line    = "<div class='reference_line'>"+ input_level + input_path + update_button + delete_button + "</div>"

        let inspection_ref_block = inspection_block.getElementsByClassName('inspection_ref_block')
        last_inspection_ref_block = inspection_ref_block[inspection_ref_block.length-1]
        last_inspection_ref_block.innerHTML += reference_line
        color_refs(ref_word_ids, word_ids)
    }

    let add_ref_button = "<button onclick=addReference(this.parentElement.parentElement) class='add_ref_button'>+</button>"
    last_inspection_ref_block.innerHTML += "<div class='add_button'>"+ add_ref_button + "</div>"
}

function color_refs(ref_word_ids, word_ids){
    let start = word_ids.indexOf((ref_word_ids[0]))
    let end = start + ref_word_ids.length

    let word_spans = document.getElementsByClassName('inspection_text_block')[0].getElementsByTagName('span')

    for (i=start; i<end; i++){
        word_spans[i].style.backgroundColor = 'greenyellow'
    }
} 

function addReferenceBlock(inspection_refs_block){
    // let refs = ref_block.getElementsByClassName('ref')
    // let text = (refs[0].getAttribute('ref')).replace(/\+/g, ' ')
    // let word_ids =refs[0].getAttribute('word_IDs')
    // let regminer_id = refs[0].getAttribute('regminer_id')

    // Block definer
    let input_text        = "Text: <input id='ref_input' class='ref_text' value=''>"
    let input_word_ids    = "WordIds: <input id='ref_input' class='ref_word_ids' value=''>"
    let input_regminer_id = "Regminer-ID: <input id='ref_input' class='ref_regminer_id' value=''>"
    let update_button     = "<button onclick=updateBlockDefiner(this.parentElement) class='update_block_button'>Update</button>"
    let delete_block_button = "<button onclick=deleteReferenceBlock(this.parentElement.parentElement) class='delete_ref_block_button'>-</button>"
    let ref_block_definer = "<div class='ref_block_definer'>"+ input_regminer_id + update_button + delete_block_button + '<br>' + input_text + '<br>' + input_word_ids  + "</div>"

    // First ref/path line
    let input_level    = "Level: <input id='ref_input' class='ref_level'>"
    let input_path     = "Path:  <input id='ref_input' class='ref_path'>"
    update_button  = "<button onclick=updateReference(this.parentElement) class='update_button'>Update</button>"
    let delete_button  = "<button onclick=deleteReference(this.parentElement) class='delete_button'>Delete</button>"
    let reference_line = "<div class=reference_line>"+ input_level + input_path + update_button + delete_button + "</div>"
    let add_ref_button = "<div class='add_button'><button onclick=addReference(this.parentElement.parentElement) class='add_ref_button'>+</button></div>"

    let inspection_ref_block = "<div class='inspection_ref_block'>" + ref_block_definer + reference_line + add_ref_button + "</div>"

    //Delete add button
    let element = inspection_refs_block.getElementsByClassName('add_block_button')[0]
    element.parentNode.removeChild(element)

    //Add new line
    inspection_refs_block.innerHTML += inspection_ref_block

    //Add new add button
    let add_ref_block_button = "<button onclick=addReferenceBlock(this.parentElement.parentElement) class='add_ref_block_button'>Add Reference Block</button>"
    inspection_refs_block.innerHTML += "<div class='add_block_button'>"+ add_ref_block_button + "</div>"

}

function deleteReferenceBlock(e){
    let check = confirm("Are you sure you want to delete this reference block?")
    if (check){
        e.parentNode.removeChild(e)
    }

}

function findRefIndexWordIds(){
    // Determine word_ids and so on
}

function updateBlockDefiner(e){
    let text = e.getElementsByClassName('ref_text')[0]
    let regminer_id = e.getElementsByClassName('ref_regminer_id')[0]

    text.style.backgroundColor = 'white'
    regminer_id.style.backgroundColor = 'white'

    text.setAttribute('value', text.value)
    regminer_id.setAttribute('value', regminer_id.value)
}

function updateReference(e){
    let level = e.getElementsByClassName('ref_level')[0]
    let path = e.getElementsByClassName('ref_path')[0]
    let regminer_id = e.getElementsByClassName('ref_regminer_id')[0]

    level.style.backgroundColor = 'white'
    path.style.backgroundColor = 'white'
    regminer_id.style.backgroundColor = 'white'

    level.setAttribute('value', level.value)
    path.setAttribute('value', path.value)
    regminer_id.setAttribute('value', regminer_id.value)
}

function deleteReference(e){
    let check = confirm("Are you sure you want to delete this reference?")
    if (check){
        e.parentNode.removeChild(e)
    }
}

function addReference(inspection_ref_block){
    let input_level       = "Level: <input id='ref_input' class='ref_level'>"
    let input_path        = "Path:  <input id='ref_input' class='ref_path'>"
    let update_button     = "<button onclick=updateReference(this.parentElement) class='update_button'>Update</button>"
    let delete_button     = "<button onclick=deleteReference(this.parentElement) class='delete_button'>Delete</button>"
    let reference_line    = "<div class=reference_line>"+ input_level + input_path + update_button + delete_button + "</div>"

    //Delete add button
    let element = inspection_ref_block.getElementsByClassName('add_button')[0]
    element.parentNode.removeChild(element)

    //Add new line
    inspection_ref_block.innerHTML += reference_line

    //Add new add button
    let add_ref_button = "<button onclick=addReference(this.parentElement.parentElement) class='add_ref_button'>+</button>"
    inspection_ref_block.innerHTML += "<div class='add_button'>"+ add_ref_button + "</div>"
}




// ACTUAL META DATA
function loadMeta(inspection_block, word_ids){
    let input_type = "Type: <input id='meta_input' class='meta_type' value='type of meta (dropdown list)'>"
    let input_text = "Text: <input id='meta_input' class='meta_text' value='Publication date is yesterday'>"
    let update_button = "<button class='update_button'>Update</button>"
    let delete_button = "<button class='delete_button'>Delete</button>"
    inspection_block.getElementsByClassName('inspection_meta_block')[0].innerHTML += "<div>"+ input_type + input_text + update_button + delete_button + "</div>"

    let add_meta_button = "<button class='add_meta_button'>Add Meta</button>"
    inspection_block.getElementsByClassName('inspection_meta_block')[0].innerHTML += "<div>"+ add_meta_button + "</div>"
}






