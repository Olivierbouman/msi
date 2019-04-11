

function exportToJsonFile() {
    if (getBlocks().length==0){
        return
    }
    if (checkForUnchecked()){
        var file_name = document.getElementsByClassName('document')[0].getAttribute('id')
        var json_output = convertHTMLToJSON()
        var dataStr = JSON.stringify(json_output)
        var dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
        var exportFileDefaultName = file_name
        var linkElement = document.createElement('a')
        linkElement.setAttribute('href', dataUri)
        linkElement.setAttribute('download', exportFileDefaultName)
        linkElement.click()
    }
}

function download(URL, name){
    uri = URL.slice(0, 2050000)
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}

function checkForUnchecked(){
    blocks = getBlocks()
    for (block of blocks){
        if (levelId(block).match(/no_level/i)){
            var check = confirm("Are you sure you want to save?\nNot all blocks have been assigned yet :)\nPress OK if you want to save anyway.")
            if (check==false) {
                if (block.getAttribute('id')=='p1_b1'){
                    jumpToBlock(block)
                } else {
                    jumpToBlock(block)
                }
                return false
            } else {
                return true
            }
        }
    }
    return true
}

function addButtons(json) {
    button_names = []
    buttons = document.getElementsByClassName('levelConfirm')
    for (button of buttons){
        button_names.push(button.innerText)
    }
    json['buttons'] = button_names
}

function de_mulitply_and_round_number(number){
    const multiplier = 1.34
    return (number/multiplier).toFixed(2)

}


function convertHTMLToJSON(){
    // {block_id: {level_id, level_number, meta_data: [], refs: [], abs_lvl, cor: {hpos, vpos, height, width}, words, word_ids: [], font_id, amendment, regminer_id}}
    
    var json = {}
    blocks = getBlocks()
    for (var block of blocks) {

        console.log(block)

        var text_block   = textBlock(block)
        var text         = text_block.getAttribute('text')
        var word_ids     = text_block.getAttribute('word_ids')
        var block_id     = blockId(block)
        var level_id     = levelId(block)
        var level_number = levelNumber(block)
        var font_id      = fontId(block)
        var meta_data    = []
        var refs         = []
        var regminer_id  = 'this_is_a_regminer_id'

        var cor = {}
        cor['hpos']   = de_mulitply_and_round_number(number(block.getAttribute('clean_hpos')))
        cor['vpos']   = de_mulitply_and_round_number(number(block.style.top))
        cor['height'] = de_mulitply_and_round_number(number(block.style.height))
        cor['width']  = de_mulitply_and_round_number(number(block.style.width))

        var block_info = {'level_id': level_id, 'level_number': level_number, 'meta_data': meta_data, 'refs': refs, 
                            'cor': cor, 'words': text, 'word_ids': word_ids, 'font_id': font_id, 'regminer_id': regminer_id}
        json[block_id] = block_info

    }
    addButtons(json)

    console.log('html converted to json!')

    return json
}


