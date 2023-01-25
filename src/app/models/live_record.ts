export interface Record {
  hum: number
  temp: number
}

export interface Sensors<T> {
  sensor1: T;
  sensor2: T;
}

export interface Series {
  name: string
  value: number
}

export interface LineData<T> {
  name: string
  series: T[]
}


