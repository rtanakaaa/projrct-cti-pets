const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkDatabase() {
  try {
    console.log('Verificando categorias...')
    const categories = await prisma.category.findMany()
    console.log('Categorias encontradas:', categories)

    console.log('\nVerificando produtos...')
    const products = await prisma.product.findMany({
      include: {
        category: true
      }
    })
    console.log('Produtos encontrados:', products)
  } catch (error) {
    console.error('Erro ao verificar banco:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkDatabase()