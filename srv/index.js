import express from 'express';
import puppeteer from 'puppeteer'

export default (app, http) => {
  app.use(express.json());

  app.get('/api', (req, res) => {
    res.json({ msg: 'service is up' });
  });

  app.get('/api/generate/ujoint/:id', async (req, res) => {
    try {
      const partNumber = req.params.id
      const url = `https://www.docsautoparts.com/product/${partNumber}`

      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.goto(url)

      // Find the location
      const location = await page.evaluate(async () => {
        const element = document.querySelector(".location").textContent
        return element
      })

      // Find the images src
      const src = await page.evaluate(async () => {
        const element = document.querySelector('.zoomImg').getAttribute('src')
        return element
      })

      // Find the price
      let price = await page.evaluate(async () => {
        const element = document.querySelector('.price').textContent;
        return element
      });
      price = price.split(" ")[1]

      // Extract the part number and prefix it with the Doc's D
      const partName = `D${partNumber.slice(2, partNumber.length)}`

      // Find replaces at text
      const replaces = await page.$$(".woocommerce-product-details__short-description")

      // Format all of the part data into an object
      const partData =
      {
        price: price,
        img: src,
        title: `Doc's Auto Parts | ${partName} | Universal Joint | ${location}`,
        firstBullet: `REPLACES - `,
        secondBullet: `BUILT TO LAST - Our ${partName} U Joint is made with chrome-nickel alloy steel that is induction heated with hardened bearing caps and coated to resist oxidation and corrosion. You can be sure this U joint is in it for the long haul.`,
        thirdBullet: `OEM GRADE QUALITY - We stand behind the durability and quality of every single one of our parts. Our U Joints are thoroughly tested and of OEM grade quality.`,
        fourthBullet: `FAMILY VALUES - Docs Auto Parts is a family business and those family values extend to all our customers. If you feel our product has not lived up to your expectations in some way please reach out to us and we’ll resolve your concerns immediately!`,
        keywords: `spicer life non greaseable universal joint snap ring outside style bearing cap diameter strength alloy steel cross torque horsepower flush lube fitting needle hardness carboxylated nitrile rubber grease seal use compressed double lip design moog`
      }

      // console.log('partData', partData)
      await browser.close()

      // Send part data payload
      res.json(partData)
    } catch (err) {
      console.error(err)
    }
  })
}
