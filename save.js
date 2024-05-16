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
