// 用于生成时间

// 格式化日期

// export function formDate(time) {
//   if(!time) return '';
//   let date = new Date(time)
//   return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
// }

export function formDate(time) {
  if(!time) return '';
  let date = new Date(time);
  // let dateArr = [];
  let year = date.getFullYear() + '',
  month = (date.getMonth() + 1) + '',
  day = date.getDate() + '',
  hour = date.getHours() + '',
  min = date.getMinutes() + '',
  sec = date.getSeconds() + '';
  // dateArr.push(year, month, day, hour, min, sec);
  
  if(month <= 9){
    month = '0' + month;
  }
  if(day <= 9){
    day = '0' + day;
  }
  if(hour <= 9){
    hour = '0' + hour;
  }
  if(min <= 9){
    min = '0' + min;
  }
  if(sec <= 9){
    sec = '0' + sec;
  }
  
  return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;

}