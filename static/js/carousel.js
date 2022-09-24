
let a = document.getElementsByClassName('slider-container');
let b = document.getElementsByClassName('inner-slider');
// console.log(sliderContainer)


//cant seem to replicate the function for the lower carousel
for (let i = 0; i < 1; i++) {
    sliderContainer = a[i]
    innerSlider = b[i]
    console.log(a[i])
    let pressed = false;
    let startX;
    let x;
    
    // pointer becomes grab when clicked
    sliderContainer.addEventListener("mousedown", (e) => {
        pressed = true;
        startX = e.offsetX - innerSlider.offsetLeft;
        sliderContainer.style.cursor = "grabbing";
    });
    
    // indicates which card is being grabbed
    sliderContainer.addEventListener("mouseenter", () => {
        sliderContainer.style.cursor = "grab";
    });
    
    sliderContainer.addEventListener("mouseup", () => {
        sliderContainer.style.cursor = "grab";
        pressed = false;
    });
    
    
    sliderContainer.addEventListener("mousemove", (e) => {
        if (!pressed) return;
        e.preventDefault();
    
        x = e.offsetX;
    
        innerSlider.style.left = `${x - startX}px`;
    
        checkBoundary();
    });
    
    const checkBoundary = () => {
        let outer = sliderContainer.getBoundingClientRect();
        let inner = innerSlider.getBoundingClientRect();
    
        if (parseInt(innerSlider.style.left) > 0) {
            innerSlider.style.left = "0px";
        }
    
        if (inner.right < outer.right) {

            innerSlider.style.left = `-${inner.width - outer.width}px`;
        }
    };    



  }




