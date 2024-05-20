
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
        document.getElementById(`post${position.x}x-${position.y}y`).setAttribute("empty", true)
        document.getElementById(`post${position.x}x-${position.y}y`).setAttribute("connection-up", false)
        document.getElementById(`post${position.x}x-${position.y}y`).setAttribute("connection-down", false)
        document.getElementById(`post${position.x}x-${position.y}y`).setAttribute("connection-right", false)
        document.getElementById(`post${position.x}x-${position.y}y`).setAttribute("connection-left", false)
        document.getElementById(`post${position.x}x-${position.y}y`).setAttribute("connectionType", "none")
        document.getElementById(`post${position.x}x-${position.y}y`).setAttribute("rotation", 0)

    }
    drop();

    function drop() {

        interact('.dropzone div')
            .dropzone({
                accept: '.green',
                ondropactivate: function (event) {
                    console.log("c")
                },
                ondropdeactivate: function (event) {
                    if (event.currentTarget == null || event.currentTarget.childElementCount == 2) {
                        event.relatedTarget.remove();
                    }
                    else {
                        document.getElementById(event.currentTarget.id).appendChild(event.relatedTarget);


                        document.getElementById(`post${Number(event.currentTarget.getAttribute('data-x'))}x-${Number(event.currentTarget.getAttribute('data-y'))}y`).setAttribute("connectionType", event.relatedTarget.id)


                        console.log()
                        event.currentTarget.setAttribute("empty", false)
                        if (document.getElementById(`post${Number(event.currentTarget.getAttribute('data-x'))}x-${Number(event.currentTarget.getAttribute('data-y')) + 1}y`).getAttribute("empty") == "false") {
                            event.currentTarget.setAttribute("connection-up", true)
                            document.getElementById(`post${Number(event.currentTarget.getAttribute('data-x'))}x-${Number(event.currentTarget.getAttribute('data-y')) + 1}y`).setAttribute("connection-down", true)
                            console.log("conneted")
                        }
                        if (document.getElementById(`post${Number(event.currentTarget.getAttribute('data-x'))}x-${Number(event.currentTarget.getAttribute('data-y')) - 1}y`).getAttribute("empty") == "false") {
                            event.currentTarget.setAttribute("connection-down", true)
                            document.getElementById(`post${Number(event.currentTarget.getAttribute('data-x'))}x-${Number(event.currentTarget.getAttribute('data-y')) - 1}y`).setAttribute("connection-up", true)
                            console.log("conneted")
                        }
                        if (document.getElementById(`post${Number(event.currentTarget.getAttribute('data-x')) + 1}x-${Number(event.currentTarget.getAttribute('data-y'))}y`).getAttribute("empty") == "false") {
                            event.currentTarget.setAttribute("connection-right", true)
                            document.getElementById(`post${Number(event.currentTarget.getAttribute('data-x')) + 1}x-${Number(event.currentTarget.getAttribute('data-y'))}y`).setAttribute("connection-left", true)
                            console.log("conneted")
                        }
                        if (document.getElementById(`post${Number(event.currentTarget.getAttribute('data-x')) - 1}x-${Number(event.currentTarget.getAttribute('data-y'))}y`).getAttribute("empty") == "false") {
                            event.currentTarget.setAttribute("connection-left", true)
                            document.getElementById(`post${Number(event.currentTarget.getAttribute('data-x')) - 1}x-${Number(event.currentTarget.getAttribute('data-y'))}y`).setAttribute("connection-right", true)
                            console.log("conneted")
                        }
                        connectionsDetector()
                        event.relatedTarget.setAttribute('data-x', 0);
                        event.relatedTarget.setAttribute('data-y', 0);
                        event.currentTarget.setAttribute("rotation", Math.floor(event.relatedTarget.getAttribute("data-angle")))

                        event.relatedTarget.style.webkitTransform =
                            event.relatedTarget.style.transform =
                            `translate(${event.relatedTarget.getAttribute("data-x")}px, ${event.relatedTarget.getAttribute("data-y")}px) rotate(${event.relatedTarget.getAttribute("data-angle")}deg)`;
                        interact(".green").unset();

                        moveInteract(".green");
                        let rotation = Number(event.target.getAttribute("data-angle"));
                        let during = false;
                        if (!(event.relatedTarget.getAttribute('listener') == "false")) {
                            event.relatedTarget.addEventListener("dblclick", (event) => {
                                if (during == false) {
                                    during = true;
                                    event.target.setAttribute('listener', false);

                                    rotation = Number(event.target.getAttribute("data-angle")) + .900001;
                                    console.log(Math.floor(event.target.getAttribute("data-angle")) + 1 == 360, Math.floor(event.target.getAttribute("data-angle")) + 1)
                                    if (Math.floor(event.target.getAttribute("data-angle")) + 1 == 360) {
                                        rotation = 0;
                                    }

                                    event.target.setAttribute("data-angle", (rotation))
                                    // console.log(Math.floor(event.target.getAttribute("data-angle")));
                                    event.target.style.webkitTransform =
                                        event.target.style.transform =
                                        `rotate(${Math.floor(event.target.getAttribute("data-angle"))}deg)`
                                    event.target.parentNode.setAttribute("rotation", Math.floor(event.target.getAttribute("data-angle")))
                                    if (event.target.parentNode.getAttribute("RealConnection-up") == "true") {
                                        event.target.parentNode.setAttribute("RealConnection-up", false);
                                        document.getElementById(`post${Number(event.target.parentNode.getAttribute('data-x'))}x-${Number(event.target.parentNode.getAttribute('data-y')) + 1}y`).setAttribute("RealConnection-down", false)
                                        console.log("desconected")
                                    }
                                    if (event.target.parentNode.getAttribute("RealConnection-down") == "true") {
                                        event.target.parentNode.setAttribute("RealConnection-down", false);
                                        document.getElementById(`post${Number(event.target.parentNode.getAttribute('data-x'))}x-${Number(event.target.parentNode.getAttribute('data-y')) - 1}y`).setAttribute("RealConnection-up", false)
                                        console.log("desconected")
                                    }
                                    if (event.target.parentNode.getAttribute("RealConnection-right") == "true") {
                                        event.target.parentNode.setAttribute("RealConnection-right", false);
                                        document.getElementById(`post${Number(event.target.parentNode.getAttribute('data-x')) + 1}x-${Number(event.target.parentNode.getAttribute('data-y'))}y`).setAttribute("RealConnection-left", false)
                                        console.log("desconected")
                                    }
                                    if (event.target.parentNode.getAttribute("RealConnection-left") == "true") {
                                        event.target.parentNode.setAttribute("RealConnection-left", false);
                                        document.getElementById(`post${Number(event.target.parentNode.getAttribute('data-x')) - 1}x-${Number(event.target.parentNode.getAttribute('data-y'))}y`).setAttribute("RealConnection-right", false)
                                        console.log("desconected")
                                    }
            
                                    realConnectionsAdd(event.target.parentNode);
                                    realConnectionsDetectorAnti();

                                }
                                // event.target.setAttribute('data-angle', rotation || 0);
                                during = false;
                            });
                        }

                        realConnectionsAdd(event.currentTarget);

                    }
                },
                ondragenter: function (event) {
                },
                ondragleave: function (event) {
                    if (event.currentTarget == event.relatedTarget.parentNode) {
                        event.currentTarget.setAttribute("empty", true)
                        if (event.currentTarget.getAttribute("connection-up") == "true") {
                            event.currentTarget.setAttribute("connection-up", false);
                            document.getElementById(`post${Number(event.currentTarget.getAttribute('data-x'))}x-${Number(event.currentTarget.getAttribute('data-y')) + 1}y`).setAttribute("connection-down", false)
                            console.log("desconected")
                        }
                        if (event.currentTarget.getAttribute("connection-down") == "true") {
                            event.currentTarget.setAttribute("connection-down", false);
                            document.getElementById(`post${Number(event.currentTarget.getAttribute('data-x'))}x-${Number(event.currentTarget.getAttribute('data-y')) - 1}y`).setAttribute("connection-up", false)
                            console.log("desconected")
                        }
                        if (event.currentTarget.getAttribute("connection-right") == "true") {
                            event.currentTarget.setAttribute("connection-right", false);
                            document.getElementById(`post${Number(event.currentTarget.getAttribute('data-x')) + 1}x-${Number(event.currentTarget.getAttribute('data-y'))}y`).setAttribute("connection-left", false)
                            console.log("desconected")
                        }
                        if (event.currentTarget.getAttribute("connection-left") == "true") {
                            event.currentTarget.setAttribute("connection-left", false);
                            document.getElementById(`post${Number(event.currentTarget.getAttribute('data-x')) - 1}x-${Number(event.currentTarget.getAttribute('data-y'))}y`).setAttribute("connection-right", false)
                            console.log("desconected")
                        }
                        document.getElementById(`post${Number(event.currentTarget.getAttribute('data-x'))}x-${Number(event.currentTarget.getAttribute('data-y'))}y`).setAttribute("connectionType", "none")
                        event.currentTarget.setAttribute("rotation", 0)
                        if (event.currentTarget.getAttribute("RealConnection-up") == "true") {
                            event.currentTarget.setAttribute("RealConnection-up", false);
                            document.getElementById(`post${Number(event.currentTarget.getAttribute('data-x'))}x-${Number(event.currentTarget.getAttribute('data-y')) + 1}y`).setAttribute("RealConnection-down", false)
                            console.log("desconected")
                        }
                        if (event.currentTarget.getAttribute("RealConnection-down") == "true") {
                            event.currentTarget.setAttribute("RealConnection-down", false);
                            document.getElementById(`post${Number(event.currentTarget.getAttribute('data-x'))}x-${Number(event.currentTarget.getAttribute('data-y')) - 1}y`).setAttribute("RealConnection-up", false)
                            console.log("desconected")
                        }
                        if (event.currentTarget.getAttribute("RealConnection-right") == "true") {
                            event.currentTarget.setAttribute("RealConnection-right", false);
                            document.getElementById(`post${Number(event.currentTarget.getAttribute('data-x')) + 1}x-${Number(event.currentTarget.getAttribute('data-y'))}y`).setAttribute("RealConnection-left", false)
                            console.log("desconected")
                        }
                        if (event.currentTarget.getAttribute("RealConnection-left") == "true") {
                            event.currentTarget.setAttribute("RealConnection-left", false);
                            document.getElementById(`post${Number(event.currentTarget.getAttribute('data-x')) - 1}x-${Number(event.currentTarget.getAttribute('data-y'))}y`).setAttribute("RealConnection-right", false)
                            console.log("desconected")
                        }

                        connectionsDetectorAnti();
                        realConnectionsDetectorAnti();
                        
                    }
                }
            });

    }
    let ConnectArr = ["connection-left", "connection-right", "connection-up", "connection-down"]
    function connectionsDetector() {
        for (const child of document.getElementById("circuits").children) {
            for (const iterator of ConnectArr) {
                if (child.getAttribute(iterator) == "true") {
                    child.classList.add(iterator);
                }
            }
        }
    }
    function connectionsDetectorAnti() {
        for (const child of document.getElementById("circuits").children) {
            for (const iterator of ConnectArr) {
                if (child.getAttribute(iterator) == "false") {
                    child.classList.remove(iterator);
                }
            }
        }
    }

    let RealConnectArr = ["RealConnection-left", "RealConnection-right", "RealConnection-up", "RealConnection-down"]



    function realConnectionsDetector() {
        for (const child of document.getElementById("circuits").children) {
            for (const iterator of RealConnectArr) {
                if (child.getAttribute(iterator) == "true") {
                    child.classList.add(iterator);
                }
            }
        }
    }
    function realConnectionsDetectorAnti() {
        for (const child of document.getElementById("circuits").children) {
            for (const iterator of RealConnectArr) {
                if (child.getAttribute(iterator) == "false") {
                    child.classList.remove(iterator);
                }
            }
        }
    }

    function realConnectionsAdd(child) {
        console.log(child)
        for (const realConnect of RealConnectArr) {
            for (const connect of ConnectArr) {
                if (child.getAttribute(connect) == "true" && RealConnectArr.indexOf(realConnect) == ConnectArr.indexOf(connect)) {
                    console.log(child.getAttribute("connectionType"), realConnect)
                    switch (child.getAttribute("connectionType")) {
                        case "wire":
                            switch (child.getAttribute("rotation")) {
                                case "0":
                                    if(realConnect == "RealConnection-left"){
                                        child.setAttribute(realConnect, true);
                                        if(document.getElementById(`post${Number(child.getAttribute('data-x')) - 1}x-${Number(child.getAttribute('data-y'))}y`).getAttribute("RealConnection-right") == "false"){
                                            realConnectionsAdd(document.getElementById(`post${Number(child.getAttribute('data-x')) - 1}x-${Number(child.getAttribute('data-y'))}y`))
                                        }// add real connections to the div to make it work the if 
                                        // document.getElementById(`post${Number(child.getAttribute('data-x')) - 1}x-${Number(child.getAttribute('data-y'))}y`).setAttribute("RealConnection-right", true);
                                    }
                                    else if(realConnect == "RealConnection-right"){
                                        child.setAttribute(realConnect, true);
                                        if(document.getElementById(`post${Number(child.getAttribute('data-x')) + 1}x-${Number(child.getAttribute('data-y'))}y`) == false){
                                            realConnectionsAdd(document.getElementById(`post${Number(child.getAttribute('data-x')) + 1}x-${Number(child.getAttribute('data-y'))}y`))
                                        }

                                        // document.getElementById(`post${Number(child.getAttribute('data-x')) + 1}x-${Number(child.getAttribute('data-y'))}y`).setAttribute("RealConnection-left", true);
                                    }
                                    console.log("real connected" , child.getAttribute("rotation"))
                                    break;
                                case "90":
                                    console.log("caca" , child.getAttribute("rotation"))
                                    break;
                                case "180":
                                    if(realConnect == "RealConnection-left"){
                                        child.setAttribute(realConnect, true);
                                        document.getElementById(`post${Number(child.getAttribute('data-x')) - 1}x-${Number(child.getAttribute('data-y'))}y`).setAttribute("RealConnection-right", true);
                                    }
                                    else if(realConnect == "RealConnection-right"){
                                        child.setAttribute(realConnect, true);
                                        document.getElementById(`post${Number(child.getAttribute('data-x')) + 1}x-${Number(child.getAttribute('data-y'))}y`).setAttribute("RealConnection-left", true);
                                    }
                                    break;
                                case 270:
        
                                    break;
                            }
                            break;
        
                        default:
                            break;
                    }

                }
            }

        }
        realConnectionsDetector();
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
