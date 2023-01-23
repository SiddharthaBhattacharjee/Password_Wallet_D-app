pragma solidity ^0.8.4;

contract pwContract {

    event AddData(address recipient, uint pwDataId);
    event DeleteData(uint pwDataId, bool isDeleted);
    event UpdateData(uint pwDataId);

    struct data {
        uint id;
        string sitename;
        string username;
        string password;
        bool isDeleted;
    }

    data[] private pwData;
    mapping(uint256 => address) pwDataToOwner;

    function addData(string memory sitename, string memory username, string memory password, bool isDeleted) external {
        uint pwDataId = pwData.length;
        pwData.push(data(pwDataId,sitename, username, password, isDeleted));
        pwDataToOwner[pwDataId] = msg.sender;
        emit AddData(msg.sender, pwDataId);
    }

    function getMyData() external view returns (data[] memory) {
        data[] memory temporary = new data[](pwData.length);
        uint counter = 0;
        for (uint i = 0; i < pwData.length; i++) {
            if (pwDataToOwner[i] == msg.sender && pwData[i].isDeleted==false) {
                temporary[counter] = pwData[i];
                counter++;
            }
        }
        
        data[] memory result = new data[](counter);
        for (uint i = 0; i < counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

    function deleteData(uint pwDataId, bool isDeleted) external {
        if(pwDataToOwner[pwDataId] == msg.sender) {
            pwData[pwDataId].isDeleted = isDeleted;
            emit DeleteData(pwDataId, isDeleted);
        }
    }

    function updateData(uint pwDataId, string memory sitename, string memory username, string memory password, bool isDeleted) external {
        if(pwDataToOwner[pwDataId] == msg.sender) {
            pwData[pwDataId].sitename = sitename;
            pwData[pwDataId].username = username;
            pwData[pwDataId].password = password;
            pwData[pwDataId].isDeleted = isDeleted;
            emit UpdateData(pwDataId);
        }
    }
}