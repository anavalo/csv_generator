import * as fs from 'fs';
import { faker } from '@faker-js/faker';

const generateAndExportCSV = (): void => {
    const header = 'external_id,user.display_name,user.email\n';
    let csvContent = header;

    for (let i = 0; i < 10; i++) {
        const externalId = '+' + faker.phone.number('54911########');
        const displayName = faker.name.firstName();
        const email = faker.internet.email(displayName.toLowerCase());

        csvContent += `${externalId},${displayName},${email}\n`;
    }

    fs.writeFileSync('output.csv', csvContent, 'utf8');
}

generateAndExportCSV();