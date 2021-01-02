import {capitalize} from '@core/utils'

export class DomListener {
  constructor($root, name, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided from DomListener()!')
    }
    this.name = name;
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      if (!this[method]) {
        throw new Error(`Method ${method} is not implemented in ${this.ComponentName} component`)
      } else {
        this[method] = this[method].bind(this)
        this.$root.on(listener, this[method])
      }
    })
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      this.$root.off(listener, this[method])
    })
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
