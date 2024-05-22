interact('.dropzone')
    .dropzone({
        accept: '.green',
        ondropactivate: function (event) {

        },
        ondropdeactivate: function (event) {
            console.log(event,event.relatedTarget)
            const element = document.createElement("div")

            if(!event.relatedTarget.getAttribute('inside')){
                event.dragEvent.currentTarget.parentNode.removeChild(event.dragEvent.currentTarget);  
                element.classList.add("green");
                element.innerHTML = ` <img src="${event.relatedTarget.src}">
                <div class="rotation-handle"><img src="rotatingArrow.svg" alt=""></div>
                `
                document.getElementById(`circuits`).appendChild(element);

                element.setAttribute('data-x', event._interaction._latestPointer.event.clientX -500);
                element.setAttribute('data-y', event._interaction._latestPointer.event.clientY - 50);    
                console.log("caca", event.clientX, event._interaction._latestPointer.event.clientY, event._interaction._latestPointer.event.clientX)
                element.style.webkitTransform =
                element.style.transform =
                `translate(${element.getAttribute("data-x")}px, ${element.getAttribute("data-y")}px)`;
            }
            element.setAttribute('inside', true);
            interact(".green").unset();

            moveInteract(".green", "parent"); // add also clone making 

            // moveInteract(".itemImg");

        },
        ondragenter: function (event) {
            // interact(".itemImg").unset();

            // let draggableElement = event.relatedTarget;
            // let dropzoneElement = event.target;

            // // Move draggable into drop zone
            // let dropRect = dropzoneElement.getBoundingClientRect();
            // let draggableRect = draggableElement.getBoundingClientRect();

            // let offsetX = dropRect.left - draggableRect.left;
            // let offsetY = dropRect.top - draggableRect.top;

            // draggableElement.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            // draggableElement.setAttribute('data-x', offsetX);
            // draggableElement.setAttribute('data-y', offsetY);
        },
        ondragleave: function (event) {

            // Reset draggable position if it leaves drop zone
            // let draggableElement = event.relatedTarget;
            // draggableElement.style.transform = '';
            // draggableElement.setAttribute('data-x', '0');
            // draggableElement.setAttribute('data-y', '0');
        }
    });
    interact('.rotation-handle')
    .draggable({
        onstart: function (event) {
            let box = event.target.parentElement;
            let rect = box.getBoundingClientRect();

            // store the center as the element has css `transform-origin: center center`
            box.setAttribute('data-center-x', rect.left + rect.width / 2);
            box.setAttribute('data-center-y', rect.top + rect.height / 2);
            // get the angle of the element when the drag starts
            box.setAttribute('data-angle', getDragAngle(event));
        },
        onmove: function (event) {
            let box = event.target.parentElement;

            let pos = {
                x: parseFloat(box.getAttribute('data-x')) || 0,
                y: parseFloat(box.getAttribute('data-y')) || 0
            };

            let angle = getDragAngle(event);

            // update transform style on dragmove
            box.style.transform = 'translate(' + pos.x + 'px, ' + pos.y + 'px) rotate(' + angle + 'rad' + ')';
        },
        onend: function (event) {
            let box = event.target.parentElement;

            // save the angle on dragend
            box.setAttribute('data-angle', getDragAngle(event));
        },
    })

function getDragAngle(event) {
    let box = event.target.parentElement;
    let startAngle = parseFloat(box.getAttribute('data-angle')) || 0;
    let center = {
        x: parseFloat(box.getAttribute('data-center-x')) || 0,
        y: parseFloat(box.getAttribute('data-center-y')) || 0
    };
    let angle = Math.atan2(center.y - event.clientY,
        center.x - event.clientX);

    return angle - startAngle;
}



switch (connection) {
    case "RealConnection-left":
        console.log(comming == connection);
        if (comming == connection) {
            return
        }
        let element1 = document.getElementById(`post${Number(div.getAttribute('data-x')) - 1}x-${Number(div.getAttribute('data-y'))}y`);
        switch (element1.getAttribute("connectiontype")) {
            case "wire":
            case "wireCross":
            case "wireT":
            case "wireCurve":
                repetionCircuits(element1, "RealConnection-right");
                break;
            case "resistor":
                console.log("resistor")
                circuitsArray.push({ resistance: Number(element1.getAttribute("resistance")) })
                repetionCircuits(element1, "RealConnection-right");
                break;
            case "battery":
                return
            default:
                break;
        }
        break;
    case "RealConnection-right":
        if (comming == connection) {
            return
        }
        let element2 = document.getElementById(`post${Number(div.getAttribute('data-x')) + 1}x-${Number(div.getAttribute('data-y'))}y`);
        switch (element2.getAttribute("connectiontype")) {
            case "wire":
            case "wireCross":
            case "wireT":
            case "wireCurve":
                repetionCircuits(element2, "RealConnection-left");
                break;
            case "resistor":
                console.log("resistor")

                circuitsArray.push({ resistance: Number(element2.getAttribute("resistance")) })
                repetionCircuits(element2, "RealConnection-left");
                break;
            case "battery":
                return
            default:
                break;
        }
        break;
    case "RealConnection-up":
        if (comming == connection) {
            return
        }
        let element3 = document.getElementById(`post${Number(div.getAttribute('data-x'))}x-${Number(div.getAttribute('data-y')) + 1}}y`);
        switch (element3.getAttribute("connectiontype")) {
            case "wire":
            case "wireCross":
            case "wireT":
            case "wireCurve":
                repetionCircuits(element3, "RealConnection-down");
                break;
            case "resistor":
                console.log("resistor")

                circuitsArray.push({ resistance: Number(element3.getAttribute("resistance")) })
                repetionCircuits(element3, "RealConnection-down");
                break;
            case "battery":
                return

            default:
                break;
        }
        break;
    case "RealConnection-down":
        if (comming == connection) {
            return
        }
        let element4 = document.getElementById(`post${Number(div.getAttribute('data-x'))}x-${Number(div.getAttribute('data-y')) - 1}}y`);
        switch (element4.getAttribute("connectiontype")) {
            case "wire":
            case "wireCross":
            case "wireT":
            case "wireCurve":
                repetionCircuits(element4, "RealConnection-up");
                break;
            case "resistor":
                console.log("resistor")

                circuitsArray.push({ resistance: Number(element4.getAttribute("resistance")) })
                repetionCircuits(element4, "RealConnection-up");
                break;
            case "battery":
                return

            default:
                break;
        }
        break;

}