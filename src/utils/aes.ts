import * as crypto from 'crypto';
// 公钥
export const publicKey = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvzOefkM5jWCYpQI9DoFJ
sV7+VJzqR88Hdmhhr6onVNFFQEIF+3WyfQw14/AucAL2XZQDIwMC5OI7wXsXGVsd
YF6ukq/cWDf8RTIyRhibrURZ+JswaYBFgzVpIDO5Mih7p6TmX0Ek/yl16n4ur5ig
w9soppApzjVz83F6UgU5oN07Enzc9RH6eh/1m4bnuVNABLeD8od3q/QCLwBxtimr
QAFwbBkuAVUyCcKdeFlm6leA3RIJHnv1js+6ZacLXQkS/n6vzmRYNje/QrEDeodQ
87gX/ZZRE8d+ED6z0YfTT0BJ0voOktmvUbxg33Jlqgl9A7NQOWhWhwFAGyCtW+HR
+wIDAQAB
-----END PUBLIC KEY-----
`;
// 私钥
export const privateKey = `
-----BEGIN ENCRYPTED PRIVATE KEY-----
MIIFLTBXBgkqhkiG9w0BBQ0wSjApBgkqhkiG9w0BBQwwHAQICvu9hUWZYUQCAggA
MAwGCCqGSIb3DQIJBQAwHQYJYIZIAWUDBAEqBBDNil45CC1wx2xBFZAn2ohoBIIE
0FNtZXJ0cTVSv0ZuT32QrtJAhe5C0sAz3kxohU+ozNDUVy48Xc44Yb9zOUjU8SeB
yg4aYeBupS8PKmSbVO3ieOhAnkad2RkBrB+lg8+qRR/j+xXcpg7y2+7a0zP4xR8Y
zNmDy2wmKZk6v7Lmapp+nlC5tQgjMF5Bop/tapeiib1zRPoli0CV5xSW87320Xou
bKDk5CLeJrnIFoLZB7kAHhV0xSDdTQW+C2HGXnqW3/6AO2Ib53Sv2jm/vQrgzmHp
Z6VpkL0Wpontce0VzLJNhXWmKnou8vgIACfX92Kypu8utKybbX9Cgeev4yshAVHN
bkcuRGoBvtnm4ovmdBBVE1RO4ZIJqCbp5Z0eIxNTuGgI5Leu/ypQh5rs+2jVPS3R
fhf+Mg6+T+eVODrl0SlhzFMsMMpNd7fZ7zeebLX4qlCfO4JogWph1F8kGidqeS7Q
+2MuBzD56hL0YMoSI7uEG/PYCBRmoIxQepE5lWAPZr9de6xOaGBKQx7pF6wPDKNI
GgPdjcfT1Qi2J0Q1T1QVzxTm+dpYnJQoAJ0HO18sqHvfsFYectW10M6qrHPvi9RE
nrFBZBGf+tXbfc2/ly+kDnz1yVpp9H5Nh7yuG4BjBBPMqASfK5jGmcAG2eG0i8iA
Zlq/lxyHdiJYugrEnKgauXnizdxzZP5DWefgUBQw0+l9PIguuFs+ZxTR13+KKe3K
wbbijmfX0t5FHP1lALCcgaMGbs4su+fBarQ4vmxTr9SPXlbqe7DBbUZKhFZV3A/X
FZWaVPvXA5miw/z0J/oOVkFoNRK6I8PnEc3VOqIpAreRkNGltg4E9aWloUCa/IMK
T+frTuPhVUbmwmeVmuKWEy2uH0ciZDCqikAl5PRKttzUBe2wEiodvqv5mRJVACBE
VH+W4Qa8KaGqk3PpacuHmUxcX5rjL6AINokVuqKlUn5Mr1O6xVB+pY47GWo3oEQ9
kPiAo6fa1+AovgsNz2fZsCrrBCNfXF3bnRb/oscW7sHxBhq/Fn+qq+whDmQRzQmj
OM1ciruZQf7kmNQ5nfSdV0DZwa648Wd+htkRpQXWW87B9HesrQduxnnSv3APSKv2
qPNefCBq8jDIguG+/AwheHVoSUBVV3hEkfz01OluzjJynlL3nat7OYRHevvLWrpy
S5tpluqFozI3PJEXzDY1ieb66c0G19cc5G08EnutRj549eMWvqz/YKpYD9a/IULC
mhOMuiZ8l1/P1dpl5vYiOTbO0v0wMl/9Iy6oHssOKtCjkMeHursmYPWYWVB9Hkop
VkVqdPIWe08uJG8VWupt/cBXvsFg8oeReCfz8EmojdApWQYn+TiBCUWAg2w7zHVX
fb/AWgRgQzT88BFroz9UyMV9x8IaU/SUXNRgkyMrTkCoE7XigmgS4yW+SNIGvUmC
ZTTtlNuTKS9ybtQLRVuVYgfbQd7IAofVdURDRwO+JsvkyZgx5ADxlX+ydMRUIU0O
hRwDZDFYzyU/UxZ/RKNDql/hmMCYlcDDu6TBOvVE8OuohNIzJPdAQApb+euQSGaP
BmH+L/VKTmESmcvBr6Z7Pv+q7QJMRe6AQMfowNStVT/VP/hNvY2Eouf60/UTb4nS
3h6duOrRpqmTXdsH/YCXH0Bv/s0Kjx4QSLhYaRbNpYes
-----END ENCRYPTED PRIVATE KEY-----
`;

const aesKey = 'lwx';

/**
 * 生成公私钥对
 * @return {*} publicKey: 公钥;privateKey: 私钥
 */
export function genRSAKeyPaire(passphrase=aesKey) {
    console.log(crypto)
    const {publicKey, privateKey} = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048, // 模数的位数，即密钥的位数，2048 或以上一般是安全的
        publicExponent: 0x10001, // 指数值，必须为奇数，默认值为 0x10001，即 65537
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8', // 用于存储私钥信息的标准语法标准
            format: 'pem', // base64 编码的 DER 证书格式
            cipher: 'aes-256-cbc', // 加密算法和操作模式
            passphrase
        }
    });
    console.log(publicKey, privateKey)
}

// 使用公钥加密数据
export function publicEncrypt(data:string, publicKey:string, encoding:BufferEncoding) {
    const msg = JSON.stringify(data);
    const encryptBuffer = crypto.publicEncrypt({
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PADDING // 填充方式，需与解密一致
    }, Buffer.from(msg, 'utf8'));
    if (encoding) {
        return encryptBuffer.toString(encoding);
    } else {
        return encryptBuffer;
    }
}

// 使用私钥解密数据
function privateDecrypt(privateKey:string, passphrase:string, encryptBuffer:Buffer) {
    const msgBuffer = crypto.privateDecrypt({
        key: privateKey,
        passphrase,
        padding: crypto.constants.RSA_PKCS1_PADDING
    }, encryptBuffer);

    return JSON.parse(msgBuffer.toString('utf8'));
}

// 使用私钥签名数据
function privateSign(privateKey:string, passphrase:string, encryptBuffer:Buffer, encoding:BufferEncoding ) {
    const sign = crypto.createSign('SHA256');
    sign.update(encryptBuffer);
    sign.end();
    const signatureBuffer = sign.sign({
        key: privateKey,
        passphrase
    });
    if (encoding) {
        return signatureBuffer.toString(encoding);
    } else {
        return signatureBuffer;
    }
}

// 使用公钥验证签名
function publicVerify(publicKey:string, encryptBuffer:Buffer, signatureBuffer:Buffer) {
    const verify = crypto.createVerify('SHA256');
    verify.update(encryptBuffer);
    verify.end();
    return verify.verify(publicKey, signatureBuffer);
}

// 前端加密
// export function publicKeyEncrypt(data:string) {
//     var msgStr = JSON.stringify(data);
//     var encrypt = new JSEncrypt();
//     encrypt.setPublicKey(publicKey);
//     return encrypt.encrypt(msgStr);
// }

// 解密
export const decrypt = (data:string) => {
    return privateDecrypt(privateKey, aesKey, Buffer.from(data, 'base64'))
}
