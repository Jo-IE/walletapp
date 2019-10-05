process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const Transaction = require('../models/transaction');
const User = require('../models/user');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();

chai.use(chaiHttp);



describe('Transaction', () => {

    beforeEach("delete all transactions", (done) => {
        Transaction.deleteMany({}, err => {
            done()
        }).catch(done)
    });
    var recipient = new User({
        name: 'Sami',
        email: 'sami@user.com',
        hashed_pwd: 'passwordhashed',
        username: 'samisays',
        bitcoin_wallet_id: 9212,
        bitcoin_wallet_balance: 88,
    });
    recipient.save((err, msg) => { if (err) { console.log(err) } });
    var sender = new User({
        name: 'Billie',
        email: 'paymybills@user.com',
        hashed_pwd: 'passwordhashed',
        username: 'Billiegoat',
        bitcoin_wallet_id: 9212,
        bitcoin_wallet_balance: 88,
    })
    sender.save((err, msg) => { if (err) { console.log(err) } })
    var transaction = {
        curr_amount: 20,
        curr_type: 'bitcoin',
        source_user: sender.id,
        target_user: recipient.id,
        timestamp_created: Date.now(),
        state: 'Processing'
    }



    it(`it should save a transaction in the database`, (done) => {

        chai.request(server)
            .post('/transaction')
            .send(transaction)
            .then((res) => {
                should.exist(res);
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('success');
                done();
            }).catch(done)

    })


    it(`get all transactions for a particular user`, (done) => {
        chai.request(server)
            .get('/transaction/' + sender.id)
            .then((res) => {
                should.exist(res);
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('success');
                done();
            }).catch(done)

    })
    it('it should get transaction status', (done) => {
        transaction.save((err, msg) => {
            chai.request(server)
                .get('/transaction' + transaction.id)
                .then((res) => {

                    res.should.have.status(200);
                    should.exist(res.body);
                    res.body.should.be.a('object');
                    done();
                }).catch(done)
        })

    })
})
