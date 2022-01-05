const puppeteer = require('puppeteer-extra');
const podio = require('./podio');


(async () => {
const LOGIN_SMRTPHONE = 'https://phone.smrt.studio/login';
const EMAIL = 'closertwoasc@gmail.com';
const PASSWORD = 'Closer2two!' //request password to admin before test;
const page =await podio.initialize() 
await podio.login(EMAIL, PASSWORD, page);
await podio.changeStatus(page)
})()
