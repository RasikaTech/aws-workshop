export class AuthApiMock {

    static signIn(email, password) {
        return Promise.resolve({email: 'test@abc.com'});
    };

    static signUp(email, password) {
        return Promise.resolve({email: 'test@abc.com'});
    };

    static sendPasswordResetEmail(email) {
        return Promise.resolve();
    };
    
    static confirmPasswordReset(email, code, password) {
        return Promise.resolve();
    }
};