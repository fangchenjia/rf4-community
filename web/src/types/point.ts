export type Point = {
  "title": string,
  "map": string,
  "fish": string[],
  "baits": string,
  "distance": string,
  "line": string,
  "hook": string,
  "position": number[],
  "fishingTackle": string,
  "fishingGroup": string,
  "description": string,
  "tags": string[],
  "time": string,
  "temperature": string,
  "fishImages": string[],
  "equipmentImages": string[],
  "canvasJson": string,
  "speed": string,
  "depth": string
}

export type PointDetail = Point & {
  views: number,
  likes: string[],
  author: {
    avatar: string,
    nickname: string,
    roles: object[],
  },
  createdAt: string,
  map: {
    name: string,
  },
  fishingTackle: {
    dictName: string,
  },
  fishingGroup: {
    dictName: string,
  },
  fish: {
    name: string,
    image: string,
  }[],
}

