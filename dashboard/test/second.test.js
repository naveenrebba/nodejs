let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

describe("Testing Rest Api", () => {
    it('should return status as 200 for users',(done) =>{
        chai.request(`http://localhost:9100`)
        .get('/users')
        .then((res) => {
            expect(res).to.have.status(200);
            done();
        })
        .catch((err) => {
            throw err;
        })
    })

    it('should return status as 404 for user',(done) =>{
        chai.request(`http://localhost:9100`)
        .get('/use')
        .then((res) => {
            expect(res).to.have.status(404);
            done();
        })
        .catch((err) => {
            throw err;
        })
    })

    it('should return status as 200 for user',(done) =>{
        chai.request(`http://localhost:9100`)
        .post('/addUser')
        .send({"name":"testingUSer","city":"testcity"})
        .then((res) => {
            expect(res).to.have.status(200);
            done();
        })
        .catch((err) => {
            throw err;
        })
    })

})