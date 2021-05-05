import {request} from './request'

//加入购物车
export function addCart(data){ //data: goods_id,num >=1
  return request({
    url: '/api/carts',
    method: 'post',
    data
  });
}
//修改购物车物品数量
export function modifyCartNum(id,data){  //id: for param in url  data:num >=1
  return request({
    url: '/api/carts/'+id,
    method: 'put',
    data
  });
}
//移出购物车
export function removeFromCart(id){
  return request({
    url: '/api/carts/'+id,
    method: 'delete'
  });
}
//获取购物车列表
export function getCart(data=''){ //data: include
  return request({
    url: '/api/carts?'+data,
    method: 'get'
  });
}
//修改选中状态：全选，全不选，反选？
export function changeCartStatus(data){ //data: cart_ids (array of id)
  return request({
    url: '/api/carts/checked',
    method: 'PATCH',
    data
  });
}