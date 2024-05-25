import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch({
    headless: false,
    args: ["--start-maximized"],
  });
  const context = await browser.newContext({ viewport: null });

  const page = await context.newPage();
  //-----------------------------------------------------------------------------------------------------------------------------------------------------------
  // OPCIONES
  await page.goto("https://open.bymadata.com.ar/#/options");

  let table = page.locator(".datatable-scroll");

  let aRight = page.locator(".pager").locator(".datatable-icon-right");

  let resOptions = [];

  for (let i = 0; i < 26; i++) {
    const tr = table.locator(".datatable-row-wrapper");

    const rowCnt = await tr.count();

    for (let i = 0; i < rowCnt; i++) {
      const td = tr
        .nth(i)
        .locator(".datatable-row-center")
        .locator(".datatable-body-cell");

      let elem = td.nth(0).locator(".content");

      let base = await elem.innerText();
      let especie = base.slice(0, 3);
      if (especie.slice(0, 3) === "GFG") {
        let mes = base.slice(-2);
        let numero = base.slice(4, -2);
        let cp = base.slice(3, 4);

        if (!resOptions[mes]) resOptions[mes] = [];
        if (!resOptions[mes][cp]) resOptions[mes][cp] = [];
        resOptions[mes][cp].push(numero);
      }

      elem = td.nth(12).locator(".content");
      let price = await elem.innerText();

      elem = td.nth(15).locator(".content");
      let volN = await elem.innerText();

      elem = td.nth(16).locator(".content");
      let volM = await elem.innerText();

      //console.log(base + ' ' + price + ' ' + volN + ' ' + volM);
    }
    await aRight.click({ timeout: 9000 });
  }
  console.log("Options", resOptions);
  //-----------------------------------------------------------------------------------------------------------------------------------------------------------
  //PANEL GENERAL
  await page.goto("https://open.bymadata.com.ar/#/local-stocks-adrs");

  table = page.locator(".datatable-scroll");
  //flechita
  aRight = page.locator(".pager").locator(".datatable-icon-right");

  let headers = page.locator("header");

  setTimeout(async () => {
    let resPanGen = [];
    let buttons = headers.nth(0).locator(".buttonFilter");
    //await buttons.nth(2).click({ timeout: 9000 })
    await buttons.nth(2).click({ timeout: 9000 });

    buttons = headers.nth(1).locator(".buttonFilter");
    //await buttons.nth(2).click({ timeout: 9000 })
    await buttons.nth(2).click({ timeout: 9000 });

    for (let i = 0; i < 4; i++) {
      const tr = table.nth(0).locator(".datatable-row-wrapper");

      const rowCnt = await tr.count();

      for (let i = 0; i < rowCnt; i++) {
        const td = tr
          .nth(i)
          .locator(".datatable-row-center")
          .locator(".datatable-body-cell");

        let elem = td.nth(0).locator(".content");
        let papel = await elem.innerText();

        elem = td.nth(1).locator(".content");
        let time = await elem.innerText();

        let idx = `${papel}-${time}`;

        if (!resPanGen[idx]) resPanGen[idx] = [];

        elem = td.nth(7).locator(".content");
        let apertura = await elem.innerText();

        elem = td.nth(8).locator(".content");
        let minimo = await elem.innerText();

        elem = td.nth(9).locator(".content");
        let maximo = await elem.innerText();

        elem = td.nth(12).locator(".content");
        let cierre = await elem.innerText();

        elem = td.nth(15).locator(".content");
        let volumen = await elem.innerText();

        elem = td.nth(16).locator(".content");
        let volumen_monto = await elem.innerText();

        if (resPanGen[idx].length < 1) {
          resPanGen[idx].push({
            apertura,
            minimo,
            maximo,
            cierre,
            volumen,
            volumen_monto,
          });
          //console.log(papel + ' ' + apertura + ' ' + minimo + ' ' + maximo + ' ' + cierre + ' ' + volumen + ' ' + volumen_monto);}
        }
      }
      await aRight.nth(0).click({ timeout: 9000 });
    }

    console.log("Panel General:", resPanGen);

    //Panel general
    const resPanLid = [];
    for (let i = 0; i < 4; i++) {
      const tr = table.nth(1).locator(".datatable-row-wrapper");

      const rowCnt = await tr.count();

      for (let i = 0; i < rowCnt; i++) {
        const td = tr
          .nth(i)
          .locator(".datatable-row-center")
          .locator(".datatable-body-cell");

        let elem = td.nth(0).locator(".content");
        let papel = await elem.innerText();

        elem = td.nth(1).locator(".content");
        let time = await elem.innerText();

        let idx = `${papel}-${time}`;

        if (!resPanLid[idx]) resPanLid[idx] = [];

        elem = td.nth(7).locator(".content");
        let apertura = await elem.innerText();

        elem = td.nth(8).locator(".content");
        let minimo = await elem.innerText();

        elem = td.nth(9).locator(".content");
        let maximo = await elem.innerText();

        elem = td.nth(12).locator(".content");
        let cierre = await elem.innerText();

        elem = td.nth(15).locator(".content");
        let volumen = await elem.innerText();

        elem = td.nth(16).locator(".content");
        let volumen_monto = await elem.innerText();

        if (resPanLid[idx].length < 1) {
          resPanLid[idx].push({
            apertura,
            minimo,
            maximo,
            cierre,
            volumen,
            volumen_monto,
          });
        }
        //console.log(papel + ' ' + apertura + ' ' + minimo + ' ' + maximo + ' ' + cierre + ' ' + volumen + ' ' + volumen_monto);
      }
      await aRight.nth(1).click({ timeout: 9000 });
    }

    console.log("Panel Lider:", resPanLid);
    await browser.close();
  }, 3000);
})();
