import {request} from './request'

export function getAddressList(){
  return request({
    url:'/api/address',
  })
}

export function addAddress(data){
  return request({
    url: '/api/address',
    method: 'post',
    data
  })
}

export function getAddress(id){
  return request({
    url: '/api/address/'+id,
  })
}

export function updateAddress(id,data){
  return request({
    url: '/api/address/'+id,
    method:'put',
    data
  })
}

export function deleteAddress(id){
  return request({
    url: '/api/address/'+id,
    method:'delete',
  })
}

export function setAddressDefault(id){
  return request({
    url: `/api/address/${id}/default`,
    method:'PATCH',
  })
}