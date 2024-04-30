
import interact from ""

interact('.item').draggable({
    listeners: {
      move (event) {
        console.log(event.pageX,
                    event.pageY)
      }
    }
  })
  