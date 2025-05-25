

exports.user = (odm) => {
    const userSchema = new odm.Schema({
        username: String,
        email: String,
        phoneNumber: String,
        residenceArea: String,
    });

    return odm.model('User', userSchema);
};