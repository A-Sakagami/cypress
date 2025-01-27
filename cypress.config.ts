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
      // .env変数をCypressの環境設定に追加
      // プリセットアカウント
      config.env.USER1 = process.env.CYPRESS_USER1;
      config.env.USER1_PASS = process.env.CYPRESS_USER1_PASS;
      config.env.USER2 = process.env.CYPRESS_USER2;
      config.env.USER2_PASS = process.env.CYPRESS_USER2_PASS;
      config.env.USER3 = process.env.CYPRESS_USER3;
      config.env.USER3_PASS = process.env.CYPRESS_USER3_PASS;
      config.env.USER4 = process.env.CYPRESS_USER4;
      config.env.USER4_PASS = process.env.CYPRESS_USER4_PASS;
      // 新規アカウント
      config.env.PREMIUM_USER = process.env.CYPRESS_PREMIUM_USER;
      config.env.PREMIUM_USER_PASS = process.env.CYPRESS_PREMIUM_USER_PASS;
      config.env.NORMAL_USER = process.env.CYPRESS_NORMAL_USER;
      config.env.NORMAL_USER_PASS = process.env.CYPRESS_NORMAL_USER_PASS;

      return config;
    },
  },

  // ビデオとスクリーンショットの設定
  video: true,
  screenshotOnRunFailure: true,

  // 環境変数
  env: {
    // ローカル環境のURL
    // devUrl: "http://localhost:1313/static_E2Esite",
  },
});
