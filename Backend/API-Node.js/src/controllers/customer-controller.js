const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');
const authService = require('../services/auth-service');
const path = require('path');
// const filePath = path.join(__dirname, 'pages', 'login', 'login.html');


exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        // res.sendFile(__dirname + 'pages/login/login.html');
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição ...'
        });
    }
};

exports.getById = async(req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);  
        res.status(200).send(data);
    }   catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição ...'
        });
    }
};

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres.');
    contract.isEmail(req.body.email, 'E-mail inválido.');
    contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 6 caracteres.');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles: ['user']
        });

        res.status(201).send({
            message: 'Cliente cadastrado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao cadastrar cliente ...',
            data: e
        });
    }
};

exports.putAll = async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Cliente atualizado com sucesso!'
        });
    } catch {
        res.status(500).send({
            message: 'Falha ao atualizar cliente ...',
        });
    }
};

exports.putPassword = async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Senha do cliente atualizado com sucesso!'
        });
    } catch {
        res.status(500).send({
            message: 'Falha ao atualizar senha do cliente ...',
        });
    }
};

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({
            message: 'Cliente removido com sucesso!'
        });
    } catch {
        res.status(500).send({
            message: 'Falha ao remover cliente ...',
        });
    }
};

exports.login = async(req, res) => {
    try {
        // res.render('login');
        res.sendFile(path.join(__dirname, '..', 'views', 'login', 'login.html'));


      } catch (e) {
        res.status(500).send({
          message: 'Falha ao processar sua requisição... teste 123',
          data: e
        });
      }
}

exports.authenticate = async(req, res, next) => {
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (!customer) {
            res.status(404).send({
                message: 'Usuário ou senha inválidos!'
            });
            return;
        }

        const token = await authService.generateToken({
            id: customer._id,
            email: customer.email, 
            name: customer.name,
            roles: customer.roles
        });

        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição ...',
            data: e
        });
    }
};

exports.refreshToken = async(req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const customer = await repository.getById(data.id);

        if (!customer) {
            res.status(404).send({
                message: 'Cliente não encontrado!' 
            });
            return;
        }

        const tokenData = await authService.generateToken({
            id: customer._id,
            email: customer.email, 
            name: customer.name,
        });

        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao cadastrar cliente ...',
            data: e
        });
    }
};
