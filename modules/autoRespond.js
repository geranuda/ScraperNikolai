const preparePageForTests = require("./preparePageForTests");
const responsesDictionary = require("./responsesDictionary");
const handleBot = require("./handleBot");
const NLP = require("./NLP");
const autoRespond = async (page, login, evadeBot=false)=>{
    const nlp = await NLP.init()
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
            await handleBot(page);
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

            console.log("Navigation done");
            await page.waitForSelector("iframe#main-iframe")
            let iframeHandle = await page.$("iframe#main-iframe");
            let frame = await iframeHandle.contentFrame();
            await frame.waitForSelector(".chat-list li");
            console.log("🎈🎈🎈Chat ready")
            let lastMessage = await frame.evaluate(async ()=>{
                return document.querySelector(".chat-list li.media:last-of-type").classList.contains("reversed") ? "" : document.querySelector(".chat-list li.media:last-of-type .media-content").innerText;
            })

            console.log("📩📩📩", lastMessage)
            
            if(lastMessage !== ""){
                let replyMessage = await NLP.getReplyMsg(lastMessage, nlp)
                console.log(replyMessage)
                console.log("USER SAID:    ", lastMessage, "\nREPLYING WITH: ", replyMessage)
                let chatIframeHandle = await page.$("iframe#main-iframe");
                let chatFrame = await chatIframeHandle.contentFrame();
                await chatFrame.type('[name="enter-message"]', replyMessage)
                await chatFrame.click('.sendMsgConvo')
            }
            



            
        } catch (error) {
            console.log("❌some error",convID, error.message)
        }
    }
}

module.exports = autoRespond;