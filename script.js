// functionality for flipping the svg

document.addEventListener('DOMContentLoaded', () => {
  const summary = document.querySelectorAll("#details summary");
  const SVG = document.querySelectorAll("#details summary img");

  summary.forEach((summary, index) => {
    let flipped = false;
    summary.addEventListener("click", () => {
      if (flipped) {
        SVG[index].style.transform = "scaleY(1)";
        flipped = false;
      } else {
        SVG[index].style.transform = "scaleY(-1)";
        flipped = true;
      }
    });
  });


  // functionality for auto collapse
  const details = document.querySelectorAll('#details details');

  details.forEach(detail => {
    detail.querySelector('summary').addEventListener('click', () => {
      details.forEach(otherDetail => {
        if (otherDetail !== detail) {
          otherDetail.open = false;
          const otherSVG = otherDetail.querySelector("img");
          if (otherSVG) {
            otherSVG.style.transform = "scaleY(1)";
          }
        }
      });
    });
  });
});

// functionality for navigation collapse

const navLinks = document.querySelectorAll("#hero details a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        document.querySelector("#hero details").open = false;
    });
});


// functionality for scroll through 

const content1 = document.querySelector('.info1');
const content2 = document.querySelector('.info2');
const image = document.querySelector('#info__divider img');

const slideshowImages1 = [
    "assets/images/info1.png",
    "assets/images/hero-bg2.jpeg",
    "assets/images/hero-bg6.jpeg"
];
const slideshowImages2 = [
    "assets/images/info2.png",
    "assets/images/Iran-table6.jpg", 
];
const slideshowImages3 = [
    "assets/images/Tajik 1.jpg",
    "assets/images/Tajik 2.jpg", 
    "assets/images/info3.png"
];

let slideshowIndex1 = 0;
let slideshowIndex2 = 0;
let slideshowIndex3 = 0;

function updateSlideshow() {
    slideshowIndex1 = (slideshowIndex1 + 1) % slideshowImages1.length;
    slideshowIndex2 = (slideshowIndex2 + 1) % slideshowImages2.length;
    slideshowIndex3 = (slideshowIndex3 + 1) % slideshowImages3.length;
}

function getSlideshowImage(images, index) {
    return images[index];
}

function updateImage() {
    const contentRect1 = content1.getBoundingClientRect();
    const contentRect2 = content2.getBoundingClientRect();
    const imageRect = image.getBoundingClientRect();

    if(window.screen.width <= 820){
        if (contentRect1.top > imageRect.top ) {
            image.setAttribute("src", getSlideshowImage(slideshowImages1, slideshowIndex1));
        } else if (contentRect2.top > imageRect.top) {
            image.setAttribute("src", getSlideshowImage(slideshowImages2, slideshowIndex2));
        } else {
            image.setAttribute("src", getSlideshowImage(slideshowImages3, slideshowIndex3));
        }
    } else {
        if (contentRect1.bottom > imageRect.bottom - 300 ) {
            image.setAttribute("src", getSlideshowImage(slideshowImages1, slideshowIndex1));
        } else if (contentRect2.bottom > imageRect.bottom - 300 ) {
            image.setAttribute("src", getSlideshowImage(slideshowImages2, slideshowIndex2));
        } else {
            image.setAttribute("src", getSlideshowImage(slideshowImages3, slideshowIndex3));
        }
    }
}

setInterval(() => {
    updateSlideshow();
    updateImage();
}, 3000); 

document.addEventListener('scroll', updateImage);


// functionality for game 👇

const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.querySelectorAll(".droppable");
const gameImage = document.querySelector("#gameMatchers img")

draggableElements.forEach(elem => {
  elem.addEventListener("dragstart", dragStart); // Fires as soon as the user starts dragging an item - This is where we can define the drag data
});

droppableElements.forEach(elem => {
  elem.addEventListener("dragenter", dragEnter); // Fires when a dragged item enters a valid drop target
  elem.addEventListener("dragover", dragOver); // Fires when a dragged item is being dragged over a valid drop target, repeatedly while the draggable item is within the drop zone
  elem.addEventListener("dragleave", dragLeave); // Fires when a dragged item leaves a valid drop target
  elem.addEventListener("drop", drop); // Fires when an item is dropped on a valid drop target
});

// Drag and Drop Functions

//Events fired on the drag target

function dragStart(event) {
  event.dataTransfer.setData("text", event.target.id); // or "text/plain" but just "text" would also be fine since we are not setting any other type/format for data value
}

//Events fired on the drop target

function dragEnter(event) {
  if(!event.target.classList.contains("dropped")) {
    event.target.classList.add("droppable-hover");
  }
}

function dragOver(event) {
  if(!event.target.classList.contains("dropped")) {
    event.preventDefault(); // Prevent default to allow drop
  }
}

function dragLeave(event) {
  if(!event.target.classList.contains("dropped")) {
    event.target.classList.remove("droppable-hover");
  }
}

let count = 0
function drop(event) {
  event.preventDefault(); 
  event.target.classList.remove("droppable-hover");

  const draggableElementData = event.dataTransfer.getData("text");
  const droppableElementData = event.target.getAttribute("data-draggable-id");

  if(draggableElementData === droppableElementData) {

    count++

    const draggableElement = document.getElementById(draggableElementData);
    event.target.classList.add("dropped"); 
    event.target.style.backgroundColor = window.getComputedStyle(draggableElement).backgroundColor;
    draggableElement.classList.add("dragged");
    draggableElement.setAttribute("draggable", "false");

    // conditionals for image in game 👇

   if(count === 1){
        gameImage.style.filter = "opacity(1) blur(5px) brightness(0.3) saturate(0)"
   }else if( count === 2){
    gameImage.style.filter = "opacity(1) blur(5px) brightness(1) saturate(0)"
   }else if( count === 3){
    gameImage.style.mixBlendMode = "normal"
   }else if( count === 4){
    gameImage.style.filter = "opacity(1) blur(5px) brightness(1) saturate(1)"
   }else if( count === 5){
    gameImage.style.filter = "opacity(1) blur(0) brightness(1) saturate(1)"
   }
  }
}
// watch this youtube video if you don't understand the code 🔻
// 👉 https://www.youtube.com/watch?v=7HUCAYMylCQ 



 

