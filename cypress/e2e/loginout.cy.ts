describe('ログイン', () => {
  it('ヘッダーからログイン画面へ遷移', () => {
    cy.visit('/');
    cy.title().should('include', 'Workflow Tool');
    cy.get('[id=auth-menu]').click();
    cy.title().should('include', 'Login');
  })

  it('ログインボタンからログイン画面へ遷移', () => {
    cy.visit('/');
    cy.title().should('include', 'Workflow Tool');
    cy.get('[id=login-button]').click();
    cy.title().should('include', 'Login');
  })

  it('一般ユーザーでログイン', () => {
    cy.visit('/login/');
    cy.title().should('include', 'Login');
    cy.get('[id=username]').type('user');
    cy.get('[id=password]').type('userpass1234');
    cy.get('#loginForm > button').click();
    // ポップアップ処理
    cy.on('window.alert', (text) => {
      expect(text).to.contains('ログインしました');
      return true;
    });
    cy.title().should('include', 'Workflow Tool');
    cy.get('[id=postInput]').should('be.visible');
    cy.get('[id=send-post]').should('be.visible');
  })
})

describe('ログアウト', () => {
  it('ログアウト', () => {
    cy.visit('/login/');
    cy.title().should('include', 'Login');
    cy.get('[id=username]').type('user');
    cy.get('[id=password]').type('userpass1234');
    cy.get('#loginForm > button').click();
    // ポップアップ処理
    cy.on('window.alert', (text) => {
      expect(text).to.contains('ログインしました');
      return true;
    });
    cy.get('[id=auth-menu]').click();
    // ポップアップ処理
    cy.on('window.alert', (text) => {
      expect(text).to.contains('ログアウトしました');
      return true;
    });
    cy.title().should('include', 'Workflow Tool');
  })
})