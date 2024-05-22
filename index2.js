
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
        document.getElementById(`post${position.x}x-${position.y}y`).setAttribute("RealConnection-up", false)
        document.getElementById(`post${position.x}x-${position.y}y`).setAttribute("RealConnection-down", false)
        document.getElementById(`post${position.x}x-${position.y}y`).setAttribute("RealConnection-right", false)
        document.getElementById(`post${position.x}x-${position.y}y`).setAttribute("RealConnection-left", false)
        document.getElementById(`post${position.x}x-${position.y}y`).setAttribute("RealConnection-left", false)
        document.getElementById(`post${position.x}x-${position.y}y`).setAttribute("realConnection-count", 0)
        document.getElementById(`post${position.x}x-${position.y}y`).setAttribute("inTheCircuit", false)
        document.getElementById(`post${position.x}x-${position.y}y`).setAttribute('circuitsDetect', true);


    }
    drop();

    function drop() {

        interact('.dropzone div')
            .dropzone({
                accept: '.green',
                ondropactivate: function (event) {
                },
                ondropdeactivate: function (event) {
                    if (event.currentTarget == null || event.currentTarget.childElementCount == 2) {
                        event.relatedTarget.remove();
                    }
                    else {
                        switch (event.relatedTarget.id) {
                            case "resistor":
                                event.currentTarget.setAttribute("resistance", 5);
                                break;
                            case "battery":
                                event.currentTarget.setAttribute("voltage", 10);
                                break;
                        }
                        document.getElementById(event.currentTarget.id).appendChild(event.relatedTarget);


                        document.getElementById(`post${Number(event.currentTarget.getAttribute('data-x'))}x-${Number(event.currentTarget.getAttribute('data-y'))}y`).setAttribute("connectionType", event.relatedTarget.id)

                        console.log()
                        event.currentTarget.setAttribute("empty", false)
                        if (document.getElementById(`post${Number(event.currentTarget.getAttribute('data-x'))}x-${Number(event.currentTarget.getAttribute('data-y')) + 1}y`).getAttribute("empty") == "false") {
                            event.currentTarget.setAttribute("connection-up", true)
                            document.getElementById(`post${Number(event.currentTarget.getAttribute('data-x'))}x-${Number(event.currentTarget.getAttribute('data-y')) + 1}y`).setAttribute("connection-down", true)
                        }
                        if (document.getElementById(`post${Number(event.currentTarget.getAttribute('data-x'))}x-${Number(event.currentTarget.getAttribute('data-y')) - 1}y`).getAttribute("empty") == "false") {
                            event.currentTarget.setAttribute("connection-down", true)
                            document.getElementById(`post${Number(event.currentTarget.getAttribute('data-x'))}x-${Number(event.currentTarget.getAttribute('data-y')) - 1}y`).setAttribute("connection-up", true)
                        }
                        if (document.getElementById(`post${Number(event.currentTarget.getAttribute('data-x')) + 1}x-${Number(event.currentTarget.getAttribute('data-y'))}y`).getAttribute("empty") == "false") {
                            event.currentTarget.setAttribute("connection-right", true)
                            document.getElementById(`post${Number(event.currentTarget.getAttribute('data-x')) + 1}x-${Number(event.currentTarget.getAttribute('data-y'))}y`).setAttribute("connection-left", true)
                        }
                        if (document.getElementById(`post${Number(event.currentTarget.getAttribute('data-x')) - 1}x-${Number(event.currentTarget.getAttribute('data-y'))}y`).getAttribute("empty") == "false") {
                            event.currentTarget.setAttribute("connection-left", true)
                            document.getElementById(`post${Number(event.currentTarget.getAttribute('data-x')) - 1}x-${Number(event.currentTarget.getAttribute('data-y'))}y`).setAttribute("connection-right", true)
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
                            event.relatedTarget.setAttribute('listener', false);
                            console.log("createddd")
                            event.relatedTarget.addEventListener("dblclick", (event) => {
                                if (during == false) {
                                    during = true;

                                    rotation = Number(event.target.getAttribute("data-angle")) + 90;
                                    if (Math.floor(event.target.getAttribute("data-angle")) == 270) {
                                        rotation = 0;
                                    }
                                    console.log(Math.floor(event.target.getAttribute("data-angle")) == 270, Math.floor(event.target.getAttribute("data-angle")))

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
                                    circuitsDetector();

                                }
                                // event.target.setAttribute('data-angle', rotation || 0);
                                during = false;
                            });


                        }
                        if (!(event.relatedTarget.getAttribute('listenerForClick') == "false")) {
                            event.relatedTarget.setAttribute('listenerForClick', false);
                            event.relatedTarget.addEventListener("click", (event) => {
                                if (event.detail === 1) {
                                    console.log("clickiiiy", event)
                                    switch (event.target.id) {
                                        case "resistor":
                                            document.getElementById("aside").innerHTML =
                                                `
                                                <h3>${event.target.id.toUpperCase()}</h3>
                                                <p>Actual resistance: ${event.target.parentNode.getAttribute("resistance")}</p>
                                                <input type="text" placeholder="Resistance">
                                                <button id="change">Change</button>                                
                                                `
                                            break;
                                        case "battery":
                                            document.getElementById("aside").innerHTML =
                                                `
                                                <h3>${event.target.id.toUpperCase()}</h3>
                                                <p>Actual voltage: ${event.target.parentNode.getAttribute("voltage")}</p>
                                                <input type="text" placeholder="Volts">
                                                <button id="change">Change</button>                                
                                                `
                                            break;
                                        case "wire":
                                        case "wireCross":
                                        case "wireT":
                                        case "wireCurve":

                                            document.getElementById("aside").innerHTML =
                                                `
                                                <h3>${event.target.id.toUpperCase()}</h3>
                                                <p>Actual current: ${event.target.parentNode.getAttribute("current") || "none"}</p>
                                                `
                                            break;
                                        case "resistor":
                                            document.getElementById("aside").innerHTML =
                                                `
                                                <h3>${event.target.id.toUpperCase()}</h3>
                                                <input type="text" placeholder="resistance">
                                                <button id="change">Change</button>                                
                                                `
                                            break;

                                        default:
                                            break;
                                    }
                                    document.getElementById("aside").classList.remove("displayNone");
                                    document.getElementById("header").classList.add("displayNone");


                                }
                            });
                        }

                        realConnectionsAdd(event.currentTarget);
                        // circuitsDetector(); //fix here

                        if (!(event.currentTarget.getAttribute('circuitsDetect') == "false")) {
                            event.currentTarget.setAttribute('circuitsDetect', false);

                            circuitsDetector();
                        }
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
                        event.target.parentNode.setAttribute("realConnection-count", 0)
                        event.target.parentNode.setAttribute('circuitsDetect', true);
                        event.target.parentNode.setAttribute("inTheCircuit", false)

                        connectionsDetectorAnti();
                        realConnectionsDetectorAnti();
                        circuitsDetector();

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
    let circuitsArray = [];
    function circuitsDetector() {
        circuitsArray = [];
        for (const div of document.getElementById("circuits").children) {
            if (div.getAttribute("connectiontype") == "battery") {
                console.log("batteryFOunded", div)
                circuitsArray.push({ voltage: Number(div.getAttribute("voltage")) })
                repetionCircuits(div)
            }
        }
    }
    function repetionCircuits(div, comming) {
        console.log(circuitsArray, div)
        if (div.getAttribute("connectiontype") == "battery") {
            let element = document.getElementById(`post${Number(div.getAttribute('data-x')) - 1}x-${Number(div.getAttribute('data-y'))}y`);
            switch (element.getAttribute("connectiontype")) {
                case "wire":
                case "wireCross":
                case "wireT":
                case "wireCurve":
                    div.setAttribute("inTheCircuit", true)
                    repetionCircuits(element, "RealConnection-right");
                    break;
                case "resistor":
                    console.log("resistor")
                    circuitsArray.push({ resistance: Number(element.getAttribute("resistance")) })
                    repetionCircuits(element, "RealConnection-right");
                    break;
                case "battery":
                    console.log("baterry")
                    analizeCircuit();
                case "none":
                    console.log("ended")
                    return
                default:
                    break;
            }
            return
        }

        for (const connection of RealConnectArr) {
            console.log(connection)
            if (div.getAttribute(connection) == "true") {
                console.log(connection, "exists")
                if (connection == "RealConnection-left") {
                    repeatLeft(div , comming, connection);
                }
                if (connection == "RealConnection-right") {
                    repeatRight(div , comming, connection);
                }
                if (connection == "RealConnection-up") {
                    repeatUp(div , comming, connection);
                }
                if (connection == "RealConnection-down") {
                    repeatDown(div , comming, connection);
                }
            }
        }
    }
    function repeatLeft(div , comming, connection){
        console.log(comming == connection);
        if (comming == connection) {
            return
        }
        console.log(connection, "worked")
        let element1 = document.getElementById(`post${Number(div.getAttribute('data-x')) - 1}x-${Number(div.getAttribute('data-y'))}y`);
        switch (element1.getAttribute("connectiontype")) {
            case "wire":
            case "wireCross":
            case "wireT":
            case "wireCurve":
                div.setAttribute("inTheCircuit", true)
                repetionCircuits(element1, "RealConnection-right");
                break;
            case "resistor":
                console.log("resistor")
                circuitsArray.push({ resistance: Number(element1.getAttribute("resistance")) })
                repetionCircuits(element1, "RealConnection-right");
                break;
            case "battery":
                console.log("baterry");
                analizeCircuit();
            case "none":
                console.log("ended")

                return
            default:
                break;
        }
    }
    function repeatRight(div , comming, connection){
        console.log(comming == connection);

        if (comming == connection) {
            return
        }
        console.log(connection, "worked")
        let element2 = document.getElementById(`post${Number(div.getAttribute('data-x')) + 1}x-${Number(div.getAttribute('data-y'))}y`);
        switch (element2.getAttribute("connectiontype")) {
            case "wire":
            case "wireCross":
            case "wireT":
            case "wireCurve":
                div.setAttribute("inTheCircuit", true)
                repetionCircuits(element2, "RealConnection-left");
                break;
            case "resistor":
                console.log("resistor")

                circuitsArray.push({ resistance: Number(element2.getAttribute("resistance")) })
                repetionCircuits(element2, "RealConnection-left");
                break;
            case "battery":
                analizeCircuit();
                console.log("baterry")
            case "none":
                console.log("ended")

                return
            default:
                break;
        }
    }
    function repeatUp(div , comming, connection){
        console.log(comming == connection);

        if (comming == connection) {
            return
        }
        console.log(connection, "worked")

        let element3 = document.getElementById(`post${Number(div.getAttribute('data-x'))}x-${Number(div.getAttribute('data-y')) + 1}y`);
        switch (element3.getAttribute("connectiontype")) {
            case "wire":
            case "wireCross":
            case "wireT":
            case "wireCurve":
                div.setAttribute("inTheCircuit", true)
                repetionCircuits(element3, "RealConnection-down");
                break;
            case "resistor":
                console.log("resistor")

                circuitsArray.push({ resistance: Number(element3.getAttribute("resistance")) })
                repetionCircuits(element3, "RealConnection-down");
                break;
            case "battery":
                console.log("baterry")
                analizeCircuit();
            case "none":
                console.log("ended")

                return

            default:
                break;
        }

    }
    function repeatDown(div , comming, connection){
        console.log(comming == connection);
        if (comming == connection) {
            return
        }
        console.log(connection, "worked")

        let element4 = document.getElementById(`post${Number(div.getAttribute('data-x'))}x-${Number(div.getAttribute('data-y')) - 1}y`);
        switch (element4.getAttribute("connectiontype")) {
            case "wire":
            case "wireCross":
            case "wireT":
            case "wireCurve":
                div.setAttribute("inTheCircuit", true)
                repetionCircuits(element4, "RealConnection-up");
                break;
            case "resistor":
                console.log("resistor")

                circuitsArray.push({ resistance: Number(element4.getAttribute("resistance")) })
                repetionCircuits(element4, "RealConnection-up");
                break;
            case "battery":
                console.log("baterry")
                analizeCircuit();
            case "none":
                console.log("ended")

                return

            default:
                break;
        }

    }
    // circuitsArray = [{voltage : 2}, {resistance: 4  }]
    function analizeCircuit(){
        let voltage = 0;
        let resistance = 0;

        for (const circuitElement of circuitsArray) {
            console.log(Object.keys(circuitElement), circuitElement, "caca", Object.keys(circuitElement) == "resistance"    )
            switch (Object.keys(circuitElement)[0]) {
                case "voltage":
                    console.log("adding volts")
                    voltage = voltage + Object.values(circuitElement)[0]

                    break;
                case "resistance":
                    console.log("adding resistance")

                    resistance = resistance + Object.values(circuitElement)[0]
                    break
                default:
                    break;
            }

        }

        let current = voltage/resistance;
        console.log(current, voltage, resistance)

        updateCurrentValue(current)
    }

    function updateCurrentValue(current){
        for (const div of document.getElementById("circuits").children) {
            if (div.getAttribute("connectiontype").substring(0,4) == "wire" && div.getAttribute("inTheCircuit") == "true") {
                console.log(div.getAttribute("connectiontype"))
                div.setAttribute("current", current)
            }
        }
    }
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

    function realConnectLeft(child, realConnect) {
        child.setAttribute(realConnect, true);
        if (document.getElementById(`post${Number(child.getAttribute('data-x')) - 1}x-${Number(child.getAttribute('data-y'))}y`).getAttribute("RealConnection-right") == "false") {
            document.getElementById(`post${Number(child.getAttribute('data-x')) - 1}x-${Number(child.getAttribute('data-y'))}y`).setAttribute("realConnection-count", realConnect)
            realConnectionsAdd(document.getElementById(`post${Number(child.getAttribute('data-x')) - 1}x-${Number(child.getAttribute('data-y'))}y`))
        }
    }
    function realConnectRight(child, realConnect) {
        child.setAttribute(realConnect, true);
        if (document.getElementById(`post${Number(child.getAttribute('data-x')) + 1}x-${Number(child.getAttribute('data-y'))}y`).getAttribute("RealConnection-left") == "false") {
            document.getElementById(`post${Number(child.getAttribute('data-x')) + 1}x-${Number(child.getAttribute('data-y'))}y`).setAttribute("realConnection-count", realConnect)
            realConnectionsAdd(document.getElementById(`post${Number(child.getAttribute('data-x')) + 1}x-${Number(child.getAttribute('data-y'))}y`))
        }
    }
    function realConnectUp(child, realConnect) {
        child.setAttribute(realConnect, true);
        if (document.getElementById(`post${Number(child.getAttribute('data-x'))}x-${Number(child.getAttribute('data-y')) + 1}y`).getAttribute("RealConnection-down") == "false") {
            document.getElementById(`post${Number(child.getAttribute('data-x'))}x-${Number(child.getAttribute('data-y')) + 1}y`).setAttribute("realConnection-count", realConnect)
            realConnectionsAdd(document.getElementById(`post${Number(child.getAttribute('data-x'))}x-${Number(child.getAttribute('data-y')) + 1}y`))
        }
    }
    function realConnectDown(child, realConnect) {
        child.setAttribute(realConnect, true);
        if (document.getElementById(`post${Number(child.getAttribute('data-x'))}x-${Number(child.getAttribute('data-y')) - 1}y`).getAttribute("RealConnection-up") == "false") {
            document.getElementById(`post${Number(child.getAttribute('data-x'))}x-${Number(child.getAttribute('data-y')) - 1}y`).setAttribute("realConnection-count", realConnect)
            realConnectionsAdd(document.getElementById(`post${Number(child.getAttribute('data-x'))}x-${Number(child.getAttribute('data-y')) - 1}y`))
        }
    }


    function realConnectionsAdd(child) {
        for (const realConnect of RealConnectArr) {
            for (const connect of ConnectArr) {
                if (child.getAttribute(connect) == "true" && RealConnectArr.indexOf(realConnect) == ConnectArr.indexOf(connect)) {
                    switch (child.getAttribute("connectionType")) {
                        case "wire":
                        case "battery":
                        case "inductor":
                        case "anmeter":
                        case "voltmeter":
                        case "resistor":
                        case "closedSwitch":
                            switch (child.getAttribute("rotation")) {
                                case "0":
                                case "180":
                                    if (realConnect == "RealConnection-left") {
                                        realConnectLeft(child, realConnect);
                                    }
                                    else if (realConnect == "RealConnection-right") {
                                        realConnectRight(child, realConnect);
                                    }
                                    else {
                                        realCount(child);
                                    }
                                    break;
                                case "90":
                                case "270":
                                    if (realConnect == "RealConnection-down") {
                                        realConnectDown(child, realConnect);
                                    }
                                    else if (realConnect == "RealConnection-up") {
                                        realConnectUp(child, realConnect);
                                    }
                                    else {
                                        realCount(child);
                                    }
                                    break;
                            }
                            break;
                        case "wireCurve":
                            switch (child.getAttribute("rotation")) {
                                case "0":
                                    if (realConnect == "RealConnection-down") {
                                        realConnectDown(child, realConnect);
                                    }
                                    if (realConnect == "RealConnection-right") {
                                        realConnectRight(child, realConnect);
                                    }
                                    if (realConnect == "RealConnection-down") {
                                    }
                                    else if (realConnect == "RealConnection-right") {
                                    }
                                    else {
                                        realCount(child);
                                    }

                                    break;
                                case "90":
                                    if (realConnect == "RealConnection-down") {
                                        realConnectDown(child, realConnect);
                                    }
                                    if (realConnect == "RealConnection-left") {
                                        realConnectLeft(child, realConnect);
                                    }
                                    if (realConnect == "RealConnection-right" || realConnect == "RealConnection-up") {
                                        realCount(child);
                                    }

                                    break;
                                case "180":
                                    if (realConnect == "RealConnection-up") {
                                        realConnectUp(child, realConnect);
                                    }
                                    if (realConnect == "RealConnection-left") {
                                        realConnectLeft(child, realConnect);
                                    }
                                    if (realConnect == "RealConnection-right" || realConnect == "RealConnection-down") {
                                        realCount(child);
                                    }
                                    break;

                                case "270":
                                    if (realConnect == "RealConnection-up") {
                                        realConnectUp(child, realConnect);
                                    }
                                    if (realConnect == "RealConnection-right") {
                                        realConnectRight(child, realConnect);
                                    }
                                    if (realConnect == "RealConnection-left" || realConnect == "RealConnection-down") {
                                        realCount(child);
                                    }
                                    break;
                                    ;
                            }
                            break;
                        case "wireT":
                            switch (child.getAttribute("rotation")) {
                                case "0":
                                    if (realConnect == "RealConnection-up") {
                                        realConnectUp(child, realConnect);
                                    }
                                    if (realConnect == "RealConnection-right") {
                                        realConnectRight(child, realConnect);
                                    }
                                    if (realConnect == "RealConnection-left") {
                                        realConnectLeft(child, realConnect);
                                    }
                                    if (realConnect == "RealConnection-up") {
                                    }
                                    else if (realConnect == "RealConnection-right") {
                                    }
                                    else if (realConnect == "RealConnection-left") {
                                    }
                                    else {
                                        realCount(child);
                                    }
                                    break;
                                case "90":
                                    if (realConnect == "RealConnection-down") {
                                        realConnectDown(child, realConnect);
                                    }
                                    if (realConnect == "RealConnection-up") {
                                        realConnectUp(child, realConnect);
                                    }
                                    if (realConnect == "RealConnection-right") {
                                        realConnectRight(child, realConnect);
                                    }
                                    if (realConnect == "RealConnection-down") {
                                    }
                                    else if (realConnect == "RealConnection-up") {
                                    }
                                    else if (realConnect == "RealConnection-right") {
                                    }
                                    else {
                                        realCount(child);
                                    }
                                    break;
                                case "180":
                                    if (realConnect == "RealConnection-down") {
                                        realConnectDown(child, realConnect);
                                    }
                                    if (realConnect == "RealConnection-right") {
                                        realConnectRight(child, realConnect);
                                    }
                                    if (realConnect == "RealConnection-left") {
                                        realConnectLeft(child, realConnect);
                                    }
                                    if (realConnect == "RealConnection-up") {
                                        realCount(child);
                                    }
                                    break;

                                case "270":
                                    if (realConnect == "RealConnection-down") {
                                        realConnectDown(child, realConnect);
                                    }
                                    if (realConnect == "RealConnection-up") {
                                        realConnectUp(child, realConnect);
                                    }
                                    if (realConnect == "RealConnection-left") {
                                        realConnectLeft(child, realConnect);
                                    }
                                    if (realConnect == "RealConnection-right") {
                                        realCount(child);
                                    }
                                    break;
                            }
                            break;
                        case "wireCross":
                            switch (child.getAttribute("rotation")) {
                                case "0":
                                case "90":
                                case "180":
                                case "270":
                                    if (realConnect == "RealConnection-down") {
                                        realConnectDown(child, realConnect);
                                    }
                                    if (realConnect == "RealConnection-up") {
                                        realConnectUp(child, realConnect);
                                    }
                                    if (realConnect == "RealConnection-left") {
                                        realConnectLeft(child, realConnect);
                                    }
                                    if (realConnect == "RealConnection-right") {
                                        realConnectRight(child, realConnect);
                                    }
                                    break
                            }

                        default:
                            break;
                    }
                }
                else {
                }
            }

        }
        realConnectionsDetector();
    }

    function realCount(child) {
        switch (child.getAttribute("realConnection-count")) {
            case "RealConnection-left":
                document.getElementById(`post${Number(child.getAttribute('data-x')) + 1}x-${Number(child.getAttribute('data-y'))}y`).setAttribute(child.getAttribute("realConnection-count"), false);
                break;
            case "RealConnection-right":
                document.getElementById(`post${Number(child.getAttribute('data-x')) - 1}x-${Number(child.getAttribute('data-y'))}y`).setAttribute(child.getAttribute("realConnection-count"), false);
                break;
            case "RealConnection-up":
                document.getElementById(`post${Number(child.getAttribute('data-x'))}x-${Number(child.getAttribute('data-y')) - 1}y`).setAttribute(child.getAttribute("realConnection-count"), false);
                break;
            case "RealConnection-down":
                document.getElementById(`post${Number(child.getAttribute('data-x'))}x-${Number(child.getAttribute('data-y')) + 1}y`).setAttribute(child.getAttribute("realConnection-count"), false);
                break;
            default:
                break;

        }
        child.setAttribute("realConnection-count", 0)
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
