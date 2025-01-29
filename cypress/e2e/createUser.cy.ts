describe('ユーザー登録', () => {
    beforeEach(() => {
        cy.visit('/index.html');
    });

    it('プレミアム会員登録', () => {
        const user:string = Cypress.env("PREMIUM_USER");
        const pass:string = Cypress.env("PREMIUM_USER_PASS");

        cy.get('#signup-holder > a').click();
        cy.url().should('include', '/signup.html');
        // 必要事項の入力（任意項目も全て記載する）
        cy.get('[id=email]').type(user);
        cy.get('[id=password]').type(pass);
        cy.get('[id=password-confirmation]').type(pass);
        cy.get('[id=username]').type("山田 太郎");
        cy.get("input[type='radio'][value='premium']").check();
        // 選択チェック
        cy.get("input[type='radio'][value='premium']").should("be.checked");
        cy.get('[id=address]').type("東京都千代田区神田駿河台2-3-11");
        cy.get('[id=tel]').type("09012345678");
        // 桁数チェック
        cy.get('[id=tel]').invoke("val").then((tel) => {
            expect(tel).to.match(/^0\d{10}$/);
        });
        cy.get('[id=gender]').select("男性").should("have.value", 1);
        cy.get('[id=birthday]').type("1990-01-01");
        // 日付パターンチェック
        cy.get('[id=birthday]').invoke("val").then((birthday) => {
            expect(birthday).to.match(/^\d{4}-\d{2}-\d{2}$/);
        });
        // チェックボックスの状態をチェック
        cy.get('[id=notification]').check().should("be.checked");
        cy.get('#signup-form > button').click();
        cy.url().should('include', '/mypage.html');
        // Cookieを保存
        cy.getCookie("session").should("exist").then((cookie) => {
            Cypress.env("session", cookie?.value);
        });
        // ローカルストレージを保存
        cy.window().then((win) => {
            const authToken = win.localStorage.getItem(user);
            expect(authToken).to.not.be.null;
            Cypress.env("authToken", authToken);
        })
    })

    it('一般会員登録', () => {
        const user:string = Cypress.env("NORMAL_USER");
        const pass:string = Cypress.env("NORMAL_USER_PASS");

        cy.get('#signup-holder > a').click();
        cy.url().should('include', '/signup.html');
        // 必要事項の入力（任意項目を記載しない）
        cy.get('[id=email]').type(user);
        cy.get('[id=password]').type(pass);
        cy.get('[id=password-confirmation]').type(pass);
        cy.get('[id=username]').type("山田 花子");
        cy.get("input[type='radio'][value='normal']").check();
        cy.get('#signup-form > button').click();
        cy.url().should('include', '/mypage.html');
    })

    it('アイコン設定', () => {
        // クッキー設定
        cy.setCookie("session", Cypress.env("session"));
        cy.getCookie("session").then((cookie) => {
            cy.log(`Cookie value: ${cookie?.value}`);
          });
        // ローカルストレージ設定
        cy.window().then((win) => {
            win.localStorage.setItem(Cypress.env("PREMIUM_USER"), Cypress.env("authToken"));
            cy.log(`Local storage value: ${win.localStorage.getItem(Cypress.env("PREMIUM_USER"))}`);
        });

        /**
         * 片方だけではうまくいかない理由:
         * Cookieはサーバー認証用、ローカルストレージはクライアントの状態管理用に使われるため、両方が必要。
         */
          
        cy.visit('/mypage.html');
        // ログイン情報確認
        cy.get('[id=email]').should('have.text', 'sakagami@genz.jp');
        cy.get('[id=rank]').should('have.text', 'プレミアム会員');
        // アイコン設定
        cy.get('[id=icon-link]').should("have.text", "アイコン設定").click();
        // ファイルを選択画面から、ローカルのファイルをアップロードする
        const filepath:string = "nigaoe_nitobe_inazou.png";
        cy.get('#icon').attachFile(filepath);
        // レンジバーの操作
        cy.get("[id=zoom]").invoke("val", 75);
        cy.get("[id=zoom]").trigger("change");
        cy.get("[id=zoom]").should("have.value", 75);
        // 枠線RGBの操作
        cy.get("[id=color]").invoke("val", "#b80000");
        cy.get("[id=color]").trigger("change");
        cy.get("[id=color]").should("have.value", "#b80000");
        cy.screenshot('アイコン設定', { capture: 'fullPage' });
        cy.get("#icon-form > button").should("have.text", "確定").click();
        cy.url().should('include', '/mypage.html');
        // アイコン画像の確認
        cy.get("[id=icon-holder]").should("be.visible");
        cy.get("[id=icon-holder]").find("img").should("have.attr", "src");

    });

    it('アカウント削除_キャンセル', () => {
        // クッキー設定
        cy.setCookie("session", Cypress.env("session"));
        cy.getCookie("session").then((cookie) => {
            cy.log(`Cookie value: ${cookie?.value}`);
          });
        // ローカルストレージ設定
        cy.window().then((win) => {
            win.localStorage.setItem(Cypress.env("PREMIUM_USER"), Cypress.env("authToken"));
            cy.log(`Local storage value: ${win.localStorage.getItem(Cypress.env("PREMIUM_USER"))}`);
        });

        cy.visit('/mypage.html');
        // ログイン情報確認
        cy.get('[id=email]').should('have.text', 'sakagami@genz.jp');
        cy.get('[id=rank]').should('have.text', 'プレミアム会員');
       
        // ポップアップ制御
        // キャンセル処理
        cy.on("window:confirm", (text) => {
            expect(text).to.equal("退会すると全ての情報が削除されます。\nよろしいですか？");
            return false;
        });
        // アカウント削除
        cy.get('#delete-form > button').should("have.text", "退会する").click();

        // ヘッダーの確認
        cy.url().should('include', '/mypage.html');

    });

    it('アカウント削除_OK', () => {
        // クッキー設定
        cy.setCookie("session", Cypress.env("session"));
        cy.getCookie("session").then((cookie) => {
            cy.log(`Cookie value: ${cookie?.value}`);
          });
        // ローカルストレージ設定
        cy.window().then((win) => {
            win.localStorage.setItem(Cypress.env("PREMIUM_USER"), Cypress.env("authToken"));
            cy.log(`Local storage value: ${win.localStorage.getItem(Cypress.env("PREMIUM_USER"))}`);
        });

        cy.visit('/mypage.html');
        // ログイン情報確認
        cy.get('[id=email]').should('have.text', 'sakagami@genz.jp');
        cy.get('[id=rank]').should('have.text', 'プレミアム会員');
       
        // ポップアップ制御
        // OK処理
        cy.on("window:confirm", (text) => {
            expect(text).to.equal("退会すると全ての情報が削除されます。\nよろしいですか？");
            return true; 
        });
        cy.on("window:alert", (text) => {
            expect(text).to.equal("退会処理を完了しました。ご利用ありがとうございました。");
            return true; 
        });
        // アカウント削除
        cy.get('#delete-form > button').should("have.text", "退会する").click();

        // ヘッダーの確認
        cy.url().should('include', '/index.html');
        cy.wait(1000);
    });
});