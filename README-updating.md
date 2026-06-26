# AI 主題資源網更新說明

主要內容都在 `data.js`，一般更新不需要修改 `index.html`、`styles.css` 或 `app.js`。

## 新增實體館藏

1. 把新書封面圖片放到這個資料夾，例如 `AIbook21.jpg`。
2. 打開 `data.js`。
3. 在 `books` 陣列裡複製一筆 `type: "paper"` 的資料。
4. 修改 `title`、`author`、`publisher`、`code`、`image`、`url`。

範例：

```js
{ type: "paper", title: "新書名", author: "作者", publisher: "出版社", code: "A000000", image: "AIbook21.jpg", url: "館藏查詢連結" }
```

## 新增電子書

1. 放入電子書封面，例如 `book11.jpg`。
2. 在 `books` 陣列裡複製一筆 `type: "ebook"` 的資料。
3. 修改 `title`、`image`、`url`。

範例：

```js
{ type: "ebook", title: "電子書名", image: "book11.jpg", url: "電子書連結" }
```

## 新增影片

YouTube 影片網址通常長這樣：

```text
https://www.youtube.com/watch?v=UGdG4WpluJ8
```

其中 `UGdG4WpluJ8` 就是影片 ID。到 `data.js` 的 `videos` 陣列新增：

```js
{ id: "影片ID", title: "影片標題", channel: "頻道名稱" }
```

縮圖與播放連結會自動產生。

## 新增工具或課程

在 `tools` 或 `courses` 陣列新增一筆資料，修改標題、標籤、說明與連結即可。

工具如果有 `domain`，網站會自動抓取網站小圖示：

```js
{ title: "工具名稱", tag: "用途標籤", text: "簡短說明", domain: "example.com", url: "https://example.com/" }
```

## 建議維護方式

- 圖片檔名用英文與數字，避免空白。
- 新增資料時，每一筆結尾保留逗號。
- 如果頁面突然沒有顯示內容，通常是 `data.js` 少了逗號、引號或括號。

## 瀏覽人次計數器

網站已加入共用計數器：

- `counter.js`：負責顯示與送出瀏覽紀錄。
- `counter-config.js`：設定網站代號與統計服務網址。

目前 `counter-config.js` 的 `endpoint` 是空白，所以只會顯示「本機預覽」計數，方便測試樣式。若要真正累計所有訪客瀏覽人次，需要把可以接收紀錄的網址填入：

```js
window.SITE_COUNTER_CONFIG = {
  siteId: "hsc-ai-resource",
  endpoint: "貼上你的統計服務網址"
};
```

統計服務需能接收 `POST` JSON，並回傳其中一種欄位：`count`、`value`、`total` 或 `views`。
