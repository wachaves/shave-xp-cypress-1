
import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'

describe('login', () => {

    context('quando submento o forumulário', () => {

        it('deve logar co sucesso', () => {
            const user = {
                name: 'William',
                email: 'wchaves@chaves.com',
                password: 'wac123'
            }

            loginPage.submit(user.email, user.password)
            shaversPage.header.userShouldBeLoggedIn(user.name)

        })

        it('não deve logar com senha incorreta', () => {
            const user = {
                name: 'William',
                email: 'wchaves@chaves.com',
                password: 'incorreta'
            }

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShouldBe(message)

        })

        it('não deve logar com email não cadastrado', () => {
            const user = {
                name: 'William',
                email: 'wchaves@error.com',
                password: 'wac123'
            }

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

            const passwords = [
                '1',
                '12',
                '123',
                '1234',
                '12345'
            ]

            passwords.forEach((p) => {
                // it('não deve logar com a senha ' + p, ()=> {
                it(`não deve logar com a senha: ${p}`, () => {
                    loginPage.submit('wachaves@teste.com', p)
                    loginPage.alertShouldBe('Pelo menos 6 caracteres')
                })
            })
        })

        context('email no formato incorreto', () => {

            const emails = [
                'wchaves$chaves.com',
                'wachaves.com.br',
                '@chaves.com',
                '@',
                'wachaves@',
                'wachaves@chaves',
                '789456',
                '@#$%¨&',
                'wac123'
            ]

            emails.forEach((e) => {
                // it('não deve logar com a senha ' + e, ()=> {
                it(`não deve logar com o email: ${e}`, () => {
                    loginPage.submit(e, 'wac123')
                    loginPage.alertShouldBe('Informe um email válido')
                })
            })
        })




    })

})