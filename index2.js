
document.addEventListener(`DOMContentLoaded`, () => {

    class Position {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.empty = true;
            this.block = "";
            this.rotation = "";
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
                    'translate(' + x + 'px, ' + y + 'px) rotate(' + target.getAttribute('data-angle') + 'rad)';

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

            event.relatedTarget.setAttribute('data-x', 0);
            event.relatedTarget.setAttribute('data-y', 0);    
            event.relatedTarget.style.webkitTransform =
            event.relatedTarget.style.transform =
            `translate(${event.relatedTarget.getAttribute("data-x")}px, ${event.relatedTarget.getAttribute("data-y")}px)`;
            interact(".green").unset();

            moveInteract(".green"); // add also clone making 
            let during = false;
            let rotation = 0;
            event.relatedTarget.addEventListener("dblclick", (event) => {
                console.log(event)
                if(during == false){
                    rotation = rotation + 90;
                    event.target.style.webkitTransform =
                    event.target.style.transform =
         `rotate(${rotation}deg)`
                }

            });

        },
        ondragenter: function (event) {
        },
        ondragleave: function (event) {

        }
    });

}
drop();
