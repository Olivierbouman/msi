

// Main functions
function findLevelNumberMeta(block){
    // block.style.zIndex = 1
    text = textBlock(block).getAttribute('text')

    text = check_for_spaces(text)

    var letter_number     = levelNumberRegex('(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty)')
    var roman_number      = levelNumberRegex('([ivxc]+)')
    var letter_brackets   = levelNumberRegex('\\(([A-Z]    )\\)')   // (A)
    var number_dot_number = levelNumberRegex('(\\d+\\.\\d+)') // 10.2
    var number_brackets   = levelNumberRegex('\\((\\d+)\\)')    // (1)
    var number            = levelNumberRegex('(\\d+)[.:;]?')  // 1[.:;]?

    if ( text.match(letter_number) ) { // ONE
        meta = text.match(letter_number)
        return [meta, 'letter_number']

    } else if ( text.match(roman_number) ) { // (A)
        meta = text.match(roman_number)
        return [meta, 'roman_number']
    
    } else if ( text.match(letter_brackets) ) { // (A)
        meta = text.match(letter_brackets)
        return [meta, 'letter_brackets']

    } else if ( text.match(number_dot_number) ) { // 10.2
        meta = text.match(number_dot_number)
        return [meta, 'number_dot_number']

    } else if ( text.match(number_brackets) ) { // (1)
        meta = text.match(number_brackets)
        return [meta, 'number_brackets']

    } else if ( text.match(number) ) {  // 1[.:;]?
        meta = text.match(number)
        return [meta, 'number']
    } else {
        return [false, false]
    }
}

function findLevelNumber(block, override){
    [meta, level_number_type] = findLevelNumberMeta(block)

    if (override=='active'){
        level_number = block.getAttribute('level_number')
        setFontLevelNumber(level_number, block)
    } else if (!meta){
        setFontLevelNumber('None', block)
    } else {
        setFontLevelNumber(meta[2], block)
    }
}

function assignLevelCode(block){
    [meta, level_number_type] = findLevelNumberMeta(block)
    if (!meta){return 'none'}

    if ( meta[1]!==undefined ){
        return level_code = meta[1].replace(/ /g,'') + '_' + level_number_type
    } else {
        return level_code = level_number_type
    }
}

function checkForLevelNumber(block){
    [meta, level_number_type] = findLevelNumberMeta(block)
    if (!meta) {
        return false
    } else {
        return true
    }
}



// Tooling functions
function setFontLevelNumber(level_number, block){
    number_block = numberBlock(block)
    number_block.style.minWidth = Math.max(level_number.length*10, 50) + 'px'
    number_block.innerHTML = '<span style="border: 6px solid lightblue; background-color: lightblue; border-radius: 5px; font-family: Helvetica;">'+ level_number +'</span>'
    block.setAttribute('level_number', level_number)
}

function levelNumberRegex(number_reg){
    levels = document.getElementsByClassName('levelConfirm')
    levels_array = []
    for (level of levels){
        levels_array.push(level.value)
        levels_array.push(((level.value).split('')).join(' ')   )
    }
    
    levels_reg = '(' + levels_array.join(' ?|') + ' ?)?'
    return new RegExp('^' + levels_reg + number_reg + '(?: [A-Z\']|$)', "i")
}

function resetLevelNumber(block){
    numberBlock(block).innerHTML = ''
    numberBlock(block).style.minWidth = ''
    block.setAttribute('level_number', 'no_level_number')
}

function check_for_spaces(text){
    new_text = ''
    sep_text = text.split(' ')
    for (i of sep_text){
        if (i.length > 1){
            return text
        } else if ( typeof(i)!=='number' ){
            new_text += i
        } else {
            new_text += ' ' + i + ' '
        }
    }
    return new_text
}




// Manually change level functions
function createAdjustLevelButton(block) {
    var number_block = numberBlock(block)
    var block_id = blockId(block)

    page = getPage(block) - 1
    if (block.style.justifyContent == 'flex-end'){ //left column
        var top = number(block.style.top) + Math.max(0.25*number(block.style.height), 40) + page*1135
        var left = 360//number(block.style.left) - 25
    } else { //right column
        var top = number(block.style.top) + Math.max(0.25*number(block.style.height), 40) + page*1135
        var left = '1280'
    }

    var position = 'width:100px; top:'+ top +'px; left:'+ left +'px; position: absolute; '
    var styling  = 'visibility: visible'
    
    button = document.getElementById('change_level')
    button.style = position + styling
    button.setAttribute('block_id', block_id)

    number_block.contentEditable="true"
    number_block.focus()
}

function adjustLevel() {
    button       = document.getElementById('change_level')
    button.style = "visibility: hidden"
    block_id     = button.getAttribute('block_id')

    for (block of getBlocks()){
        if (block_id == blockId(block)){
            number_block = numberBlock(block)
            correct_block = block
        }
    }

    level_number = number_block.innerText
    setFontLevelNumber(level_number, correct_block)
    number_block.contentEditable="false"
}

