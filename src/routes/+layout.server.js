import * as sun from 'suncalc'

export async function load() {
  return sun.getTimes(new Date(), 51.509718, -0.104315)
}