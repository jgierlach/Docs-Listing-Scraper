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
      if (price.split(" ").length === 1) {
        price = price.split(" ")[0]
      } else {
        price = price.split(" ")[1]
      }

      // Extract the part number and prefix it with the Doc's D
      const partName = `D${partNumber.slice(2, partNumber.length)}`

      // Generate the product description
      const productDescription = await page.evaluate(async () => {
        const element = document.querySelector(".woocommerce-product-details__short-description").textContent
        return element
      })

      // Split product description into an array and then filter for the comapanies that Doc's replaces
      const replaceValuesArray = productDescription.split("\n").filter(el => {
        if (el.includes("GMB") || el.includes("Spicer") || el.includes("Precision") || el.includes("NEAPCO") || el.includes("Rockford")) {
          return true
        }
        return false
      })

      // Format replacement values for keywords field
      const replacementKeywords = replaceValuesArray.join(" ")

      // Check to see if there were any replacement values
      let replaceValues = ""
      if (replaceValuesArray.length === 0) {
        replaceValues = "This listing had no replacement parts listed so don't use this bullet point."
      } else {
        replaceValues = replaceValuesArray.join(", ")
      }

      // Format all of the part data into an object
      const partData =
      {
        price: price,
        img: src,
        title: `Doc's Auto Parts | ${partName} | Universal Joint | ${location}`,
        firstBullet: `REPLACES - ${replaceValues}`,
        secondBullet: `BUILT TO LAST - Our ${partName} U Joint is made with chrome-nickel alloy steel that is induction heated with hardened bearing caps and coated to resist oxidation and corrosion. You can be sure this U joint is in it for the long haul.`,
        thirdBullet: `OEM GRADE QUALITY - We stand behind the durability and quality of every single one of our parts. Our U Joints are thoroughly tested and of OEM grade quality.`,
        fourthBullet: `FAMILY VALUES - Docs Auto Parts is a family business and those family values extend to all our customers. If you feel our product has not lived up to your expectations in some way please reach out to us and we’ll resolve your concerns immediately!`,
        keywords: `non greaseable universal joint snap ring outside style bearing cap diameter strength alloy steel cross torque horsepower flush lube hardness carboxylated nitrile rubber grease seal use compressed double lip design ujoint u`
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
