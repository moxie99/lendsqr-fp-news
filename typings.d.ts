
type SignIn = {
    email: string,
    password: string,
}

type SignUp ={
    name: string,
    email:string,
    password: string,
    confirmPassword: string
}

type user = {
    id: string,
    email: string,
    fullName: string,
    user: {}
};

type userGoogleSignReturn = {
  idToken: string,
  serverAuthCode: string,
  scopes: Array<string>, // on iOS this is empty array if no additional scopes are defined
  user: {
    email: string,
    id: string,
    givenName: string,
    familyName: string,
    photo: string, // url
    name: string // full name
  }
}
