export const SUBMIT_POINT = 'v1/point/submitPoint'
export const LAEST_POINTS = 'v1/point/latestPoints'
export const POINT_DETAIL = 'v1/point/pointDetail'

import type { Point, PointDetail } from '@/types/point'
import request from '@/utils/request'


export const submitPoint = (data: Point) => {
  return request.post(SUBMIT_POINT, data)
}

export const latestPoints = () => {
  return request.get(LAEST_POINTS)
}

export const getPointDetail = (_id:string, config?: any) => {
  return request.post<PointDetail>(POINT_DETAIL, { _id }, config)
}
