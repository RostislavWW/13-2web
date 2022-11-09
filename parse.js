const axios = require("axios");
const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs").promises;

(async () => {
  // ссылка
  const link =
    "https://www.xcom-shop.ru/catalog/kompyutery_i_noytbyki/kompyutery/";

  // отправляем запрос по ссылке
  const result = await axios.get(link);

  const $ = cheerio.load(result.data);

  const putKFailu = path.resolve("links", "url.txt");

  $("a.catalog_item__name.catalog_item__name--tiles").each(
    async (i, element) => {
      const url = $(element).attr("href");

      // Запишем ссылку в файл
      await fs.appendFile(putKFailu, "https://www.xcom-shop.ru" + url + "\n");
    }
  );
})();
