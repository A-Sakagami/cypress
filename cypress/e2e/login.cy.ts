describe('ログイン' ,() => {
    it('プレミアム会員でログイン', () => {
        const user:string = Cypress.env("USER1");
        const password:string = Cypress.env("USER1_PASS");
        // 実行時ログの出力
        cy.log(user);
        cy.log(password);

        cy.visit('/index.html');
        // head > titleの確認
        cy.title().should('include', 'HOTEL PLANISPHERE');
        cy.get('#login-holder > a').click();
        // 遷移先のURLと head > title の確認
        cy.url().should('include', '/login.html');
        cy.title().should('include', 'ログイン');
        cy.get('[id=email]').type(user);
        cy.get('[id=password]').type(password);
        cy.get('[id=login-button]').click();
        // 遷移先のURLと head > title の確認
        cy.url().should('include', '/mypage.html');
        cy.title().should('include', 'マイページ');
        // ログインユーザーとランクが一致しているか確認
        cy.get('[id=email]').should('have.text', user);
        cy.get('[id=rank]').should('have.text', 'プレミアム会員');
        // プリセットのアカウントではアイコン設定と退会が出来ないことを確認
        cy.get('[role=button][aria-disabled=true]').should('exist');
        cy.get('#delete-form > button').should('have.attr', 'disabled');
    });

    it('一般会員でログイン', () => {
        const user:string = Cypress.env("USER2");
        const password:string = Cypress.env("USER2_PASS");
        // 実行時ログの出力
        cy.log(user);
        cy.log(password);

        cy.visit('/index.html');
        // head > titleの確認
        cy.title().should('include', 'HOTEL PLANISPHERE');
        cy.get('#login-holder > a').click();
        // 遷移先のURLと head > title の確認
        cy.url().should('include', '/login.html');
        cy.title().should('include', 'ログイン');
        cy.get('[id=email]').type(user);
        cy.get('[id=password]').type(password);
        cy.get('[id=login-button]').click();
        // 遷移先のURLと head > title の確認
        cy.url().should('include', '/mypage.html');
        cy.title().should('include', 'マイページ');
        // ログインユーザーとランクが一致しているか確認
        cy.get('[id=email]').should('have.text', user);
        cy.get('[id=rank]').should('have.text', '一般会員');
    });
});


describe('ログアウト' ,() => {
    it('ログアウト', () => {
        const user:string = Cypress.env("USER3");
        const password:string = Cypress.env("USER3_PASS");

        cy.visit('/index.html');
        cy.get('#login-holder > a').click();
        cy.get('[id=email]').type(user);
        cy.get('[id=password]').type(password);
        cy.get('[id=login-button]').click();
        cy.get('#logout-form > button')
            .should('exist')
            .and('be.visible')
            .and('have.text', 'ログアウト')
            .click();
        cy.url().should('include', '/index.html');
    });
});
