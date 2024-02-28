export function runTask(task: () => void, callback?: () => void) {
  requestIdleCallback((deadline) => {
    if (deadline.timeRemaining() > 0) {
      task()
      callback?.()
    } else {
      runTask(task, callback)
    }
  })
}
