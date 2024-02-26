import System from 'main/services/system'
import { Document } from 'main/services'


function createHanlders() {
  const document = new Document()
  const system = new System()

  document.listen()
  system.listen()
}

export default createHanlders
