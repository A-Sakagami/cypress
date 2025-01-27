describe('ユーザー画面テスト', () => {
    beforeEach(() => {
        // あらかじめ文章とステータスを設定しておく
        cy.visit('/login/');
        cy.get('[id=username]').type('user');
        cy.get('[id=password]').type('userpass1234');
        cy.get('#loginForm > button').click();
        cy.window().then((window) => {
            window.localStorage.setItem('posts', JSON.stringify([{
                content: 'test',
                approved: false,
                denyed: false
            },{
                content: 'approved',
                approved: true,
                denyed: false
            },{
                content: 'denyed',
                approved: false,
                denyed: true
            }]));
        });
        cy.visit('/');
    });

    it('一般ユーザーで投稿', () => {
        // cy.window().then((window) => {
        //     const posts = window.localStorage.getItem("posts") || "[]";
        //     cy.log(posts); // コンソールにデータを出力
        // });

        let text:string = "投稿テストです。";
        cy.get('[id=postInput]').type(text);
        cy.get('[id=send-post]').click();
        cy.get('[id=post-3]').should('be.exist');
        cy.get('[id=post-3]').should('have.text', text);
        cy.get('[id=post-3]').should('have.css', 'background-color', 'rgb(173, 216, 230)');
    });

    it('投稿済み文章の確認', () => {
        cy.window().then((window) => {
            const text = window.localStorage.getItem('posts');
            const approved = window.localStorage.getItem('posts');
            const denyed = window.localStorage.getItem('posts');
            
        });
    });

    it('承認された文章の確認', () => {
        cy.window().then((window) => {
            const text = window.localStorage.getItem('posts');
            const approved = window.localStorage.getItem('posts');
            const denyed = window.localStorage.getItem('posts');
            
        });
    });

    it('否認された文章を再投稿', () => {
        cy.window().then((window) => {
            const text = window.localStorage.getItem('posts');
            const approved = window.localStorage.getItem('posts');
            const denyed = window.localStorage.getItem('posts');
            
        });
    });
});