
import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'
import data from '../fixtures/users-login.json'

describe('login', () => {

    context('quando submento o forumulário', () => {
        it('deve logar com sucesso', () => {
            const user = data.success

            loginPage.submit(user.email, user.password)
            shaversPage.header.userShouldBeLoggedIn(user.name)
        })

        it('não deve logar com senha incorreta', () => {
            const user = data.invpass

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShouldBe(message)

        })

        it('não deve logar com email não cadastrado', () => {
            const user = data.email404

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShouldBe(message)
        })

        it('campos obrigatórios', () => {
            loginPage.submit()
            loginPage.requiredFields('E-mail é obrigatório', 'Senha é obrigatória')

            // cy.contains('.alert-error', 'E-mail é obrigatório')
            //     .should('be.visible')

            // cy.contains('.alert-error', 'Senha é obrigatória')
            //     .should('be.visible')

            // cy.get('.alert-error')
            //     .should('have.length', 2)
            //     .and(($small)=> {
            //         expect($small.get(0).textContent).to.equal('E-mail é obrigatório')
            //         expect($small.get(1).textContent).to.equal('Senha é obrigatória')
            //     })
        })

        context('senha muito curta', () => {
            data.shortpass.forEach((p) => {
                // it('não deve logar com a senha ' + p, ()=> {
                it(`não deve logar com a senha: ${p}`, () => {
                    loginPage.submit('wachaves@teste.com', p)
                    loginPage.alertShouldBe('Pelo menos 6 caracteres')
                })
            })
        })

        context('email no formato incorreto', () => {
            data.invemails.forEach((e) => {
                // it('não deve logar com a senha ' + e, ()=> {
                it(`não deve logar com o email: ${e}`, () => {
                    loginPage.submit(e, 'wac123')
                    loginPage.alertShouldBe('Informe um email válido')
                })
            })
        })
    })

})