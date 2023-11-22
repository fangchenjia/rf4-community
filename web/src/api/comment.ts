export const POSITION_COMMENT = 'v1/comment/position'
export const POSITION_COMMENT_LIKE = 'v1/comment/position/like'

import type { PositionCommentItem } from '@/types/comment'
import request from '@/utils/request'


export const CreatePositionComment = (data: object) => {
  return request.post(POSITION_COMMENT, data)
}

export const QueryPositionComment = (position: string) => {
  return request.get<PositionCommentItem[]>(POSITION_COMMENT, { position })
}

export const RemovePositionComment = (id: string) => {
  return request.delete(`${POSITION_COMMENT}/${id}`)
}

export const LikePositionComment = (id: string) => {
  return request.post(`${POSITION_COMMENT_LIKE}/${id}`)
}