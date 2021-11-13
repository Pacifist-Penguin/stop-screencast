// https:// docs.cypress.io/api/introduction/api.html
const expectedText = `.firstClass {
  display: none
}`
describe('Tests if audio works', () => {
  it('Grabs text', () => {
    cy.visit('/')
    cy.get('audio')
      .then(($video) => {
        $video[0].play()
      }).wait(3000)
      .get('.textContainer')
      .should('have.text', expectedText)
  })
})
