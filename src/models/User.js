exports.user = (odm) => {
    const userSchema = new odm.Schema({
        username: { type: String, required: true },
        email: { type: String, required: true },
        phoneNumber: { type: String, required: false, default: null }, // Puede ser nulo
        residenceArea: { type: String, required: false, default: null }, // Puede ser nulo
        password: { type: String, required: true },
        rol: { type: String, required: false, default: 'user' }
    });

    return odm.model('User', userSchema);
};