const XMLWriter = require("xml-writer");

module.exports = {
    arraySorter: arraySorter,
    xmlConverter: xmlConverter
};
function arraySorter(array) {
    let sortedArr = [];
    let personIndex = -1;
    let isAFamily = false;
    let familyIndex = -1;

    array.forEach((row) => {
        let data = row.split('|');
        if (row.startsWith('P')) {
            isAFamily = false;
            familyIndex = -1;

            let person = {
                'firstname': data[1],
                'lastname': data[2],
                'family': []
            }

            personIndex += 1;
            sortedArr.push(person);
        }

        if (row.startsWith('T')) {
            if (isAFamily) {
                sortedArr[personIndex]['family'][familyIndex]['phone'] = {
                    'mobile': data[1],
                    'landline': data[2]
                };
            } else {
                sortedArr[personIndex]['phone'] = {
                    'mobile': data[1],
                    'landline': data[2]
                };
            }
        }

        if (row.startsWith('A')) {
            if (isAFamily) {
                sortedArr[personIndex]['family'][familyIndex]['address'] = {
                    'street': data[1],
                    'city': data[2],
                    'zipCode': data[3]
                };
            } else {
                sortedArr[personIndex]['address'] = {
                    'street': data[1],
                    'city': data[2],
                    'zipCode': data[3]
                };
            }
        }

        if (row.startsWith('F')) {
            isAFamily = true;
            familyIndex = familyIndex + 1;

            sortedArr[personIndex]['family'].push({
                'name': data[1],
                'birthYear': data[2],
            })
        }
    })

    return sortedArr;
}

function addFamilyMemberData(familyData, xw) {
    familyData.forEach(member => {
        xw.startElement('family');
        xw.writeElement('name', member.name);
        xw.writeElement('birthYear', member.birthYear);

        if (member.phone) {
            xw.startElement('phone');
            xw.writeElement('mobile', member.phone.mobile);
            xw.writeElement('landline', member.phone.landline);
            xw.endElement();
        }

        if (member.address) {
            xw.startElement('address');
            xw.writeElement('street', member.address.street || 'None');
            xw.writeElement('city', member.address.city || 'None');
            xw.writeElement('zipCode', member.address.zipCode || 'None');
            xw.endElement();
        }
        xw.endElement()
    })
}
function xmlConverter(fileData) {
    let xw = new XMLWriter(true);
    xw.startDocument();
    xw.startElement('people');

    fileData.forEach((row) => {
        xw.startElement('person');
        xw.writeElement('firstname', row.firstname);
        xw.writeElement('lastname', row.lastname);

        if (row.phone) {
            xw.startElement('phone');
            xw.writeElement('mobile', row.phone.mobile);
            xw.writeElement('landline', row.phone.landline);
            xw.endElement();
        }

        if (row.address) {
            xw.startElement('address');
            xw.writeElement('street', row.address.street || 'None');
            xw.writeElement('city', row.address.city || 'None');
            xw.writeElement('zipCode', row.address.zipCode || 'None');
            xw.endElement();
        }

        if (row.family) {
            addFamilyMemberData(row.family, xw);
        }

        xw.endElement();
    })

    xw.endDocument();
    return xw.toString();
}