export type UserInfo = {
  _id: string
  mobile: string
  nickname: string
  avatar: string
  roles: RoleInfo[]
  status: string
  description: string
}

export type RoleInfo = {
  _id: string
  name: string
}