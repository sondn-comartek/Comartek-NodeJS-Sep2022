const fs=require(`fs`)
const path=require(`path`)

function writeOneFile(path){
    ls=fs.readdirSync(path,{
        encoding:`utf-8`,
        withFileTypes:true
    })
    ls.forEach((dirent)=>{
        if (dirent.isFile()){
            console.log(dirent.name)
            input=fs.readFileSync(path+'/'+dirent.name,{
                encoding:`utf-8`,
            })
            console.log(input)
            newfile='\n=============OUTPUT==============\n'
            fs.appendFileSync(`./output.txt`,`${newfile} name: ${dirent.name}\n content: ${input}`,{
                encoding:"utf-8"
            })
        }
        if (dirent.isDirectory()){
            writeOneFile(path+'/'+dirent.name)
        }
    })
}
const axios=require(`axios`)
//writeOneFile(`./input`)
const weather=async()=>{
    const http=require(`http`).createServer(async (req,res)=>{
        raw =await axios.get(`http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b1b15e88fa797225412429c1c50c122a1`)
        .then((rs)=>rs.data)
        const data={
            "City Name":raw.name,
            "Contry Code": raw.sys.country,
            "Date Time":new Date(Date.now()),
            Description:raw.weather[0].description,
            "Minium temperature":raw.main.temp_min,
            "Maxium temperature":raw.main.temp_max,
            "Humidity":raw.main.humidity,
            "Wind Speed":raw.wind.speed
        }
        console.log(data)
        res.end(JSON.stringify(data))
    })
    http.listen(3000,console.log("weather listening on port 3000"))
}

const convertWeightL=(kg)=>{
    if (isNaN(kg))
        throw new Error(`not a number`)
    lb=(kg*2.20462262).toFixed(2)
    end='--------------------------------------'
    if (!fs.existsSync(`./weight.txt`)||fs.statSync(`./weight.txt`).size==0){
        fs.appendFileSync(`./weight.txt`,`=========== WEIGHT CONVERT TO LB ==========`+
                                            `\nInput: ${kg}`+
                                            `\nOutput: ${lb}`)

    }
    else fs.appendFileSync(`./weight.txt`,`\n${end}`+
                                        `\nInput: ${kg}`+
                                        `\nOutput: ${lb}`)
}
convertWeightL(10)