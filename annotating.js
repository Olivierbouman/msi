
// Annotating the Document
document.addEventListener('click', function(e) {
    selectText(e.target.parentElement, 'click')
}, false);

document.addEventListener('dblclick', function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement
    selectText(target.parentElement, 'dblclick')
}, false);

window.addEventListener('keydown', function(e) {
    if( ['Space','ArrowDown','ArrowUp','ControlLeft','ControlRight','ShiftLeft','ShiftRight','Enter'].includes(e.code) && e.target == document.body) {
        e.preventDefault()
    }
    nextBlockOnSpace(e)
})

// document.addEventListener('contextmenu', function(e) {
//     let inspection_block = document.getElementsByClassName('inspectionBlock')[0].style.display
//     if (e.target.className == 'text_block') {
//         e.preventDefault()
//         if (inspection_block == 'block'){
//             let check = confirm("Are you sure you want to inspect a different block?\nNon-saved data might be lost by this action")
//             if (check){
//                 inspectRefsAndMeta(e.target.parentElement)
//             }
//         } else {
//             inspectRefsAndMeta(e.target.parentElement)
//         }
//     }
// }, false);




// Additional


function nextBlockOnSpace(keypress) {
    if ((keypress.code=='Space'||keypress.code=='ArrowDown') && window.getSelection().anchorNode!=null){
        const blocks = getBlocks()
        const blocks_in_sight = unAssignedBlocksInSight(blocksInSight())
        const first_block_in_sight = blocks[0]

        for (range of [blocks_in_sight, blocks]){
            last_block_of_doc = range[range.length-1]
            for (block of range){
                // Check if there already is an selected block (= pinned block)
                if (block != last_block_of_doc && textBlockBackgroundColor(block)=="rgb(255, 178, 90)"){
                    var pinned_block = block
                }
            }
            // Check if the next unselected block comes after discarded text
            if (pinned_block && pinned_block != last_block_of_doc && textBlockBackgroundColor(nextBlock(pinned_block))=="lightgray"){
                while (textBlockBackgroundColor(nextBlock(pinned_block))=="lightgray"){
                    pinned_block = nextBlock(pinned_block)
                }
                jumpToBlock(nextBlock(pinned_block))
                return
            // Check if the next block isnt assigned yet
            } else if (pinned_block && pinned_block != last_block_of_doc && textBlockBackgroundColor(nextBlock(pinned_block))!="lightgreen"){
                jumpToBlock(nextBlock(pinned_block))
                return
            // in case there isnt a selected block yet
            } else {
                for (block of range){
                    // Search for the last assigned block
                    if ( block != first_block_in_sight && textBlockBackgroundColor(previousBlock(block))=="lightgreen"){
                        console.log('for for for GREEEEEN')
                        pinned_block = block
                    }
                }
                if (pinned_block && pinned_block != last_block_of_doc){
                    jumpToBlock(pinned_block)
                    return
                }
            }
        }
    } else if (keypress.code=='ControlLeft'||keypress.code=='ControlRight'||keypress.code=='ArrowUp'){
        blocks = getBlocks()
        first_block_of_doc = blocks[0]
        for (block of blocks){
            if (textBlockBackgroundColor(block)=="rgb(255, 178, 90)"){
                var current_block = block
            }
        }
        if (current_block) {
            fontDefault(current_block)
            pageScroll(current_block)
        }

    } else if (keypress.code=='ShiftLeft'||keypress.code=='ShiftRight'){
        blocks = getBlocks()
        for (block of blocks){
            if (levelId(block).match(/no_level/i)){
                jumpToBlock(block)
                return
            }
        }
        alert('All done!')
    } else if (keypress.code=='Enter') {
        blocks = getBlocks()
        level = ''
        for (block of blocks){
            if (textBlockBackgroundColor(block)=="rgb(255, 178, 90)"&&
            levelBlock(block).innerText.length > 0){
                level_suggestion = levelBlock(block).innerText
                level = level_suggestion.slice(0,-1)
            }
        }
        if (level.length>0){
            assignLevel(level, true, 'active')
            document.getElementById("mytext").select()
        }
    }
}

function elementInViewport2(block) {
    var top = block.offsetTop;
    var left = block.offsetLeft;
    var width = block.offsetWidth;
    var height = block.offsetHeight;
    while(block.offsetParent) {
        block = block.offsetParent;
        top += block.offsetTop;
        left += block.offsetLeft;
    }
    return (
        top < (window.pageYOffset + window.innerHeight) &&
        left < (window.pageXOffset + window.innerWidth) &&
        (top + height) > window.pageYOffset &&
        (left + width) > window.pageXOffset
    );
}

function blocksInSight(){
    blocks_in_sight = []
    blocks = getBlocks()
    for (block of blocks){
        if (elementInViewport2(block)){
            blocks_in_sight.push(block)
        }
    }
    return blocks_in_sight
}

function unAssignedBlocksInSight(blocks_in_sight){
    un_assigned_blocks_in_sight = []
    first_block_of_doc = getBlocks()[0]
    for (block of blocks_in_sight){
        color = textBlockBackgroundColor(block)
        if (color!="lightgreen" && color!="lightgray" && color!="rgb(255, 178, 90)"){
            un_assigned_blocks_in_sight.push(block)
        }
    }

    return un_assigned_blocks_in_sight

    // if ( !(un_assigned_blocks_in_sight.length>0) ){
    //     first_block_in_sight = un_assigned_blocks_in_sight[0]
    //     if (first_block_in_sight==first_block_of_doc){
    //         return
    //         return [first_block_in_sight]
    //     } else {
    //         previous_block = previousBlock(first_block_in_sight)
    //         return [previous_block]
    //     }
    // } else {
        // return []
    // }
}

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
}


// Selecting text
function dropSelectedBlocks(){
    for (block of getBlocks()){
        if (textBlockBackgroundColor(block)=="rgb(255, 178, 90)"){
            fontDefault(block)
        }
    }
}

// function getRangeClickedBlocks(base_block, extend_block){
//     // Function to get the block_ids of the current click-selection
//     var blocks = getBlocks()
//     var block_array = []
//     for (var block of blocks){
//         block_array.push(block)
//     }
//     base_index = block_array.indexOf(base_block)
//     extend_index = block_array.indexOf(extend_block)
//     if (extend_index>=base_index){
//         var start = block_array.indexOf(base_block)
//         var end = block_array.indexOf(extend_block) + 1
//         var clicked_blocks = block_array.slice(start, end)    
//     } else {
//         var start = block_array.indexOf(extend_block)
//         var end = block_array.indexOf(base_block) + 1
//         var clicked_blocks = block_array.slice(start, end)
//     }
//     return clicked_blocks
// }

function checkForClosedBlock(selected_blocks){
    blocks = getBlocks()
    last_block_of_doc = blocks[blocks.length-1]
    last_block = selected_blocks[selected_blocks.length-1]
    for (block of selected_blocks){
        if (block==last_block_of_doc){
            return false
        }
        block_color = textBlockBackgroundColor(nextBlock(block))
        if (block_color!="rgb(255, 178, 90)" && block_color!="lightgray" && block!=last_block){
            alert('Please select successive blocks to assign a level to')
            return true
        }
    }
    return false
}

function cssForClickingBlocks(block, click){
//Function to colour and reset background of clicked blocks
    var color = textBlockBackgroundColor(block)
    if (color=="rgb(255, 178, 90)"){
        fontDefault(block)
    } else if (color!="lightgreen" && color!="lightgray") {
        fontSelected(block)
    } else if ((color=="lightgreen" || color=="lightgray") && click=='dblclick') {
            var reset_blocks = []
            var level_id = levelId(block)
            for (block_ of getBlocks()){
                if (levelId(block_)==level_id){
                    reset_blocks.push(block_)
                }
            }
            for (block_ of reset_blocks) {
                fontDefault(block_)
            }
    }
}
 
function selectText(block, click){
    // Function to apply styling to current block_selection
    if (block.className=='number_block' && click=='dblclick') {
        createAdjustLevelButton(block.parentElement)
    } else if (block.className!='parent' && block.className!='btn-group' && document.getElementsByClassName('inspectionBlock')[0].style.display != 'block'){
        dropSelectedBlocks()
    } else if (block.className=='parent'){
        cssForClickingBlocks(block, click)
    }
}


// Annotating by button
function getRangeSelectedBlocks(){
    var blocks = getBlocks()
    var selected_blocks = []
    for (var block of blocks){
        if (textBlockBackgroundColor(block)=="rgb(255, 178, 90)"){
            selected_blocks.push(block)
        }
    }
    return selected_blocks
}

function pageScroll(block) {
    var top = block.getBoundingClientRect().top - ( window.innerHeight / 1.9 )
    window.scrollBy({top:top, left:0, behavior: 'smooth'})
}

function jumpToBlock(block) {
    cssForClickingBlocks(block, 'click')
    pageScroll(block)
}

function assignLevel(level, override){
    // if (window.getSelection().anchorNode!=null||override=='active'){
        var selected_blocks = getRangeSelectedBlocks()
        var first_block = selected_blocks[0]
        var last_block = selected_blocks[selected_blocks.length - 1]
        var middle_blocks = selected_blocks.slice(1,-1)
        var identifier = first_block
        var first_is_last = (first_block==last_block)

        if (checkForClosedBlock(selected_blocks)){return}

        if (level=='Discard text'||level=='Discard'||level=='discard'){
            for (block of selected_blocks){
                fontDiscarded(block, level, identifier)
            }
        } else if (first_is_last) {
            fontAssignedBottom(last_block, identifier, level, first_is_last, override)
        } else {
            fontAssignedTop(first_block, identifier, level, override)
            for (block of middle_blocks){
                fontAssignedMiddle(block, identifier, level)
            }
            fontAssignedBottom(last_block, identifier, level, first_is_last, override)
        }
        
        var selection = window.getSelection()
        selection.removeAllRanges()
        document.getElementById("mytext").focus({preventScroll:true})

        if (document.getElementsByName("radio")[0].checked){
            blocks = getBlocks()
            last_block_of_doc = blocks[blocks.length-1]
            if (last_block!=last_block_of_doc){
                jumpToBlock(nextBlock(last_block))
            }
        }

        if (document.getElementsByName("radio")[1].checked){
            if (last_block!=last_block_of_doc){
                suggestion(nextBlock(last_block))
            }
        }
        
        rememberBlocks(selected_blocks, level)

    // }
}

