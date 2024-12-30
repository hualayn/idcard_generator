const constants = require('./constants');

const idcardGenerator = require('./index');
const fs = require('fs');
const path = require('path');

function build_random_number(number){
    return Math.floor(Math.random() * number)
}

function build_random_name(){
    let surname = constants.surnames[build_random_number(constants.surnames.length)]
    let givenname = constants.givenNameChars[build_random_number(constants.givenNameChars.length)]
    if (Math.random() > 0.5){
        second_givenname = constants.givenNameChars[build_random_number(constants.givenNameChars.length)]
        return surname + givenname + second_givenname
    }         
    return surname + givenname
}

function build_random_sex(){
    if (Math.random() > 0.5){ return '男' }
    return '女'
}

function build_random_year(){
    let start_year = 1950
    let year_delta = Math.floor(Math.random() * 50)
    return `${start_year + year_delta}`
}

function build_random_month(){
    return `${Math.floor(Math.random()* 12) + 1}`
}

function build_random_day(){
    return `${Math.floor(Math.random()* 30) + 1}`
}

function build_random_addr() {
    let address = "";
    // 随机选择省份
    let randomProvinceIndex = Math.floor(Math.random() * constants.provinces.length);
    let randomProvince = constants.provinces[randomProvinceIndex];
    address += randomProvince;
    // 如果是直辖市，直接选择区
    if (["北京市", "天津市", "上海市"].includes(randomProvince)) {
        let randomCityIndex = Math.floor(Math.random() * constants.cities[randomProvince].length);
        let randomCity = constants.cities[randomProvince][randomCityIndex];
        address += randomCity;
    } 
    // 随机选择街道
    let randomStreetIndex = Math.floor(Math.random() * constants.streets.length);
    let randomStreet = constants.streets[randomStreetIndex];
    address += randomStreet;
    // 随机生成门牌号（1-1000号）
    let randomHouseNumber = Math.floor(Math.random() * 1000) + 1;
    address += randomHouseNumber + "号";
    return address;
}

function build_random_id_no(){
    let id = `${Math.random()}`.slice(2,16)
    if (id.length != 14) {
        id = `${Math.random()}`.slice(2,16)
    }
    return `${id}1234`
}


function build_random_id_data(){
    let config = {
        name: build_random_name(),
        sex: build_random_sex(),
        nation: '汉',
        year: build_random_year(),
        mon: build_random_month(),
        day: build_random_day(),
        org: '喵喵县公安局',
        validTerm: '2014.01.27-2019.01.27',
        addr: build_random_addr(),
        idn: build_random_id_no(),
        avatar: './images/avatar.png'
    }
    return config
}

// let config = build_random_id_data()

// idcardGenerator(config).then(e => {
//     fs.writeFile(`./id_pics_out/${config.idn}.png`, e, err => {
//         if(err){
//             console.log('idcard-generator：测试失败 ' + e);
//         } else {
//             console.log('idcard-generator：测试成功，文件已保存在：' + path.resolve(__dirname, `./id_pics_out/${config.idn}.png`));
//         }
//     })
// }).catch(err => {
//     console.log('idcard-generator：测试失败\n' + err.stack);
// });



for (i=0;i<3;i++) {
    let config = build_random_id_data()
    idcardGenerator(config).then(e => {
        fs.writeFile(`./id_pics_out/${config.idn}.png`, e, err => {
            if(err){
                console.log('idcard-generator：测试失败 ' + e);
            } else {
                console.log('idcard-generator：测试成功，文件已保存在：' + path.resolve(__dirname, `./id_pics_out/${config.idn}.png`));
            }
        })
    }).catch(err => {
        console.log('idcard-generator：测试失败\n' + err.stack);
    });

}



