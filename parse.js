const axios = require("axios");
const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs").promises;

async function delay() {
  await setTimeout(() => {}, 300);
}
// Функция логгер
async function log(text) {
  // Выводим текст в консоль
  console.log(text);
  // Запишем текст в файл log.txt
  await fs.appendFile("log.txt", text + "\n");

  await delay();
}

const arrPages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

(async () => {
  for (const page of arrPages) {
    // ссылка
    const link = `https://www.xcom-shop.ru/catalog/kompyutery_i_noytbyki/kompyutery/?list_page=${
      page + 1
    }`;

    // отправляем запрос по ссылке
    await log(`Отправляем запрос по ссылке ${link}`);
    const result = await axios.get(link);

    await log("Загружаем код в библиотеку cheerio");
    const $ = cheerio.load(result.data);

    await log("Создаем путь к файлу с ссылками");
    const putKFailu = path.resolve("links", "url.txt");

    await log("Находим все ссылки на товары и перебираем их в цикле");
    $("a.catalog_item__name.catalog_item__name--tiles").each(
      async (i, element) => {
        const url = $(element).attr("href");
        // Запишем ссылку в файл
        await fs.appendFile(putKFailu, "https://www.xcom-shop.ru" + url + "\n");
      }
    );
  }
})();
