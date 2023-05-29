const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.authenticate = async(data) => {
    const res = await Customer
      .findOne({
        email: data.email,
        password: data.password
      });
    return res;
}

exports.get = async() => {
    const res = await Customer
        .find({}, 'name email password');
    return res;
};

exports.getById = async(id) => {
    const res = await Customer
        .findById(id);
    return res;
};

exports.create = async(data) => {
    var customer = new Customer(data);
    await customer.save();
};

exports.update = async(id, data) => {
    await Customer
        .findByIdAndUpdate(id, {
            $set: {
                name: data.name,
                email: data.email,
                password: data.password
            }
        });
};

exports.updatePassword = async(id, data) => {
    await Customer
        .findByIdAndUpdate(id, {
            $set: {
                password: data.password
            }
        });
};

exports.delete = async(id) => {
    await Customer
       .findByIdAndRemove(id);
};

