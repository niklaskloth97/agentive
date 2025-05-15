import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';
import fs from 'fs';
import path from 'path';
 
export default getRequestConfig(async ({requestLocale}) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  const filePath = path.join(process.cwd(), 'messages', `${locale}.json`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return {
    locale,
    messages: JSON.parse(fileContents)
  };
});