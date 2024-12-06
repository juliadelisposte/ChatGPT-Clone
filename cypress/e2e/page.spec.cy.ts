describe('Interação com a tag <textarea>', () => {
  it('Deve escrever no campo de texto e pressionar Enter', () => {
    cy.visit('http://localhost:3000');
    cy.get('textarea')
      .should('be.visible')
      .click()
      .type('Olá, isso é um teste{enter}');

  });
});

describe('Validação de opacidade do botão', () => {
  it('Deve ter opacidade 20 quando o textarea estiver vazio', () => {
    cy.visit('http://localhost:3000');
    cy.get('textarea')
      .should('be.empty');

    cy.get('.self-end')
      .should('have.css', 'opacity', '0.2');
  });

  it('Deve mudar a opacidade para 100 quando algo for escrito', () => {
    cy.visit('http://localhost:3000');
    cy.get('textarea')
      .type('Olá, isso é um teste');
    cy.get('.self-end')
      .should('have.css', 'opacity', '1');
  });
});

describe('Testando fluxo de nova conversa e limpeza', () => {
  it('Deve iniciar uma nova conversa, enviar mensagem e limpar todas as conversas', () => {
    cy.visit('http://localhost:3000');
    cy.get('textarea')
      .should('be.visible')
      .click()
      .type('Olá, isso é um teste{enter}');
      cy.wait(3000);
      cy.contains('div', 'Nova Conversa')
      .should('be.visible')
      .click();

    cy.get('h3.text-4xl.font-bold.text-center.my-8')
      .should('contain.text', 'Chat GPT');
    cy.get('textarea')
      .should('be.visible')
      .type('Testando o botão de nova conversa :){enter}');
    cy.wait(3000);
    cy.get('div.flex-1.text-base.whitespace-pre-wrap')
      .should('contain.text', 'Aqui vai a resposta da AI');

    cy.contains('div', 'Limpar todas as conversas')
      .should('be.visible')
      .click();
    cy.get('nav.flex-1.pt-2.overflow-y-auto')
      .find('div')
      .should('not.exist');
  });
});


