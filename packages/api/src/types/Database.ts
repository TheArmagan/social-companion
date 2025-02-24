export class Database {
  static client = new PrismaClient().$extends({
    model: {
      user: {
        async hello() {
          return "World";
        }
      }
    }
  })
}