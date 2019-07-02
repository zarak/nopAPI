import { config } from 'dotenv';
import * as path from 'path';
import fetch from 'cross-fetch';

const ENV_FILE = path.join(__dirname, '.env');
const loadFromEnv = config({ path: ENV_FILE });

export async function getCodeUrl() {
    const params = {
        client_id: <CLIENT_ID>,
        redirect_uri: 'http://example.com',
        response_type: 'code',
    };
    console.log(params);

    const url = new URL(`http://example.com/OAuth/Authorize`);
    Object.keys(params).forEach(( key ) => url.searchParams.append(key, params[key]));
    const res = await fetch(url.href, { method: 'GET' });
    return res;
}

export async function getToken(code: string) {
    const url = new URL(`http://example.com/api/token`);
    const options = {
        form: {
            client_id: <CLIENT_ID>,
            client_secret: <CLIENT_SECRET>,
            code,
            grant_type: 'authorization_code',
            redirect_ui: 'http://example.com',
        },
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        method: 'POST',
    };

    console.log(options);
    const res = await fetch(url.href, options);
    console.log('res', res);
    return res;
}

const test = async () => {
    const codeUrlString = (await getCodeUrl()).url;
    const code = (new URL(codeUrlString).searchParams.get('code'));
    if (code) {
        console.log('code', code);
        const tokenResponse = await getToken(code);
        console.log('token res', tokenResponse);
    }
};

test();
