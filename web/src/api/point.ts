export const SUBMIT_POINT = 'v1/point/submitPoint'
export const LAEST_POINTS = 'v1/point/latestPoints'
export const POINT_DETAIL = 'v1/point/pointDetail'
export const LIKE_POINT = 'v1/point/likePoint'
export const POINTS = 'v1/point/points'
export const USER_POINTS = 'v1/point/userPoints'
export const USER_RANK = 'v1/point/userRank'

import type { Point, PointDetail } from '@/types/point'
import { type UserInfo } from '@/types/user'
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

export const userPoints = (_id:string) => {
  return request.get<Point[]>(USER_POINTS, { _id })
}

export const userRank = () => {
  return request.get<UserInfo & {count: number}[]>(USER_RANK)
}
