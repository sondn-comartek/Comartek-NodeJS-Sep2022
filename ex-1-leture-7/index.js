import fs from "fs";
import path, {
    resolve
} from "path";
const __dirname = path.resolve()
const inputDir = __dirname + "/input"
const outputDir = __dirname + "/output"
const inputs = [{
    fileName: 'file1',
    content: 'Hello content1!'
}, {
    fileName: 'file2',
    content: 'Hello content2!'
}, {
    fileName: 'file3',
    content: 'Hello content3!'
}]
const importInput = () => {
    return new Promise((resolve, reject) => {
        fs.open(inputDir, err => {
            if(err) fs.mkdirSync(inputDir)
            console.log('input directory created')
            inputs.forEach((input, index) => {
                fs.open(inputDir + '/' + input.fileName + '.txt', err => {
                    if(err) return fs.appendFile(inputDir + '/' + input.fileName + '.txt', input.content , function(err) {
                        if(err) return reject(err)
                        console.log('Created !', input.fileName);
                    });
                })
                console.log('inputs file exist')
            })
            return resolve(true)
        })
    })
}
const exportOutput = () => {
    fs.open( outputDir , err => {
        if(err) fs.mkdirSync( outputDir )
        console.log('output directory created')
        fs.readdir(inputDir , (err , files) => {
            for( const fileName of files ) {
                if(path.extname(fileName) === '.txt'){
                    fs.readFile( inputDir + '/' + fileName ,'utf8' , (err , data) => {
                        if(err) throw err ;
                        fs.appendFile(outputDir + '/output.txt' , '__' + fileName + data , function(err) {
                            if(err) throw err ;
                        }); 
                    })
                } 
            }
        })
        
    })
}
importInput().then( status => {
    if(status === true) {
        console.log('import input successfull')
        exportOutput()
        console.log('export successfull')
    }
}).catch(err => {
    console.log(err)
})