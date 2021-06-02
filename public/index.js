window.onload = randomize()

function randomize() {
   
   console.log("pogent")
   document.getElementById("firstMessage").style.top = (Math.floor(Math.random() * 100) + 10) + "px";
   console.log("first top " + document.getElementById("firstMessage").style.top)
    document.getElementById("firstMessage").style.right = Math.floor(Math.random() * 100) + 10  + "px";

    document.getElementById("secondMessage").style.top = Math.floor(Math.random() * 100) + 10 + "px";
    document.getElementById("secondMessage").style.left = Math.floor(Math.random() * 100) + 10 + "px";

    document.getElementById("thirdMessage").style.bottom = Math.floor(Math.random() * 100) + 10 + "px";
    document.getElementById("thirdMessage").style.right = Math.floor(Math.random() * 100) + 10 + "px";

    document.getElementById("fourthMessage").style.bottom = Math.floor(Math.random() * 100) + 10 + "px";
    document.getElementById("fourthMessage").style.left = Math.floor(Math.random() * 100) + 10 + "px";
}