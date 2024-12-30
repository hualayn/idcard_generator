import { surnames, givenNameChars, provinces, cities, streets } from './constants.js';


function build_random_number(number){
    return Math.floor(Math.random() * number)
}

function build_random_name(){
    let surname = surnames[build_random_number(surnames.length)]
    let givenname = givenNameChars[build_random_number(givenNameChars.length)]
    if (Math.random() > 0.5){
        let second_givenname = givenNameChars[build_random_number(givenNameChars.length)]
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
    let randomProvinceIndex = Math.floor(Math.random() * provinces.length);
    let randomProvince = provinces[randomProvinceIndex];
    address += randomProvince;
    // 如果是直辖市，直接选择区
    if (["北京市", "天津市", "上海市"].includes(randomProvince)) {
        let randomCityIndex = Math.floor(Math.random() * cities[randomProvince].length);
        let randomCity = cities[randomProvince][randomCityIndex];
        address += randomCity;
    } 
    // 随机选择街道
    let randomStreetIndex = Math.floor(Math.random() * streets.length);
    let randomStreet = streets[randomStreetIndex];
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
    return {
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
}

export default build_random_id_data