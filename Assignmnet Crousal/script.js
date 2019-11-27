var slide,dots,addCircle;
function slideCrousal(){
     slide=document.getElementsByTagName('img');
  
      dots=[];
    for(var i=0; i<slide.length; i++){
       addCircle=document.createElement('span');
addCircle.style.borderRadius='50%';
addCircle.style.backgroundColor="red";
addCircle.style.width='20px';
addCircle.style.height='20px';
addCircle.style.float='left';
addCircle.onclick='showIndexImage(i)';

var main=document.getElementById('dot-container').appendChild(addCircle);
dots.push(addCircle);

    }
  
}
slideCrousal();

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showIndexImage(n) {
    showDivs(slideIndex = n);
  }

function showDivs(n) {
  var i;
  var x = document.getElementsByTagName('img');
  if (n > x.length) 
  {
      slideIndex = 1
    }
  if (n < 1) {
      slideIndex = x.length
    }
  for (i = 0; i < x.length; i++) 
  {
    x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block";  
}




