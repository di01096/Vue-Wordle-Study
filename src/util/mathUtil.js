const RandomNumber = (minNumber, maxNumber) => {
    var date = new Date()
    var seed = date.getFullYear() + date.getMonth() + date.getDate()
    var x = Math.sin(seed) * 10000
    return Math.floor((x - Math.floor(x)) * (maxNumber - minNumber + 1) + minNumber) // x- floor(x) 에서 1이 나올수 없기 때문에 1을 더해서 max 값도 나올 수 있도록 수정.
 }

 export {RandomNumber}