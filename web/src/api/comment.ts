export const POSITION_COMMENT = 'v1/comment/position'

import type { PositionCommentItem } from '@/types/comment'
import request from '@/utils/request'


export const CreatePositionComment = (data: object) => {
  return request.post(POSITION_COMMENT, data)
}

export const QueryPositionComment = (position: string) => {
  return request.get<PositionCommentItem[]>(POSITION_COMMENT, { position })
}
