import fs from 'fs';
import path from 'path';
import composite from './index.js';
import build_random_id_data from './core.js';

const generate = async (pic_number) => {
    let save_path = './id_pics_out'
    if (!fs.existsSync(save_path)){
        fs.mkdirSync(save_path)
        console.log(`${save_path} 文件夹创建成功`)
    }

    for (let i=0; i < pic_number; i++) {
        let config = build_random_id_data()
    
        await composite(config).then(e => {
            fs.writeFile(`${save_path}/${i}.png`, e, err => {
                if(err){
                    console.log('idcard-generator：测试失败 ' + e);
                } else {
                    console.log('idcard-generator：测试成功，文件已保存在：' + path.resolve(`${save_path}/${i}.png`));
                }
            })
        }).catch(err => {
            console.log('idcard-generator：测试失败\n' + err.stack);
        });
    }
}

// 修改生成图片的数量
const args = process.argv.slice(2)
if (args[0]) {
    generate(args[0])  // 命令行输入数量
} else {
    generate(5)  // 如果没有输入，默认生成5张图片，可修改
}

