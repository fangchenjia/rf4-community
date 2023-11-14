export const SUBMIT_POINT = 'v1/point/submitPoint'
import type { Point } from '@/types/point'
import request from '@/utils/request'

export const submitPoint = (data: Point) => {
  return request.post(SUBMIT_POINT, data)
}
