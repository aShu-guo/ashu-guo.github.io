console.log(123)

const promise=new Promise((resolve)=>{
    console.log('promise')
    resolve()
})

promise.then(res=>{
    console.log('promise then')
    new Promise(resolve => resolve()).then(()=>{
        console.log('promise then1')
    })
}).then(res=>{
    console.log('promise then2')
})


setTimeout(()=>{
    console.log('setTimeout')
    setTimeout(()=>{
        console.log('nest setTimeout')
    })
})

requestAnimationFrame(()=>{
    console.log('requestAnimationFrame')
})


/*
if 微任务
123
promise
promise then
requestAnimationFrame
setTimeout
 */
/*
if 宏任务
123
promise
promise then
setTimeout
requestAnimationFrame
 */
