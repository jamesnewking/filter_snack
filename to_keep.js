//to run: node to_keep (inFilename, targetFile, logfile)
const keepWords = [`oatmeal`,`beagels`,`chocolate`,`with creme filling`,`doughnuts`,`danish pastry`,`cereals`,`oatmeal`,`cream of wheat`,`honey bunches of oats`,`shredded wheat`,`snacks`,`granola bar`,`popcorn`,`rice cackes`,`pretzels`,`barbecue-flavor`,`chips`,`candies`,`mars snackfood us`];
var fs = require('fs');

console.log(`pulling data from file: `,process.argv[2]);
const fileName = process.argv[2];
let fileData;
let addedRecords = 0;
let startRecords = 0;
let outlog = [];

//check if any words in array keepArr exists in testString
function isinString(testString,keepArr){
    let output = false;
    for (let wIndex=0;wIndex<keepArr.length; wIndex++){
        let regexp = new RegExp(keepArr[wIndex],'gi');
        if( regexp.exec(testString) ){
            output =true;
        }
    }
    return output;
};

fs.readFile(fileName, 'utf8', function (err,data) {
    if (err) {
        return console.log(`something is wrong, maybe file does not exist!`);
    }
    fileData = JSON.parse(data);
    startRecords=fileData.length;
    for (let index=0; index<fileData.length-1; index++){
        //loop through keepWords
        //if keepWords is in fileData[index].name, outlog.push(fileData[index]);
        //addedRecords++
        if(isinString(fileData[index].name,keepWords)){
            addedRecords++;
            outlog.push(fileData[index]);
        }
    }

    returnRecordCount = fileData.length;
    fs.writeFile(process.argv[3], JSON.stringify(fileData), function (err) {
        if (err) throw err;
        console.log(`Saved file ${process.argv[3]}, began with ${startRecords}, and added ${addedRecords}`);
    });

    fs.writeFile(process.argv[4], JSON.stringify(outlog), function (err) {
        if (err) throw err;
        console.log(`Saved file ${process.argv[4]}, outlog file`);
    });

});


