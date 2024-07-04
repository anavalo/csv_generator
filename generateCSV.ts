import * as fs from 'fs';
import { faker } from '@faker-js/faker';

const randomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateAndExportData = (): void => {
    const header = 'external_id,user.display_name,user.email\n';
    let csvContent = header;
    const externalIds = new Set<string>();

    while (externalIds.size < 12000) {
        const externalId = '+' + faker.phone.number(`54911${randomNumber(3, 8)}#######`);
        
        if (!externalIds.has(externalId)) {
            const displayName = faker.name.firstName();
            const email = faker.internet.email(displayName.toLowerCase());
            csvContent += `${externalId},${displayName},${email}\n`;
            externalIds.add(externalId);
        }
    }

    fs.writeFileSync('output.csv', csvContent, 'utf8');

    const jsonContent = JSON.stringify(Array.from(externalIds), null, 2); 
    fs.writeFileSync('external_ids.json', jsonContent, 'utf8');
}

// Example usage
generateAndExportData();