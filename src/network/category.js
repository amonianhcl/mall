import {request} from "./request"

export function getCategories(){
  return request({
    url:"/api/index"
  })
}

export function getGoods(cateId,orderType,page=1){
  return request({
    url: `/api/goods?page=${page}&category_id=${cateId}&${orderType}=1`
  })
}