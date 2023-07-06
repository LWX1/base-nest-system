import { ServiceUnavailableException } from "@nestjs/common"

/**
 * 
 * @param text 报错信息
 */
export const GeneralException = (text:string) => {
    throw new ServiceUnavailableException(text);
}