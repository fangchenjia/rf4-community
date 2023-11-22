export type PositionCommentItem = {
  _id: string
  position: string
  content: string
  createdAt: string
  user: {
    _id: string
    nickname: string
    avatar: string
  }
  toUser?: {
    _id: string
    nickname: string
    avatar: string
  }
  children: PositionCommentItem[]
  parent: string
  likes: string[]
}