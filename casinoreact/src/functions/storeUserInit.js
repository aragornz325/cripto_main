import setUsername from "../store/actionCreators/setUsername";
import { usersController } from '../controllers';

const storeUserInit = async() => {
  const userData = await usersController.getUserData();
  // console.log('userDate', userData)
  if(userData){
    if(userData.username){
      setUsername(userData.username);
    }
  }
}

export default storeUserInit;