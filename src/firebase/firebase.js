import app from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './config';


class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
  }

  //register
  async register(name, email, password) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );

    return await newUser.user.updateProfile({
      displayName: name
    });
  }

  // login
  async login(email,password) {
    return await this.auth.signInWithEmailAndPassword(email,password);
  }

  // logout
  async logout(){
    await this.auth.signOut();
  }

  // reset password
  async resetPassword(email){
    await this.auth.sendPasswordResetEmail(email)
  }
}

const firebase = new Firebase();
export default firebase;