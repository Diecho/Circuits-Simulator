interact('.itemImg')
    .draggable({
        onstart: function (event) {
            var target = event.target;
            // store the initial position and rotation angle of the item
            target.setAttribute('data-angle', parseFloat(target.getAttribute('data-angle')) || 0);
        },
        onmove: function (event) {
            var target = event.target;
            // keep the dragged position in the data-x/data-y attributes
            var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

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
            var box = event.target.parentElement;
            var rect = box.getBoundingClientRect();

            // store the center as the element has css `transform-origin: center center`
            box.setAttribute('data-center-x', rect.left + rect.width / 2);
            box.setAttribute('data-center-y', rect.top + rect.height / 2);
            // get the angle of the element when the drag starts
            box.setAttribute('data-angle', getDragAngle(event));
        },
        onmove: function (event) {
            var box = event.target.parentElement;

            var pos = {
                x: parseFloat(box.getAttribute('data-x')) || 0,
                y: parseFloat(box.getAttribute('data-y')) || 0
            };

            var angle = getDragAngle(event);

            // update transform style on dragmove
            box.style.transform = 'translate(' + pos.x + 'px, ' + pos.y + 'px) rotate(' + angle + 'rad' + ')';
        },
        onend: function (event) {
            var box = event.target.parentElement;

            // save the angle on dragend
            box.setAttribute('data-angle', getDragAngle(event));
        },
    })

function getDragAngle(event) {
    var box = event.target.parentElement;
    var startAngle = parseFloat(box.getAttribute('data-angle')) || 0;
    var center = {
        x: parseFloat(box.getAttribute('data-center-x')) || 0,
        y: parseFloat(box.getAttribute('data-center-y')) || 0
    };
    var angle = Math.atan2(center.y - event.clientY,
        center.x - event.clientX);

    return angle - startAngle;
}
interact('.itemImg')
    .draggable({ manualStart: true })
    .on('move', function (event) {
        var interaction = event.interaction
        let classes = event.currentTarget.classList;
        console.log(event.currentTarget.id);
        // if the pointer was moved while being held down
        // and an interaction hasn't started yet
        if (interaction.pointerIsDown && !interaction.interacting() && !classes.contains('green')) {
            var original = event.currentTarget,
                // create a clone of the currentTarget element
                clone = event.currentTarget.cloneNode(true)

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
            //   event.target.classList.add('drop-active');
        },
        ondropdeactivate: function (event) {
            //   event.target.classList.remove('drop-active');
        },
        ondragenter: function (event) {
            console.log(event)

            // var draggableElement = event.relatedTarget;
            // var dropzoneElement = event.target;

            // // Move draggable into drop zone
            // var dropRect = dropzoneElement.getBoundingClientRect();
            // var draggableRect = draggableElement.getBoundingClientRect();

            // var offsetX = dropRect.left - draggableRect.left;
            // var offsetY = dropRect.top - draggableRect.top;

            // draggableElement.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            // draggableElement.setAttribute('data-x', offsetX);
            // draggableElement.setAttribute('data-y', offsetY);
        },
        ondragleave: function (event) {
            // Reset draggable position if it leaves drop zone
            // var draggableElement = event.relatedTarget;
            // draggableElement.style.transform = '';
            // draggableElement.setAttribute('data-x', '0');
            // draggableElement.setAttribute('data-y', '0');
        }
    });
