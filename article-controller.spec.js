import test from 'tape'
import sinon from 'sinon'

import createArticleController from './article-controller'

function createKnexMock() {
  const knexMock = sinon.spy(() => {
    return knexMock
  })

  const mockMethods = {
    select: sinon.spy(() => {
      return knexMock
    }),

    where: sinon.spy(() => {
      return knexMock
    })
  }

  return Object.assign(knexMock, mockMethods)
}

test('articleController.getPopularTitles should query the database', (assert) => {
  const knexMock = createKnexMock()
  const articleController = createArticleController({ knex: knexMock })

  articleController.getPopularTitles(1000)

  assert.ok(knexMock.calledWith('article'),
    'article collection should be queried')
  assert.ok(knexMock.select.calledWith('title'),
    'only title should be selected')
  assert.ok(knexMock.where.calledWith('likes_count', '>', 1000),
    'results should be filtered to only include popular articles')

  assert.end()
})
