import { getObjFromLocal } from "../types/untils"

const isLogin = () => {
    const user = getObjFromLocal('user');
    if(user){
        return true;
    }
    return false;
}

export {
    isLogin,
};