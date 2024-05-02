interact('.itemImg')
    .draggable({
        onstart: function (event) {
            let target = event.target;
            // store the initial position and rotation angle of the item
            target.setAttribute('data-angle', parseFloat(target.getAttribute('data-angle')) || 0);
        },
        onmove: function (event) {
            let target = event.target;
            // keep the dragged position in the data-x/data-y attributes
            let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            // translate the element
            target.style.webkitTransform =
                target.style.transform =
                'translate(' + x + 'px, ' + y + 'px) rotate(' + target.getAttribute('data-angle') + 'rad)';

            // update the position attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        },
        inertia: true,
        modifiers: [
            interact.modifiers.restrictRect({
                // restriction: 'parent',
                endOnly: true
            })
        ],
        autoScroll: true

    })
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
interact('.itemImg')
    .draggable({
        onstart: function (event) {
            let target = event.target;
            // store the initial position and rotation angle of the item
            target.setAttribute('data-angle', parseFloat(target.getAttribute('data-angle')) || 0);
        },

        onmove: function (event) {
            let target = event.target;
            // keep the dragged position in the data-x/data-y attributes
            let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            // translate the element
            target.style.webkitTransform =
                target.style.transform =
                'translate(' + x + 'px, ' + y + 'px) rotate(' + target.getAttribute('data-angle') + 'rad)';

            // update the position attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        },
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
            console.log(clone);
            clone.classList.add('green')
            document.getElementById(`${event.currentTarget.parentNode.id}`).appendChild(clone)

            // start a drag interaction targeting the clone
            interaction.start({ name: 'drag' }, event.interactable, clone)
        }
    })
interact('.dropzone')
    .dropzone({
        accept: '.itemImg',
        ondropactivate: function (event) {
        },
        ondropdeactivate: function (event) {
        },
        ondragenter: function (event) {
            console.log(event)
            let clone = event.dragEvent.currentTarget.cloneNode(true)
            event.dragEvent.currentTarget.parentNode.removeChild(event.dragEvent.currentTarget);

            document.getElementById(`circuits`).appendChild(clone)
            interact('.itemImg')
            .draggable({
                onstart: function (event) {
                    let target = event.target;
                    // store the initial position and rotation angle of the item
                    target.setAttribute('data-angle', parseFloat(target.getAttribute('data-angle')) || 0);
                },
                onmove: function (event) {
                    let target = event.target;
                    // keep the dragged position in the data-x/data-y attributes
                    let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                    let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
        
                    // translate the element
                    target.style.webkitTransform =
                        target.style.transform =
                        'translate(' + x + 'px, ' + y + 'px) rotate(' + target.getAttribute('data-angle') + 'rad)';
        
                    // update the position attributes
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                },
                inertia: true,
                modifiers: [
                    interact.modifiers.restrictRect({
                        // restriction: 'parent',
                        endOnly: true
                    })
                ],
                autoScroll: true
        
            })
        

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
