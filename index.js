// import interact from "./node_modules/interactjs/package.json"

const { default: interact } = require("interactjs");

interact('.item2')
// .on('dragmove dragend', (event)=>{


// })
.draggable({
    listeners: {
    move(event) {
      console.log(event.pageX, event.pageY);
      let target = event.target
      // keep the dragged position in the data-x/data-y attributes
      let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
      let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

      // translate the element
      target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

      // update the posiion attributes
      target.setAttribute('data-x', x)
      target.setAttribute('data-y', y)
      target.style.width = event.rect.width + 'px'
      target.style.height = event.rect.height + 'px'
    }
    
  },
  end (event) {
    var textEl = event.target.querySelector('p')

    textEl && (textEl.textContent =
      'moved a distance of ' +
      (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                 Math.pow(event.pageY - event.y0, 2) | 0))
        .toFixed(2) + 'px')
  },

  inertia: true,
  modifiers: [
    interact.modifiers.restrictRect({
      restriction: 'parent',
      endOnly: true
    })
  ],
  autoScroll: true,


})

.resizable({
  inertia: true,
  // keep the element within the area of it's parent
  modifiers: [
    interact.modifiers.restrictRect({
      restriction: 'parent',
      endOnly: true
    })
  ],
  // enable autoScroll
  autoScroll: true,
  edges: { left: true, right: true },

    listeners: {
      move (event) {
        let target = event.target
        let x = (parseFloat(target.getAttribute('data-x')) || 0)
        let y = (parseFloat(target.getAttribute('data-y')) || 0)

        // update the element's style
        target.style.width = event.rect.width + 'px'
        target.style.height = event.rect.height + 'px'

        // translate when resizing from top or left edges
        x += event.deltaRect.left
        y += event.deltaRect.top
        let angle = getDragAngle(event);
        // target.style.transform = 'translate(' + x + 'px,' + y + 'px) rotate(' + angle + 'rad' + ')'
        // if(move){

        // }
        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
      }
    },

    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: 'parent'
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 100, height: 50 }
      })
    ]
})

interact('.item3').gesturable({
  onmove: function (event) {
    console.log(event)
    let arrow = document.getElementById('arrow')

    angle += event.da

    arrow.style.webkitTransform =
    arrow.style.transform =
      'rotate(' + angle + 'deg)'

    document.getElementById('angle-info').textContent =
      angle.toFixed(2) + '\u00b0'
  },
})

function getDragAngle(event) {
  let box = event.target.parentElement;
  let startAngle = parseFloat(box.getAttribute('data-angle')) || 0;
  let center = {
    x: parseFloat(box.getAttribute('data-right-x')) || 0,
    y: parseFloat(box.getAttribute('data-center-y')) || 0
  };
  let angle = Math.atan2(center.y - event.clientY,
    center.x - event.clientX);

  return angle - startAngle;
}
interact('.rotator')
  .draggable({
    onstart: function(event) {
      let box = event.target.parentElement;
      let rect = box.getBoundingClientRect();

      // store the center as the element has css `transform-origin: center center`
      box.setAttribute('data-center-x', rect.left + rect.width / 2);
      box.setAttribute('data-center-y', rect.top + rect.height / 2);
      // get the angle of the element when the drag starts
      box.setAttribute('data-angle', getDragAngle(event));
    },
    onmove: function(event) {
      let box = event.target.parentElement;

      let pos = {
        x: parseFloat(box.getAttribute('data-x')) || 0,
        y: parseFloat(box.getAttribute('data-y')) || 0
      };

      let angle = getDragAngle(event);

      // update transform style on dragmove
      box.style.transform = 'translate(' + pos.x + 'px, ' + pos.y + 'px) rotate(' + angle + 'rad' + ')';
    },
    onend: function(event) {
      let box = event.target.parentElement;

      // save the angle on dragend
      box.setAttribute('data-angle', getDragAngle(event));
    },
  })



interact(".item")