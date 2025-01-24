import { defineConfig } from 'cypress';

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
    baseUrl: 'https://a-sakagami.github.io/static_E2Esite',
    
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
    // ローカル環境のURL
    devUrl: "http://localhost:1313/static_E2Esite",
  },
});
