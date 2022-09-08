const fs=require(`fs`)
const path=require(`path`)
const nodetest=(req,res)=>{
    console.log(req)
    res.status(200).json("ok")
}

const about=(req,res)=>{
    url=req.protocol + '://' + req.get('host') + req.originalUrl;
    res.status(200).send(`<h1>${url}</h1>`)
}
const return_dirName=(req,res)=>{
    res.status(200).send(__dirname)
}
const getFile=(req,res)=>{
    pathFile=path.join(__dirname,"..",req.params.filename)
    console.log(pathFile)
    if (!fs.existsSync(pathFile))
        res.status(400).json({msg:"file not found"})
    else {
        
        res.status(200).send(fs.readFileSync(pathFile)  )
    }
    
}
const timeNow=()=>{
    res.status(200).send(new Date())
}
module.exports={
    nodetest,about,return_dirName,getFile,timeNow
}