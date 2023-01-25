const {expect} = require('chai');
const {ethers} = require('hardhat');

describe('pwContract', function (){
    let pwcontract;
    let owner;
    let PWContract;

    const NUM_TOTAL_DATA = 5;

    let totalData;

    beforeEach(async function(){
        PWContract = await ethers.getContractFactory('pwContract');
        [owner] = await ethers.getSigners();
        pwcontract = await PWContract.deploy();

        totalData = [];

        for(let i=0; i<NUM_TOTAL_DATA; i++){
            let data = {
                'sitename': 'sitename: ' + i,
                'username': 'username: ' + i,
                'password': 'password: ' + i,
                'isDeleted': false
            };

            await pwcontract.addData(data.sitename, data.username, data.password, data.isDeleted);
            totalData.push(data);
        }
    });

    describe("Add Data", function(){
        it("Should emit AddData event", async function(){
            let data = {
                'sitename': 'New Data',
                'username': 'New Data',
                'password': 'New Data',
                'isDeleted': false
            };
            await expect(await pwcontract.addData(data.sitename, data.username, data.password, data.isDeleted)).to.emit(pwcontract, 'AddData').withArgs(owner.address, NUM_TOTAL_DATA);
        });
    });

    describe("Get All Data", function(){
        it("should return the correct number of total data",async function(){
            const dataFromChain = await pwcontract.getMyData();
            expect(dataFromChain.length).to.equal(NUM_TOTAL_DATA);
        })
    });

    describe("Delete Data", function(){
        it("should emit delete data event", async function(){
            const DATA_ID = 0;
            const DATA_DELETED = true;

            await expect(
                pwcontract.deleteData(DATA_ID, DATA_DELETED)
            ).to.emit(
                pwcontract, 'DeleteData'
            ).withArgs(
                DATA_ID, DATA_DELETED
            );
        })
    });

    describe("Update Data", function(){
        it("should emit update data event", async function(){
            const DATA_ID = 1;
            let NewData = {
                'sitename': 'New Data ++',
                'username': 'New Data ++',
                'password': 'New Data ++',
                'isDeleted': false
            };

            await pwcontract.updateData(DATA_ID, NewData.sitename, NewData.username, NewData.password, NewData.isDeleted);
            let dataFromChain = await pwcontract.getMyData();

            // await expect(
            //     (dataFromChain[DATA_ID].sitename == NewData.sitename && dataFromChain[DATA_ID].username == NewData.username && dataFromChain[DATA_ID].password == NewData.password)
            // )
            // .true(
            //     pwcontract, 'UpdateData'
            // );
            console.log((dataFromChain[DATA_ID].sitename == NewData.sitename && dataFromChain[DATA_ID].username == NewData.username && dataFromChain[DATA_ID].password == NewData.password))
        })
    });


});