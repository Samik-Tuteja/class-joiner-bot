const express = require("express");
const app = express();
const puppeteer = require("puppeteer");
const fs = require("fs");
const editJsonFile = require("edit-json-file");
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const rawdata = fs.readFileSync('data.json');
const student = JSON.parse(rawdata);

app.get("/", (req, res) => {
    if(!student.email === true || !student.name === true){
        res.render("home.ejs")
    }
    res.redirect("/dashboard")
});

app.get("/dashboard", async(req, res) => {
        res.render("main.ejs", {
          classes: student.classes,
          studentname: student.name,
      })
});


app.post("/details", (req, res) => {
    if(!student.email === true || !student.name){
    let file = editJsonFile(`${__dirname}/data.json`);
    file.set("name", `${req.body.username}`);
    file.set("class", `${req.body.cilass}`);
    file.save();
    file = editJsonFile(`${__dirname}/data.json`, {
        autosave: true
    });
    }
    res.redirect("/dashboard")
})

app.post("/joinclass", async(req, res) => {
    const {chooseclass} = req.body;
    const indexclass = student.classes.indexOf(chooseclass);
    const classurlmain = student.classlink[indexclass];

      const browser = await puppeteer.launch({headless: false,args: [ '--use-fake-ui-for-media-stream', "--disable-notifications"]});
      const page = await browser.newPage()
      await page.goto(`${classurlmain}`)
      await page.setViewport({width: 1920, height: 870 });
    
      await page.waitForSelector("#identifierId");
      await page.type("#identifierId", `${student.email}`, {delay: 30});
      
      await page.waitForSelector(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b")
      await page.click(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b")
      
      await page.waitForSelector('input[name="password"]', {
        visible: true,
      });
      await page.type('input[name="password"]', `${process.env.password}`, {delay: 30})

      const getpagelink = page.url();
      
      await page.waitForSelector(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b")
      await page.click(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc.lw1w4b")
    
      await page.waitForSelector(".uArJ5e.TuHiFd.UQuaGc.Y5sE8d.H0ANOe a")
      const urlhandle = await page.$('.uArJ5e.TuHiFd.UQuaGc.Y5sE8d.H0ANOe a');
      const url = await page.evaluate((el) => el.href, urlhandle)
      await page.close();
    
      const page2 = await browser.newPage();
      await page2.goto(`${url}`)
      await page2.setViewport({width: 1920, height: 870 });
      await page2.waitForSelector(".Yi3Cfd")

      await page2.waitFor(2000)

      const checklinkhandle = await page2.$('.Yi3Cfd');
      const checklink = await page2.evaluate((el) => el.textContent, checklinkhandle)
      console.log(checklink)
      if(checklink !== "No one else is here"){
        await page2.waitForSelector(".GOH7Zb .U26fgb.JRY2Pb.mUbCce.kpROve.yBiuPb.y1zVCf.HNeRed.M9Bg4d");
        await page2.click(".GOH7Zb .U26fgb.JRY2Pb.mUbCce.kpROve.yBiuPb.y1zVCf.HNeRed.M9Bg4d");

        await page2.waitForSelector(".U26fgb.JRY2Pb.mUbCce.kpROve.yBiuPb.y1zVCf.HNeRed.M9Bg4d");
        await page2.click(".U26fgb.JRY2Pb.mUbCce.kpROve.yBiuPb.y1zVCf.HNeRed.M9Bg4d");

        await page2.waitForSelector(".uArJ5e.UQuaGc.Y5sE8d.uyXBBb.xKiqt")
        await page2.click(".uArJ5e.UQuaGc.Y5sE8d.uyXBBb.xKiqt")

        await page2.waitForSelector(".VfPpkd-Bz112c-LgbsSe.yHy1rc.eT1oJ.JsuyRc.boDUxc")
        await page2.evaluate(() => {
            document.querySelectorAll(".VfPpkd-Bz112c-LgbsSe.yHy1rc.eT1oJ.JsuyRc.boDUxc")[2].click();
      });
      await page2.waitForSelector(".KHxj8b.tL9Q4c")
      await page2.type(".KHxj8b.tL9Q4c", "present")


      await page2.keyboard.press('Enter');
             
    }else{
    await page2.close();
    const page3 = await browser.newPage();
    await page3.goto(`${getpagelink}`);
    await page3.setViewport({width: 1920, height: 870 });

    await page3.waitForSelector('.n8F6Jd .pco8Kc.obylVb.j70YMc span')
    const checkclassroomlinkhandle = await page3.$('.n8F6Jd .pco8Kc.obylVb.j70YMc span');
    const checkclassroomlink = await page3.evaluate((el) => el.textContent, checkclassroomlinkhandle)

    await page3.close();

    const page4 = await browser.newPage();
    await page4.goto(`${checkclassroomlink}`)
    await page4.setViewport({width: 1920, height: 870 });


    if(checklink !== "No one else is heree"){
        await page4.waitForSelector(".GOH7Zb .U26fgb.JRY2Pb.mUbCce.kpROve.yBiuPb.y1zVCf.HNeRed.M9Bg4d");
        await page4.click(".GOH7Zb .U26fgb.JRY2Pb.mUbCce.kpROve.yBiuPb.y1zVCf.HNeRed.M9Bg4d");

        await page4.waitForSelector(".U26fgb.JRY2Pb.mUbCce.kpROve.yBiuPb.y1zVCf.HNeRed.M9Bg4d");
        await page4.click(".U26fgb.JRY2Pb.mUbCce.kpROve.yBiuPb.y1zVCf.HNeRed.M9Bg4d");

        await page4.waitFor(2000)

        await page4.waitForSelector(".uArJ5e.UQuaGc.Y5sE8d.uyXBBb.xKiqt")
        console.log("click karo friends")
        await page4.click(".uArJ5e.UQuaGc.Y5sE8d.uyXBBb.xKiqt")

        await page4.waitForSelector(".VfPpkd-Bz112c-LgbsSe.yHy1rc.eT1oJ.JsuyRc.boDUxc")
        await page4.evaluate(() => {
            document.querySelectorAll(".VfPpkd-Bz112c-LgbsSe.yHy1rc.eT1oJ.JsuyRc.boDUxc")[2].click();
      });
      await page4.waitForSelector(".KHxj8b.tL9Q4c")
      await page4.type(".KHxj8b.tL9Q4c", "present")


      await page4.keyboard.press('Enter');
             
    }else{
        console.log("ono")
    }
}
})

app.post("/addclass", async(req, res) => {
    const {classlink, classname} = req.body;
    let file = editJsonFile(`${__dirname}/data.json`);
    file.append("classes", `${classname}`);
    file.append("classlink", `${classlink}`)
    file.save();
    file = editJsonFile(`${__dirname}/data.json`, {
        autosave: true
    });
    res.redirect("/dashboard")
})

app.listen(5000, console.log(`Server running at 5000`));

