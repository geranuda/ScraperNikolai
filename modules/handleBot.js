const handleBot = async function(page) {
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

module.exports = handleBot;