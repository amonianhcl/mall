import {request} from "./request"

export function getHomeAllData(){
  return request({
    url:"/api/index"
  })
}

export function getHomeTabGoods(type,page=1){
  return request({
    url: `/api/index?${type}=1&page=${page}`
  })
}