export class User {

    constructor(
        public email: string,
        public password: string,
    ) { }

}

export class SignUp {
    constructor(
        public token: string,
        public createdAt?: string
    ) { }
}