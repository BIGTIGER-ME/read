import System from 'main/services/system'
import Message from 'main/services/message'

function createHanlders() {
  const message = new Message()
  const system = new System()

  message.listen()
  system.listen()
}

export default createHanlders
