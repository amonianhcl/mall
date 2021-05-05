import {request} from "./request"

export function goLogin(data){
  return request({
    url: '/api/auth/login',
    method: 'POST',
    data
  });
}

export function goRegist(data){
  return request({
    url: '/api/auth/register',
    method: "POST",
    data
  });
}

export function goLogout(){
  return request({ 
    url: '/api/auth/logout',
    method: 'POST'
  });
}

export function getUser(){
  return request({ 
    url: '/api/user',
  });
}

export function updateUser(data){
  return request({ 
    url: '/api/user',
    method: 'PUT',
    data
  });
}

export function updateUserAvatar(data){
  return request({ 
    url: '/api/user/avatar',
    method: 'PATCH',
    data
  });
}