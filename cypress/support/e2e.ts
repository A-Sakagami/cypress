// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// カスタムコマンドの読み込み
import './commands';

// 必要に応じて初期化コードを追加
Cypress.on('uncaught:exception', (err) => {
  // エラーを無視する場合
  console.error('エラーが発生しました:', err);
  return false;
});