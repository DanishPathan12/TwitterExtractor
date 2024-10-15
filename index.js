const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');

puppeteer.use(StealthPlugin());


(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const username = "trytoscrap69030";
  const password = "qweyru123";

  try {
    // Navigate to the login page
    const loginUrl = 'https://x.com/i/flow/login';
    await page.goto(loginUrl, { waitUntil: 'networkidle2' });

    // Log in to Twitter
    const usernameInputSelector = 'input[name="text"]';
    await page.waitForSelector(usernameInputSelector, { visible: true });
    await page.type(usernameInputSelector, username);
    const nextButtonSelector = '.css-175oi2r:nth-child(6) > .css-146c3p1';
    await page.waitForSelector(nextButtonSelector, { visible: true });
    await page.click(nextButtonSelector);

    // Wait for the password input field
    const passwordInputSelector = '.css-175oi2r:nth-child(3) > .css-175oi2r > .css-175oi2r > .css-175oi2r > .css-175oi2r:nth-child(2)';
    await page.waitForSelector(passwordInputSelector, { visible: true });
    await page.type(passwordInputSelector, password);

    // Click the 'Login' button
    const loginButtonSelector = '.r-19yznuf > .css-146c3p1';
    await page.waitForSelector(loginButtonSelector, { visible: true });
    await page.click(loginButtonSelector);
    await page.waitForNavigation({ waitUntil: 'networkidle2' });


    
    const ExploreSelector='.r-lrvibr:nth-child(3)';
    await page.waitForSelector(ExploreSelector,{visible:true});
    await page.click(ExploreSelector);
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    // wait for search box selector;
    const searchBoxSelector='.r-30o5oe'
    await page.waitForSelector(searchBoxSelector,{visible:true});
    await page.type(searchBoxSelector,"david j malan");
    await page.keyboard.press('Enter');

    

     const profileSelector='		.css-175oi2r:nth-child(3) > .css-175oi2r > .css-175oi2r > .r-1mmae3n';
   // await page.waitForNavigation({ waitUntil: 'networkidle2' });
     await page.waitForSelector(profileSelector,{visible:true});
     await page.click(profileSelector);



    // Navigate to the tweets page or user profile
    const tweetsContainerSelector = '#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-kemksi.r-1kqtdi0.r-1ua6aaf.r-th6na.r-1phboty.r-16y2uox.r-184en5c.r-1c4cdxw.r-1t251xo.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div > div:nth-child(3) > div > div > section'; // Update the selector as needed

    await page.waitForSelector(tweetsContainerSelector, { visible: true });

    // Extract all tweets within the container
    const tweetsData = await page.evaluate((selector) => {
      const tweetsContainer = document.querySelector(selector);
      if (!tweetsContainer) return [];

      const tweetElements = tweetsContainer.querySelectorAll('article'); // Assuming tweets are contained in article tags
      const tweets = Array.from(tweetElements).map(tweet => {
        const content = tweet.querySelector('div[lang]') ? tweet.querySelector('div[lang]').innerText : '';
        const time = tweet.querySelector('time') ? tweet.querySelector('time').getAttribute('datetime') : '';
        return { content, time };
      });

      return tweets;
    }, tweetsContainerSelector);

    // Format the tweets data as JSON
    const tweetsJSON = {
      tweets: tweetsData
    };

    // Output the collected tweets to console
    //console.log(JSON.stringify(tweetsJSON, null, 2));

    // Optionally, save the JSON to a file
    fs.writeFileSync('tweets.json', JSON.stringify(tweetsJSON, null, 2));

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await browser.close();
  }
})();
