export const SUBMIT_POINT = 'v1/point/submitPoint'
export const LAEST_POINTS = 'v1/point/latestPoints'

import type { Point } from '@/types/point'
import request from '@/utils/request'

export const submitPoint = (data: Point) => {
  return request.post(SUBMIT_POINT, data)
}

export const latestPoints = () => {
  return request.get(LAEST_POINTS)
}
