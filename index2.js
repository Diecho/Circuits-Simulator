
document.addEventListener(`DOMContentLoaded`, () => {

    class Position {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.empty = true;
        }
    }
    let positionsArray = [];
    function createPositionArray() {
        for (let i = 10; i >= 1; i--) {
            for (let e = 1; e <= 10; e++) {
                positionsArray.push(new Position(e, i))
            }
        }
    }
    createPositionArray();
    let htmlContentForCircuits = "";
    for (position of positionsArray) {
        htmlContentForCircuits = htmlContentForCircuits + `<div id="post${position.x}x-${position.y}y"></div>`

    }
    document.getElementById("circuits").innerHTML = htmlContentForCircuits;

    for (position of positionsArray) {
        document.getElementById(`post${position.x}x-${position.y}y`).setAttribute("data-x", position.x)
        document.getElementById(`post${position.x}x-${position.y}y`).setAttribute("data-y", position.y)    
    }
    drop();

    function drop(){

        interact('.dropzone div')
        .dropzone({
            accept: '.green',
            ondropactivate: function (event) {
    
            },
            ondropdeactivate: function (event) {
                console.log(event, event.draggable.target)
                console.log("cac")
                document.getElementById(event.currentTarget.id).appendChild(event.relatedTarget);
                if (!event.currentTarget.getAttribute("empty")){
                    console.log(!event.currentTarget.getAttribute("empty"))
                    let during = false;
                }
                else {
                }
                for (position of positionsArray) {
                    if(position.x == event.currentTarget.getAttribute("data-x") && position.y == event.currentTarget.getAttribute("data-y") && !event.currentTarget.getAttribute("empty") ){
                        console.log(!position.empty, "hello im a cat")

                        if(!position.empty){// == false
                            console.log(!position.empty, "hello im a cat")
                            event.relatedTarget.remove();
                        }
                        position.empty = false;
                        console.log(event.currentTarget)
                    }
    
                }
            
                event.currentTarget.setAttribute("empty", true)

                event.relatedTarget.setAttribute('data-x', 0);
                event.relatedTarget.setAttribute('data-y', 0);   
                event.relatedTarget.style.webkitTransform =
                event.relatedTarget.style.transform =
                `translate(${event.relatedTarget.getAttribute("data-x")}px, ${event.relatedTarget.getAttribute("data-y")}px) rotate(${event.relatedTarget.getAttribute("data-angle")}deg)`;
                interact(".green").unset();
    
                moveInteract(".green"); 
                let rotation = 0;
                event.relatedTarget.addEventListener("dblclick", (event) => {
                    console.log(event)
                    if(during == false){
                        rotation = rotation + 90;
                        event.target.style.webkitTransform =
                        event.target.style.transform =
             `rotate(${rotation}deg)`
                    }
                    event.target.setAttribute('data-angle', rotation || 0);
                });
                during = true;
            },
            ondragenter: function (event) {
            },
            ondragleave: function (event) {
    
            }
        });
    
    }
    

});


function moveInteract(item, restrictionIs) {
    interact(item)
        .draggable({
            onstart: function (event) {
                let target = event.target;
                // store the initial position and rotation angle of the item
                target.setAttribute('data-angle', parseFloat(target.getAttribute('data-angle')) || 0);
                target.style.transform = "";
                // target.setAttribute('data-x', 0);
                // target.setAttribute('data-y', 0);
            },
            onmove: function (event) {
                let target = event.target;
                // keep the dragged position in the data-x/data-y attributes
                let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
                // console.log(x, y)
                // console.log(event.dx, event.dy)
                // console.log(parseFloat(target.getAttribute('data-x')))
                // console.log(target)
                // translate the element
                target.style.webkitTransform =
                    target.style.transform =
                    'translate(' + x + 'px, ' + y + 'px) rotate(' + target.getAttribute('data-angle') + 'deg)';

                // update the position attributes
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            },
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: restrictionIs,
                    endOnly: true
                })
            ],
            autoScroll: true

        })

}

moveInteract(".itemImg", "none");


// manualStart: true
interact('.itemImg') // cloning
    .draggable({
        onstart: function (event) {
        },
        onmove: function (event) {

        }
    })
    .on('move', function (event) {
        let interaction = event.interaction
        let classes = event.currentTarget.classList;
        console.log(event.currentTarget.id);
        // if the pointer was moved while being held down
        // and an interaction hasn't started yet
        if (interaction.pointerIsDown && !interaction.interacting() && !classes.contains('green')) {
            // create a clone of the currentTarget element
            let clone = event.currentTarget.cloneNode(true)

            // insert the clone to the page
            // TODO: position the clone appropriately
            event.currentTarget.classList.add('green');
            // interact(".itemImg").unset();
            event.currentTarget.classList.remove('itemImg');
            event.currentTarget.removeAttribute('data-x');
            event.currentTarget.removeAttribute('data-y');

            event.currentTarget.setAttribute('data-x', 0);
            event.currentTarget.setAttribute('data-y', 0);

            // event.currentTarget.innerHTML = `<div class="rotation-handle"><img src="rotatingArrow.svg" alt=""></div>` 
            document.getElementById(`${event.currentTarget.parentNode.id}`).appendChild(clone);

            // start a drag interaction targeting the clone
            // interaction.start({ name: 'drag' }, event.interactable, event.currentTarget)
        }
    })


let cat = 1;
