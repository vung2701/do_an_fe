import { getObjFromLocal } from "../types/utils"

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