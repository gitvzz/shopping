import query from "./query";
import localForage from "localforage";
import JSEncrypt from "jsencrypt"
import md5 from "md5";

const encrypt = (pub_key:string,content:string)=>{
    // 最大加密块长度（对于1024位RSA密钥，最大长度为117字节，2048则最大长度是245）
    const maxContentLength = 117;
    // 分割数据成多个块
    const chunks = [];
    for (let i = 0; i < content.length; i += maxContentLength) {
        chunks.push(content.slice(i, i + maxContentLength));
    }
    const e = new JSEncrypt();
    e.setPublicKey(pub_key)
    const encryptedChunks = chunks.map(chunk => e.encrypt(chunk));
    return encryptedChunks.join('\n');
}

const decrypt = (pri_key:string,chunks:string[])=>{
    const e = new JSEncrypt();
    e.setPrivateKey(pri_key);
    const decryptedChunks = chunks.map(chunk => e.decrypt(chunk as string));
    return decryptedChunks.join('');
}

// 拷贝文本的方法
const copyText = (text:string)=>{
    return navigator.clipboard.writeText(text)
}


export default {
    query,
    encrypt,
    decrypt,
    copyText,
    md5,
};