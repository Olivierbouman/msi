

function open_close_sidebar() {
    if (document.getElementById("mySidebar").style.width == "0px"){
        document.getElementById("mySidebar").style.width = "150px"
        document.getElementsByClassName("open_sidebar_button")[0].style.left = "160px"
        document.getElementsByClassName("document")[0].style.paddingLeft = "340px"

        // document.getElementsByClassName("document")[0].style.backgroundColor = "black"
        // document.getElementsByClassName("document")[0].style.opacity = ".8"

        
    } else {
        document.getElementById("mySidebar").style.width = "0"
        document.getElementsByClassName("open_sidebar_button")[0].style.left = "20px"
        document.getElementsByClassName("document")[0].style.paddingLeft = "300px"

        // document.getElementsByClassName("document")[0].style.backgroundColor = "lightgray"
        // document.getElementsByClassName("document")[0].style.opacity = "1"

    }
}



