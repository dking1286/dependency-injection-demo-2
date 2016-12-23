export default function createArticleContoller(dependencies) {
  const { knex } = dependencies

  return {
    getPopularTitles(minimumLikes) {
      return knex('article')
        .select('title')
        .where('likes_count', '>', minimumLikes)
    }
  }
}
