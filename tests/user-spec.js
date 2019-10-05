process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const User = require('../models/user');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();

chai.use(chaiHttp);



describe('User', () => {

    beforeEach("delete all users", (done) => {
        User.deleteMany({}, err => {
            done()
        }).catch(done)
    });
    var user = {
        name: 'Raina',
        email: 'raina@user.com',
        hashed_pwd: 'passwordhashed',
        username: 'rainastpatrick'
    }


    it(`it should save a user's details in the database`, (done) => {

        chai.request(server)
            .post('/createuser')
            .send(user)
            .then((res) => {
                should.exist(res);
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('success');
                done();
            }).catch(done)

    })
    it(`it should add bitcoin currency account for a user`, (done) => {
        let updatedUser = {
            name: 'Raina',
            email: 'raina@user.com',
            hashed_pwd: 'passwordhashed',
            username: 'rainastpatrick',
            bitcoin_wallet_id: 9212,
            bitcoin_wallet_balance: 88,
        }
        chai.request(server)
            .put('/addbitcoin/' + user.id)
            .send(updatedUser)
            .then((res) => {
                should.exist(res);
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('success');
                done();
            }).catch(done)

    })

    it(`it should add ethereum currency account for a user`, (done) => {
        let updatedUser = {
            name: 'Raina',
            email: 'raina@user.com',
            hashed_pwd: 'passwordhashed',
            username: 'rainastpatrick',
            ethereum_wallet_id: 2468,
            ethereum_wallet_balance: 20000,
        }
        chai.request(server)
            .put('/addethereum/' + user.id)
            .send(updatedUser)
            .then((res) => {
                should.exist(res);
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('success');
                done();
            }).catch(done)

    })

    it('it should not POST a user without required field', (done) => {
        let incompleteUser = {
            name: 'Raina',
            hashed_pwd: 'passwordhashed',
            username: 'rainastpatrick'
        }
        chai.request(server)
            .post('/createuser')
            .send(incompleteUser)
            .then((res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('email');
                res.body.errors.pages.should.have.property('kind').eql('required');
                done();
            }).catch(done);
    })



})
