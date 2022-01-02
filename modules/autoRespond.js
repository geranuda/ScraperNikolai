<<<<<<< HEAD
const preparePageForTests = require("./preparePageForTests");
const responsesDictionary = require("./responsesDictionary");

const autoRespond = async (page, login, evadeBot=false)=>{
    console.log("Sending automated message", login)
    await page.setDefaultNavigationTimeout(0);
    //await preparePageForTests(page);
    const LOGIN_SMRTPHONE = 'https://phone.smrt.studio/login/';
    const EMAIL = 'closertwoasc@gmail.com';
    const PASSWORD = 'Closer2two!' //request password to admin before test;
    
    if(login){
        console.log("Logging in now, evadeBot:", evadeBot)


        await page.goto(LOGIN_SMRTPHONE, {timeout: 0});

        if(evadeBot){
            try {
                console.log("CHecking if the CF page is detected")
                await page.waitForSelector(".cf-browser-verification", {timeout: 5000});
                
                await page.mouse.move(Math.floor(Math.random() * 1920), Math.floor(Math.random() * 1080));
                await page.mouse.move(Math.floor(Math.random() * 1920), Math.floor(Math.random() * 1080));
                await page.mouse.move(Math.floor(Math.random() * 1920), Math.floor(Math.random() * 1080));
                await page.mouse.move(Math.floor(Math.random() * 1920), Math.floor(Math.random() * 1080));
                await page.mouse.move(Math.floor(Math.random() * 1920), Math.floor(Math.random() * 1080));
                await page.evaluate(() => {
                    window.scrollTo(0, document.body.scrollHeight);
                });
                await page.mouse.move(Math.floor(Math.random() * 1920), Math.floor(Math.random() * 1080));
                await page.mouse.move(Math.floor(Math.random() * 1920), Math.floor(Math.random() * 1080));
                await page.mouse.move(Math.floor(Math.random() * 1920), Math.floor(Math.random() * 1080));
    
                await page.waitFor(5000);
                
            } catch (error) {
                try {
                    console.log("❌❌❌❌Second try to evade cloudflare")
                    await page.waitForSelector(".cf-browser-verification");
                    await page.mouse.move(Math.floor(Math.random() * 1920), Math.floor(Math.random() * 1080));
                    await page.mouse.move(Math.floor(Math.random() * 1920), Math.floor(Math.random() * 1080));
                    await page.waitFor(100);
                    await page.mouse.move(Math.floor(Math.random() * 1920), Math.floor(Math.random() * 1080));
                    await page.mouse.move(Math.floor(Math.random() * 1920), Math.floor(Math.random() * 1080));
                    await page.mouse.move(Math.floor(Math.random() * 1920), Math.floor(Math.random() * 1080));
                    await page.evaluate(() => {
                        window.scrollTo(0, document.body.scrollHeight);
                    });
                    await page.mouse.move(Math.floor(Math.random() * 1920), Math.floor(Math.random() * 1080));
                    await page.mouse.move(Math.floor(Math.random() * 1920), Math.floor(Math.random() * 1080));
                    await page.mouse.move(Math.floor(Math.random() * 1920), Math.floor(Math.random() * 1080));
    
                    await page.waitFor(5000);
                } catch (error) {
                    console.log("✔✔✔✔✔cloudflare page not found after second try")
                }
            }
            try {
                await page.waitForSelector(".showSweetAlert.visible");
                await page.click(".cancel");
            } catch (error) {
                console.log("Alert not found", error.message);
            }
        }

        
        await page.waitForSelector('#username');
        await page.type('#username', EMAIL, {delay: 25});
        await page.type('#password', PASSWORD, {delay: 25});
        await page.click('body > div.page-container.login-container > div > div > div > div.panel.panel-body.login-form > form > div:nth-child(5) > button');
        await page.waitForNavigation();
        console.log("Navigation done")  
    }else{
        console.log("Seems already logged in")
    }

    console.log("Logged in , now checking inbox")
    //await page.waitForSelector("#missedCallsAnchor")
    console.log("Page is ready to click on unread messages box")
    //await page.waitFor(9000);
    try {
        await page.evaluate(()=>{
            let a = document.createElement('a');
            a.href = "/inbox";
            document.body.appendChild(a);
            a.click();
        })
    } catch (error) {
        console.log("Error happened, trying again in 9 seconds")
        await page.waitFor(9000);
        await page.evaluate(()=>{
            let a = document.createElement('a');
            a.href = "/inbox";
            document.body.appendChild(a);
            a.click();
        })
    }
    console.log("Clicked on the inbox button🛫🛫🛫")
    //await page.waitFor(9000);
    await page.waitForSelector("iframe#main-iframe")
    const iframeHandle = await page.$("iframe#main-iframe");
    const frame = await iframeHandle.contentFrame();
    await frame.waitForSelector(".table-inbox tr td.table-inbox-checkbox .checkboxSelect")
    
    const conversationIds = await frame.evaluate(async ()=>{
        let inboxItems = document.querySelectorAll(".table-inbox tr td.table-inbox-checkbox .checkboxSelect")
        let conversationIds= [];
        if(inboxItems.length){
        for(item of inboxItems){
            console.log(item.getAttribute("rel"));
            conversationIds.push(item.getAttribute("rel"))
        }
        }
        return conversationIds;
    })
    
    console.log("Conversation IDs", conversationIds)

    for (const convID of conversationIds) {
        try {
            await page.goto("https://phone.smrt.studio/inbox/conversation/"+convID, {timeout: 0})
            //await page.waitFor(10000)
            //await page.waitFor("1000000000")
            // Get the last message and compare
            //await page.waitForNavigation();
            console.log("Navigation done");
            await page.waitForSelector("iframe#main-iframe")
            let iframeHandle = await page.$("iframe#main-iframe");
            let frame = await iframeHandle.contentFrame();
            let lastMessage = await frame.evaluate(async ()=>{
                return document.querySelector(".chat-list li.media:last-of-type").classList.contains("reversed") ? "" : document.querySelector(".chat-list li.media:last-of-type .media-content").innerText;
            })

            //condition for checking last message against the dictionary words
            console.log("📩📩📩", lastMessage)
            for (const template of responsesDictionary) {
                
                //console.log("last message", lastMessage.length , template.messages.some(msg => msg.includes(lastMessage)))
                //check if the lastMessage is found in any of the templates in the responsesDictionary
                if(lastMessage.length > 0 && template.messages.some(msg => msg.toLowerCase() == lastMessage.toLowerCase())){
                    console.log("USER SAID:    ", lastMessage, "\nREPLYING WITH: ", template.reply)
                    let iframeHandle = await page.$("iframe#main-iframe");
                    let frame = await iframeHandle.contentFrame();
                    await frame.type('[name="enter-message"]', template.reply)
                    await frame.click('.sendMsgConvo')
                }
            }
            
        } catch (error) {
            console.log("❌some error",convID, error.message)
        }
    }
}

=======
const autoRespond = async (page, login)=>{
    console.log("Sending automated message", login)
    await page.setDefaultNavigationTimeout(0);
    const LOGIN_SMRTPHONE = 'https://phone.smrt.studio/login';
    const EMAIL = 'closertwoasc@gmail.com';
    const PASSWORD = 'Closer2two!' //request password to admin before test;
    
    if(login){
        console.log("Logging in now")
        await page.goto(LOGIN_SMRTPHONE, {timeout: 0});
        await page.waitForSelector('#username');
        await page.type('#username', EMAIL, {delay: 25});
        await page.type('#password', PASSWORD, {delay: 25});
        await page.click('body > div.page-container.login-container > div > div > div > div.panel.panel-body.login-form > form > div:nth-child(5) > button');
    }else{
        console.log("Seems already logged in")
    }

    console.log("Logged in , now checking inbox")
    //await page.waitForSelector("#missedCallsAnchor")
    console.log("Page is ready to click on unread messages box")
    await page.waitForTimeout(9000);
    try {
        await page.evaluate(()=>{
            let a = document.createElement('a');
            a.href = "/inbox";
            document.body.appendChild(a);
            a.click();
        })
    } catch (error) {
        console.log("Error happened, trying again in 9 seconds")
        await page.waitForTimeout(9000);
        await page.evaluate(()=>{
            let a = document.createElement('a');
            a.href = "/inbox";
            document.body.appendChild(a);
            a.click();
        })
    }
    console.log("Clicked on the inbox button🛫🛫🛫")
    await page.waitForTimeout(9000);
    const iframeHandle = await page.$("iframe#main-iframe");
    const frame = await iframeHandle.contentFrame();
    const conversationIds = await frame.evaluate(async ()=>{
        let inboxItems = document.querySelectorAll(".table-inbox tr td.table-inbox-checkbox .checkboxSelect")
        let conversationIds= [];
        if(inboxItems.length){
        for(item of inboxItems){
            console.log(item.getAttribute("rel"));
            conversationIds.push(item.getAttribute("rel"))
        }
        }
        return conversationIds;
    })
    
    console.log("Conversation IDs", conversationIds)

    for (const convID of conversationIds) {
        try {
            await page.goto("https://phone.smrt.studio/inbox/conversation/"+convID)
            await page.waitForTimeout("10000")
            //await page.waitForTimeout("1000000000")
            // Get the last message and compare
            await page.waitForSelector("iframe#main-iframe")
            let iframeHandle = await page.$("iframe#main-iframe");
            let frame = await iframeHandle.contentFrame();
            let lastMessage = await frame.evaluate(async ()=>{
                return document.querySelector(".chat-list li.media:last-of-type").classList.contains("reversed") ? "" : document.querySelector(".chat-list li.media:last-of-type").innerText
            })

            //condition for checking last message against the dictionary words
            console.log("📩📩📩", lastMessage)
            
        } catch (error) {
            console.log("❌some error",convID, error.message)
        }
    }
}

>>>>>>> ScraperNikola/GerryBranch
module.exports = autoRespond;