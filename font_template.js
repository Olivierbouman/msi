


function fontDefault(block){
    // Text Block
    resetLevelNumber(block)
    text_block = textBlock(block)
    text_block.style.border="0px solid rgb(250, 250, 250)"
    text_block.style.backgroundColor="white"
    text_block.style.opacity = "0"
    text_block.style.borderRadius="0px"

    // Span Text
    var span_text   = block.getElementsByTagName('span')[0]
    span_text.innerText = ''
    span_text.style = ''

    // Block
    block.style.paddingBottom = "0px"
    block.setAttribute('level_id', 'no_level_' + blockId(block))
}

function fontSelected(block, override){
    // Text Block
    if (override!='active'){resetLevelNumber(block)}
    text_block = textBlock(block)
    text_block.style.border="0px solid rgb(255, 178, 90)"
    text_block.style.backgroundColor="rgb(255, 178, 90)"
    text_block.style.opacity = ".5"
    text_block.style.borderRadius="5px"

    // Span Text
    if (override!='active'){
        var span_text = block.getElementsByTagName('span')[0]
        span_text.innerText = ''
        span_text.style = ''}

    // Block
    block.style.paddingBottom = '0px'
    block.setAttribute('level_id', 'no_level_' + blockId(block))
}



function fontSuggestionTop(block, level_suggestion){
    // Text Block
    findLevelNumber(block)
    text_block = textBlock(block)
    text_block.style.border="0px solid rgb(255, 178, 90)"
    text_block.style.backgroundColor="rgb(255, 178, 90)"
    text_block.style.opacity = ".5"
    text_block.style.borderRadius="2px 2px 0px 0px"

    // Span Text
    var span_text   = block.getElementsByTagName('span')[0]
    span_text.innerText = level_suggestion.charAt(0).toUpperCase() + level_suggestion.slice(1).replace('_',' ') + '?'
    span_text.style = "display: inline-block; width:100%; background-color:rgb(244, 188, 25, 0.95); font-size:30px;font-family: Arial; font-color:black; color:darkblue ; border-radius: 5px; transition: all 0.4s ease"

    // Block
    block.style.paddingBottom = "0px"
    block.setAttribute('level_id', 'no_level_' +  blockId(block))
}

function fontSuggestionMiddle(block){
    // Text Block
    resetLevelNumber(block)
    text_block = textBlock(block)
    text_block.style.border="0px solid rgb(255, 178, 90)"
    text_block.style.backgroundColor="rgb(255, 178, 90)"
    text_block.style.opacity = ".5"
    text_block.style.borderRadius="0px 0px 0px 0px"

    // Span Text
    var span_text   = block.getElementsByTagName('span')[0]
    span_text.innerText = ''
    span_text.style = ''

    // Block
    block.style.paddingBottom = "0px"
    block.setAttribute('level_id', 'no_level_' + blockId(block))
}

function fontSuggestionBottom(block, first_is_last, level_suggestion){
    // Text Block
    resetLevelNumber(block)
    text_block = textBlock(block)
    text_block.style.border="0px solid rgb(255, 178, 90)"
    text_block.style.backgroundColor="rgb(255, 178, 90)"
    text_block.style.opacity = ".5"
    text_block.style.borderRadius="0px 0px 6px 2px"

    // Span Text
    if (first_is_last){
        findLevelNumber(block)
        var span_text = block.getElementsByTagName('span')[0]
        span_text.innerText = level_suggestion.charAt(0).toUpperCase() + level_suggestion.slice(1).replace('_',' ') + '?'
        span_text.style = "display: inline-block; width:100%; background-color:rgb(244, 188, 25, 0.95); font-size:30px;font-family: Arial; font-color:black; color:darkblue ; border-radius: 5px; transition: all 0.4s ease"
        } else {
        var span_text = block.getElementsByTagName('span')[0]
        span_text.innerText = ''
        span_text.style = ''
    }

    // Block
    block.style.paddingBottom = "10px"
    block.setAttribute('level_id', 'no_level_' + blockId(block))
}



function fontAssignedTop(block, identifier, level, override){
    // Text Block
    findLevelNumber(block, override)
    var text_block = textBlock(block)
    text_block.style.border="1px solid lightgreen"
    text_block.style.backgroundColor = "lightgreen"
    text_block.style.opacity = ".5"
    text_block.style.borderRadius="2px 2px 0px 0px"

    // Span Text
    var span_text = block.getElementsByTagName('span')[0]
    span_text.innerText = level
    span_text.style = "display: inline-block; width:100%; background-color:rgb(244, 208, 65, 0.95); font-size:20px;font-family: Arial; font-color:black; color:darkblue ; border-radius: 5px; transition: all 0.4s ease"
    
    // Block
    block.style.paddingBottom = "0px"
    block.setAttribute('level_id', level.replace(/ /g,"_").toLowerCase() + "_" + blockId(identifier))
}

function fontAssignedMiddle(block, identifier, level){
    // Text Block
    resetLevelNumber(block)
    var text_block = textBlock(block)
    text_block.style.border="1px solid lightgreen"
    text_block.style.backgroundColor = "lightgreen"
    text_block.style.opacity = ".5"
    text_block.style.borderRadius="0px 0px 0px 0px"

    // Span Text
    var span_text = block.getElementsByTagName('span')[0]
    span_text.innerText = ''
    span_text.style = ''

    // Block
    block.style.paddingBottom = "0px"
    block.setAttribute('level_id', level.replace(/ /g,"_").toLowerCase() + "_" + blockId(identifier))
}

function fontAssignedBottom(block, identifier, level, first_is_last, override){
    // Text Block
    var text_block = textBlock(block)
    text_block.style.border="1px solid lightgreen"
    text_block.style.backgroundColor = "lightgreen"
    text_block.style.opacity = ".5"
    text_block.style.borderRadius="0px 0px 6px 2px"

    // Span Text
    if (first_is_last){
        findLevelNumber(block, override)
        var span_text = block.getElementsByTagName('span')[0]
        span_text.innerText = level
        span_text.style = "display: inline-block; width:100%; background-color:rgb(244, 208, 65, 0.95); font-size:20px;font-family: Arial; font-color:black; color:darkblue ; border-radius: 5px; transition: all 0.4s ease"
    } else {
        resetLevelNumber(block)
        var span_text = block.getElementsByTagName('span')[0]
        span_text.innerText = ''
        span_text.style = ''
    }
    
    // Block
    block.style.paddingBottom = "10px"
    block.setAttribute('level_id', level.replace(/ /g,"_").toLowerCase() + "_" + blockId(identifier))
}



function fontDiscarded(block, level, identifier){
    // Text Block
    resetLevelNumber(block)
    text_block = textBlock(block)
    text_block.style.border="0px solid lightgray"
    text_block.style.backgroundColor="lightgray"
    text_block.style.opacity = "0.5"
    text_block.style.borderRadius="0px 0px 0px 0px"

    // Span Text
    var span_text = block.getElementsByTagName('span')[0]
    span_text.innerText = ''
    span_text.style = "display: inline-block; width:100%; background-color:lightgray; font-size: 16px; font-family: Arial; font-color:black; border-radius: 5px; transition: all 0.4s ease"

    // Block
    block.style.paddingBottom = "0px"
    block.setAttribute('level_id', 'discard_' + blockId(identifier))
}

