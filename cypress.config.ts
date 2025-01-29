import { defineConfig } from 'cypress';
require("dotenv").config();

export default defineConfig({
  // ビューポートのサイズ設定
  viewportWidth: 1280,
  viewportHeight: 720,

  // タイムアウト設定
  defaultCommandTimeout: 10000, // コマンドのタイムアウト（ミリ秒）
  pageLoadTimeout: 10000,       // ページロードのタイムアウト（ミリ秒）

  // レポーターの設定
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: false,
    json: true,
  },

  // E2Eテスト設定
  e2e: {
    // テスト対象のURL
    // baseUrl: 'https://a-sakagami.github.io/static_E2Esite',
    baseUrl: "https://hotel-example-site.takeyaqa.dev/ja",
    // ローカル環境のURL
    // devUrl: "http://localhost:1313/static_E2Esite",
    
    // 全てのテストスクリプトを実行するかどうか
    experimentalRunAllSpecs: true, 

    // テストスクリプトのパス
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', 
    // トランスパイルされたファイルを指定する場合
    //specPattern: 'cypress/dist/e2e/*.js',

    setupNodeEvents(on, config) {
      // Node.js のイベントを設定するコードをここに記述します
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
      });
      return config;
    },
  },

  // ビデオとスクリーンショットの設定
  video: true,
  screenshotOnRunFailure: true,

  // 環境変数
  env: {
    // .env変数をCypressの環境設定に追加
    // プリセットアカウント
    USER1: process.env.CYPRESS_USER1,
    USER1_PASS: process.env.CYPRESS_USER1_PASS,
    USER2: process.env.CYPRESS_USER2,
    USER2_PASS: process.env.CYPRESS_USER2_PASS,
    USER3: process.env.CYPRESS_USER3,
    USER3_PASS: process.env.CYPRESS_USER3_PASS,
    USER4: process.env.CYPRESS_USER4,
    USER4_PASS: process.env.CYPRESS_USER4_PASS,
    // 新規アカウント
    PREMIUM_USER: process.env.CYPRESS_PREMIUM_USER,
    PREMIUM_USER_PASS: process.env.CYPRESS_PREMIUM_USER_PASS,
    NORMAL_USER: process.env.CYPRESS_NORMAL_USER,
    NORMAL_USER_PASS: process.env.CYPRESS_NORMAL_USER_PASS
  },
});
