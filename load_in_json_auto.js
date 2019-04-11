
// Read in from back-end


// window.onload = function () { loadJSON('eur-reg-2013-575.json') }

function loadJSON(file_name) {
  document.getElementsByName("radio")[0].checked = false
  document.getElementsByName("radio")[1].checked = false

  image_path = file_name.replace('.json', '/')

  var xobj = new XMLHttpRequest()
  xobj.overrideMimeType("application/json")
  xobj.open('GET', image_path+file_name, true)

  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      extract_data(xobj.responseText, file_name)
    }
  }
  xobj.send(null)
}

