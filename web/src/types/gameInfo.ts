export type FishItem = {
  "_id": string,
  "name": string,
  "icon": string,
  "createdAt": string,
  "updatedAt": string,
  "blueWeight": string,
  "rare": string,
  "starWeight": string
}

export type MapItem = {
  "_id": string,
  "name": string,
  "fish": FishItem[]
}

export type DictItem = {
  "_id": string,
  "type": string,
  "dictValue": string,
  "dictName": string
}

export type BaitItem = {
  "_id": string,
  "name": string,
  "icon": string
}