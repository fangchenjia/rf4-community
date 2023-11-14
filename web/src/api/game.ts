export const MAP = '/v1/game/maps'
export const DICT = '/v1/game/dicts'
export const MATCH_BAIT = '/v1/game/matchBait'
import type { MapItem, DictItem, BaitItem} from '@/types/gameInfo'
import request from '@/utils/request'

export const getMaps = () => {
  return request.get<MapItem[]>(MAP)
}

export const getDicts = (type: string) => {
  return request.get<DictItem[]>(DICT, { type })
}

export const getMatchBaits = (bait: string) => {
  return request.get<BaitItem[]>(MATCH_BAIT, { bait })
}