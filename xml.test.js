require('jest-xml-matcher');
const fs = require("fs");
test('check xml output', () => {
    const expectedXML = `
  <?xml version="1.0"?>
<people>
    <person>
        <firstname>Carl Gustaf</firstname>
        <lastname>Bernadotte</lastname>
        <phone>
            <mobile>0768-101801</mobile>
            <landline>08-101801</landline>
        </phone>
        <address>
            <street>Drottningholms slott</street>
            <city>Stockholm</city>
            <zipCode>10001</zipCode>
        </address>
        <family>
            <name>Victoria</name>
            <birthYear>1977</birthYear>
            <address>
                <street>Haga Slott</street>
                <city>Stockholm</city>
                <zipCode>10002</zipCode>
            </address>
        </family>
        <family>
            <name>Carl Philip</name>
            <birthYear>1979</birthYear>
            <phone>
                <mobile>0768-101802</mobile>
                <landline>08-101802</landline>
            </phone>
        </family>
    </person>
    <person>
        <firstname>Barack</firstname>
        <lastname>Obama</lastname>
        <address>
            <street>1600 Pennsylvania Avenue</street>
            <city>Washington, D.C</city>
            <zipCode>None</zipCode>
        </address>
    </person>
</people>
`
    fs.readFile('people.xml', 'utf8', (err, data) => {
        let actualXML = data;
        expect(actualXML).toEqualXML(expectedXML);
    });


});

