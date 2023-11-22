export type PositionCommentItem = {
  _id: string
  position: string
  content: string
  createdAt: string
  user: {
    _id: string
    nickname: string
    avatar: string,
    roles: any[]
  }
  toUser?: {
    _id: string
    nickname: string
    avatar: string,
    roles: any[]
  }
  children: PositionCommentItem[]
  parent: string
  likes: string[]
}