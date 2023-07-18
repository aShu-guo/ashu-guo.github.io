type Callback=(arg:any,index:number)=>void

const callback:Callback=(arg)=>{
    console.log(arg)
}

callback(1,2)
