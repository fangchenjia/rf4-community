export const SUBMIT_POINT = 'v1/point/submitPoint'
export const LAEST_POINTS = 'v1/point/latestPoints'
export const POINT_DETAIL = 'v1/point/pointDetail'
export const LIKE_POINT = 'v1/point/likePoint'
export const POINTS = 'v1/point/points'

import type { Point, PointDetail } from '@/types/point'
import request from '@/utils/request'


export const submitPoint = (data: Point) => {
  return request.post(SUBMIT_POINT, data)
}

export const latestPoints = () => {
  return request.get(LAEST_POINTS)
}

export const getPoints = (query: { map: string, fish?: string}, config?: any) => {
  return request.get<Point[]>(POINTS, query, config)
}

export const getPointDetail = (_id:string, config?: any) => {
  return request.post<PointDetail>(POINT_DETAIL, { _id }, config)
}

export const likePoint = (_id:string) => {
  return request.post<string[]>(LIKE_POINT, { _id })
}
