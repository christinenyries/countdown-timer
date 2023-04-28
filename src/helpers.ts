export const millisecondsInOneMinute = 1000 * 60
export const millisecondsInOneHour = millisecondsInOneMinute * 60
export const millisecondsInOneDay = millisecondsInOneHour * 24
export const millisecondsToDay = (milliseconds: number) =>
  Math.floor(milliseconds / millisecondsInOneDay)
