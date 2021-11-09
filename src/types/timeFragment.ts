export type timeFragment = {
  action: 'nextSlide' | 'append' | 'clean',
  startTime: number,
  endTime: number,
  text: string
}
