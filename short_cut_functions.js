

function getBlocks(){
    return document.getElementsByClassName('parent')
}

function textBlockBackgroundColor(block){
    return block.getElementsByClassName('text_block')[0].style.backgroundColor
}

function levelId(block){
    return block.getAttribute('level_id')
}

function blockId(block){
    return block.getAttribute('block_id')
}

function fontId(block){
    return block.getAttribute('font_id')
}

function levelNumber(block){
    return block.getAttribute('level_number')
}

function textBlock(block){
    return block.getElementsByClassName('text_block')[0]
}

function levelBlock(block){
    return block.getElementsByClassName('level_block')[0]
}

function numberBlock(block){
    return block.getElementsByClassName('number_block')[0]
}

function refsBlock(block){
    return block.getElementsByClassName('refs_block')[0]
}

function getPage(block){
    return Number(block.getAttribute('block_id').match(/p(\d+)/)[1])
}

function nextBlock(block){
    if (block.nextElementSibling==null){
        if (block.parentElement.nextElementSibling.getElementsByClassName('parent')[0]==null){
            next_block=block.parentElement.nextElementSibling.nextElementSibling.getElementsByClassName('parent')[0]
        } else {
            next_block=block.parentElement.nextElementSibling.getElementsByClassName('parent')[0]
        }
    } else {
        next_block = block.nextElementSibling
    }
    return next_block
}

function previousBlock(block){

    blocks = []
    for (block_ of getBlocks()){
        blocks.push(block_)
    }

    first_block = blocks[0]
    if (block == first_block){
        return block
    } else {
        let index = blocks.indexOf(block) - 1
        return blocks[index]
    }
}



