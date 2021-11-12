// https:// docs.cypress.io/api/introduction/api.html
const expectedText = `.firstClass {
  display: none
}`
function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

describe('Tests if audio works', () => {
  it('Plays audio', () => {
    cy.visit('/')
    cy.get('audio')
      .should('have.prop', 'paused', true)
      .and('have.prop', 'ended', false)
      .then(($video) => {
        $video[0].play()
        setTimeout(() => {
          $video[0].pause()
          cy.get('.textbox').should(($div) => {
            expect($div.text().trim()).equal('xd')
          })
        }, 3000)
      })
  })

  it('Grabs text', async () => {
    cy.visit('/')
    cy.get('audio')
      .then(($video) => {
        $video[0].play()
      })
    await sleep(3000)
    cy.get('.textContainer').should('have.text', expectedText)
  })
})
