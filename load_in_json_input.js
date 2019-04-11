
// Reading in the JSON
function openJSONFile() {
    // Initialize buttons
    document.getElementsByName("radio")[0].checked = false
    document.getElementsByName("radio")[1].checked = false

    if (getBlocks().length==0){
        null
    } else if (confirm("Are you sure you want to open a new file?\nMake sure all data was saved!")==false){
        return
    }
    fileInput = document.createElement("input")
    fileInput.type='file'
    fileInput.style.display='none'
    fileInput.onchange=readFile
    fileInput.func=extract_data
    document.body.appendChild(fileInput)
    clickElem(fileInput)
}

function getTime(){
    let d = new Date()
    let hours = d.getHours()
    let minutes = d.getMinutes()
    let seconds = d.getSeconds()
    let milliseconds = d.getMilliseconds()
    return (hours*60*60 + minutes*60 + seconds + milliseconds/1000).toFixed(3)
}

function delete_old_content(file_name){
    document.getElementsByClassName('all_word_info')[0].innerHTML = ''
    document.getElementById('change_level').style.visibility = 'hidden'
    document.getElementsByClassName('document')[0].innerHTML = '' //'<div class="document" id='+ file_name.replace('.json', '') +'"></div>'
    document.getElementsByClassName('open_sidebar_button')[0].innerText = '☰ ' + file_name.replace('.json', '')
    suggestionData = document.getElementsByClassName('suggestionData')[0]
    for (var i = suggestionData.attributes.length - 1; i >= 1; i--){
        suggestionData.removeAttribute(suggestionData.attributes[i].name)
    }
    for (button of document.getElementsByClassName('levelConfirm')){
        button.parentNode.removeChild(button)
    }
}

function extract_data(contents, file_name) {
    let start_loading = getTime()
    delete_old_content(file_name)

    // pages = [41,45]
    pages = [1, 40]

    console.clear()
    let json = JSON.parse(contents)     // 0.4-300 // 0.4-200 // 0.4-100 // 0.4-50
    console.log('JSON loaded in and parsed', getTime() - start_loading)
    image_path = file_name.replace('.json', '/')
    console.log(image_path)
    loadInPages(image_path, pages)      // 7.5-300 // 6.5-200 // 2.5-100 // 1.8-50
    console.log('Images are loaded in:', getTime() - start_loading)
    setButtons(json['buttons'])
    parseJSON(json, pages)              // 16.5-300 // 12.5-200 // 4.9-100 // 3.1-50
    console.log('Textblocks from json loaded in:', getTime() - start_loading)
    // convertSavedDataToCorrectLayOut()
    convertSavedDataToCorrectLayOut_2() // 100.9-300 // 53.9-200 // 15.8-100 // 6.6-50
    console.log('Saved data is loaded in:', getTime() - start_loading)

    scroll(0,0)
    document.getElementsByName("radio")[0].checked = true
    document.getElementsByName("radio")[1].checked = true

    let end_loading = getTime()
    console.log('done', pages[1], 'pages in', end_loading - start_loading)
}

function loadInPages(image_path, pages){
    i = pages[0]   // Starting page
    url = 'http://127.0.0.1:5500/'+image_path+'pages/page-001.png'
    while (checkIfPagExists(url) && i < pages[1]) {
        if (i>=100){
            path = image_path +'pages/page-'+ i +'.png'
            var image = '<img src="'+ path +'">'
        } else if (i>=10){
            path = image_path +'pages/page-0'+ i +'.png'
            var image = '<img src="'+ path +'">'
        } else {
            path = image_path +'pages/page-00'+ i +'.png'
            var image = '<img src="'+ path +'">'
        }
        var page_html = '<div class="page" id="page_'+ i +'">'+ image +'</div>'
        document.body.getElementsByClassName('document')[0].innerHTML += page_html

        i += 1
        url = 'http://127.0.0.1:5500/' + path
    }
}

function setButtons(buttons) {
    buttons.forEach(function(button, i) {
        button_html = '<button class="levelConfirm" id="button'+ (i+1) +'" value="'+ button +'" onclick=assignLevel(this.value)>'+ button +'</button>'
        document.body.getElementsByClassName('btn-group')[0].innerHTML += button_html
    });
}

function parseJSON(json, pages) {
    for (var block_id in json) {
        if (block_id === 'buttons'||
            block_id === 'all_word_info') { continue }

        page_number = block_id.match(/p(\d+)\_b\d+/)[1]
        if (page_number < pages[0]) { continue }
        if (page_number >= pages[1]) { break }

        let add_on = 0
        let text         = json[block_id]['words']
        let word_ids     = json[block_id]['word_ids']
        let level_id     = json[block_id]['level_id']
        let level_number = json[block_id]['level_number']
        let font_id      = json[block_id]['font_id']
        let refs         = json[block_id]['refs']
        let amendment    = json[block_id]['amendment']
        let regminer_id  = json[block_id]['regminer_id']

        let cor    = json[block_id]['cor']
        let vpos   = mulitply_and_round_number(cor['vpos']) + 'px'
        let hpos   = mulitply_and_round_number(cor['hpos']) + 'px'
        let height = mulitply_and_round_number(cor['height']) + 'px'
        let width  = mulitply_and_round_number(cor['width']) + 'px'

        if (number(hpos) > 400){
            add_on = 5
            prep_hpos = String(115 + number(hpos)) + 'px'
            fill_width = String(870 - number(prep_hpos) - number(width)) + 'px'

            let level_block  = '<div class="level_block"><span></span></div>'
            let number_block = '<div class="number_block"><span></span></div>'
            let fill_block   = '<div class="fill_block" style="flex: 0 0 '+ fill_width +'"></div>'
            let text_block   = '<div class="text_block" style="flex: 0 0 '+ width +'" text="'+ text +'" word_ids="'+ word_ids +'" \
                                regminer_id="'+ regminer_id +'" amendment="'+ amendment +'"></div>'
            let refs_block    = '<div class=refs_block></div>'
    
            var parent_block = '<div class="parent" id='+ block_id +' block_id='+ block_id +' level_id='+ level_id +' level_number='+ level_number +' font_id='+ font_id +' clean_hpos='+ hpos +'\
            style="top:'+ vpos +'; left:'+ prep_hpos +'; width:'+ width +'; height:'+ height +'; justify-content:flex-start;">' + text_block + fill_block + level_block + number_block + refs_block + '</div>'
            
        } else {
            add_on = -3.5
            fill_width = String(-50 + number(hpos)) + 'px'
            prep_hpos = String(125 + number(hpos)) + 'px'

            let level_block  = '<div class="level_block"><span></span></div>'
            let number_block = '<div class="number_block"><span></span></div>'
            let fill_block   = '<div class="fill_block" style="flex: 0 0 '+ fill_width +'"></div>'
            let text_block   = '<div class="text_block" style="flex: 0 0 '+ width +'" text="'+ text +'" word_ids="'+ word_ids +'"\
                                regminer_id="'+ regminer_id +'" amendment="'+ amendment +'"></div>'
            let refs_block    = '<div class=refs_block></div>'

            var parent_block = '<div class="parent" id='+ block_id +' block_id='+ block_id +' level_id='+ level_id +' level_number='+ level_number +' font_id='+ font_id +' clean_hpos='+ hpos +'\
            style="top:'+ vpos +'; left:'+ prep_hpos +'; width:'+ width +'; height:'+ height +'; justify-content:flex-end;">' + level_block + number_block + fill_block + text_block + refs_block + '</div>'
        }

        document.getElementById('page_' + page_number).innerHTML += parent_block
        populate_refs_block(refs, block_id, json['all_word_info'], cor, add_on)
    }
}


// REFERENCES
function populate_refs_block(refs, block_id, all_word_info, cor, add_on){
    let former_w = []

    for (ref of refs){
        let ref_word_ids = ref['word_IDs']
        let r = [] // ref_line_vpos
        let w = [] // ref_line_word_ids

        for (ref_word_id_array of ref_word_ids){
            for (ref_word_id of ref_word_id_array){
                let ref_word_id_info = all_word_info[ref_word_id]
                let word_vpos = mulitply_and_round_number(ref_word_id_info['VPOS']-cor['vpos'])
                let word_id = ref_word_id

                if ( r.length == 0 ){
                    r = [[word_vpos]]
                    w = [[word_id]]
                } else if ( word_vpos != r[r.length-1][r[r.length-1].length-1] ) {
                    r[r.length] =  [word_vpos]
                    w[w.length] =  [word_id]
                } else {
                    r[r.length-1][r[r.length-1].length] = word_vpos
                    w[w.length-1][w[w.length-1].length] = word_id
                }
            }
        }
        if (!(former_w == w[0][0])){
            add_ref_block(w, block_id)
            add_underline_to_ref_block(all_word_info, w, block_id, cor, add_on)
            add_path_to_ref_block(ref, block_id)
            former_w = w[0][0] // JS isn't Python
        } else {
            add_path_to_ref_block(ref, block_id)
        }
    }

}

function add_ref_block(w, block_id){
    let ref_block = '<div class=ref_block id='+ w +'></div>'
    refsBlock(document.getElementById(block_id)).innerHTML += ref_block
}

function add_underline_to_ref_block(all_word_info, ref_parts, block_id, cor, add_on){
    for (part of ref_parts){
        let f_e = all_word_info[part[0]] // First Element
        let l_e = all_word_info[part[part.length-1]] // Last Element

        let ref_vpos = mulitply_and_round_number(f_e['VPOS'] - cor['vpos'])
        let ref_hpos = mulitply_and_round_number(f_e['HPOS'] - cor['hpos'] + add_on)
        let ref_height = mulitply_and_round_number(f_e['HEIGHT'])
        let ref_width = mulitply_and_round_number((l_e['HPOS'] - cor['hpos']) - (f_e['HPOS'] - cor['hpos']) + l_e['WIDTH'] + 1)

        let word_block = '<div class="refUnderline" style="top:'+ ref_vpos +'px; left:'+ ref_hpos +'px;\
        width:'+ ref_width +'px; height:'+ ref_height +'px;"><span class="refTooltipText"></div>'
        
        let refs_block = refsBlock(document.getElementById(block_id))
        let last_ref_block = refs_block.getElementsByClassName('ref_block')
        last_ref_block = last_ref_block[last_ref_block.length-1]
        last_ref_block.innerHTML += word_block
    }
}

function add_path_to_ref_block(ref, block_id){
    let path = '<div class=ref amendment='+ ref['amendment'] +'  doc_name='+ ref['doc_name'] +'  end_point='+ ref['end_point'] +'  level='+ ref['level'] +' word_ids='+ ref['word_IDs'] +
    '  path='+ ref['path'] + '  ref='+ ref['ref'].replace(/ /g, '+') +'  ref_count='+ ref['ref_count'] +'  regminer_id='+ ref['regminer_id'] +'  start_point='+ ref['start_point'] +'></div>'

    let refs_block = refsBlock(document.getElementById(block_id))
    let last_ref_block = refs_block.getElementsByClassName('ref_block')
    last_ref_block = last_ref_block[last_ref_block.length-1]
    last_ref_block.innerHTML += path


    for (hover_path of last_ref_block.getElementsByClassName('refUnderline')){
        // console.log(hover_path.getElementsByClassName('refTooltopText'))
        hover_path.getElementsByClassName('refTooltipText')[0].innerHTML += ref['level'] + '_' + ref['path'] + '<br>'
    }
}





// Convert saved data back to pdf-view old and new version
// function convertSavedDataToCorrectLayOut(){
//     var blocks = getBlocks()
//     var last_block = blocks[blocks.length-1]
//     var assigned_block = []

//     for (block of blocks){
//         var current_level_id = levelId(block)
//         if (block != last_block){
//             var next_block_color = textBlockBackgroundColor(nextBlock(block))
//             var next_level_id = levelId(nextBlock(block))
//             if (current_level_id==next_level_id){
//                 assigned_block.push(block)
//             } else if (next_block_color=='lightgray'){  //issue with seperated blocks
//                 continue
//             } else {
//                 assigned_block.push(block)
//                 assignSavedLevels(assigned_block)
//                 assigned_block = []
//             }
//         } else if (levelId(last_block)==levelId(blocks[blocks.length-2])){
//             assigned_block.push(block)
//             assignSavedLevels(assigned_block)
//         } else {
//             assignSavedLevels([last_block])
//         }
//     }
// }

// function assignSavedLevels(blocks){
//     if (!levelId(blocks[0]).match(/no_level/i)){
//         level = levelId(blocks[0]).match(/[a-z]+/i)[0]
//         level_to_assign = level.charAt(0).toUpperCase() + level.slice(1)
//         for (block_ of blocks){
//             fontSelected(block_, 'active')
//         }
//         assignLevel(level_to_assign, 'active')
//     }
// }

function convertSavedDataToCorrectLayOut_2(){
    var blocks = getBlocks()
    var all_level_ids = []
    var discard_level_ids = []
    var selected_blocks = []

    //Find the saved level_ids
    for (block of blocks){
        var level_id = levelId(block)
        if (!discard_level_ids.includes(level_id) && level_id.match(/discard/)){
            discard_level_ids.push(level_id)
        } else if (!all_level_ids.includes(level_id) && !level_id.match(/no_level|discard/)) {
            all_level_ids.push(level_id)
        }
    }

    //First assign discarded text blocks
    for (discard of discard_level_ids){
        for (block of blocks){
            if (levelId(block)===discard) {
                selected_blocks.push(block)
            }
        }
        assignSavedLevels_2(selected_blocks, discard)
        selected_blocks = []
    }

    //Re-assign saved level numbers
    for (level_id of all_level_ids){
        for (block of blocks){
            if (levelId(block)===level_id) {
                selected_blocks.push(block)
            }
        }
        assignSavedLevels_2(selected_blocks, level_id)
        selected_blocks = []
    }
}

function assignSavedLevels_2(blocks, level_id){
    level = level_id.match(/[a-z\d]+/i)[0]
    level_to_assign = level.charAt(0).toUpperCase() + level.slice(1)
    for (block of blocks){
        fontSelected(block, 'active')
    }
    assignLevel(level_to_assign, 'active')
}



// Other functions
function mulitply_and_round_number(number){
    const multiplier = 1.34
    return (number*multiplier).toFixed(2)
}

function number(x){
    return Number(x.slice(0,-2))
}

function checkIfPagExists(url) {
    var http = new XMLHttpRequest();
    http.open('GET', url, false);
    http.send();
    if (http.status == 404)
        return false
    else {
        return true
    }
}

function readFile(e) {
    var file = fileInput.files[0]
    var file_name = file.name
    if (!file) {
        return
    }
    var reader = new FileReader()
    reader.onload = function(e) {
        var contents = e.target.result;
        fileInput.func(contents, file_name)
        document.body.removeChild(fileInput)
    }
    reader.readAsText(file)
}

function clickElem(elem) {
    var eventMouse = document.createEvent("MouseEvents")
    eventMouse.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    elem.dispatchEvent(eventMouse)

}

