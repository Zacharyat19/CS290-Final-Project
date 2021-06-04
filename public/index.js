window.onload = randomize()

function randomize() {
    var arr = document.getElementsByClassName("message")
    for(item of arr){
        item.style.top = (Math.floor(Math.random() * 100)) + "%";
        item.style.right = (Math.floor(Math.random() * 100)) + "%";
    }
    var length = arr.length
    if(length > 3){
        var prob = 3 / length
        for(ele of arr){
            var eleProb = Math.random()
            if(eleProb > prob){
                ele.parentNode.removeChild(ele)
            }
        }
    }
}