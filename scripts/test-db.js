import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Criar uma categoria de teste
    const category = await prisma.category.create({
      data: {
        name: 'Cães',
        slug: 'caes',
        description: 'Produtos para cães',
        iconName: 'Dog',
      },
    });
    console.log('Categoria criada:', category);

    // Criar um produto de teste
    const product = await prisma.product.create({
      data: {
        name: 'Ração Premium para Cães',
        slug: 'racao-premium-caes',
        description: 'Ração de alta qualidade para cães adultos',
        price: 59.99,
        stockQuantity: 100,
        isFeatured: true,
        categoryId: category.id,
      },
    });
    console.log('Produto criado:', product);

    // Buscar todas as categorias com seus produtos
    const allCategories = await prisma.category.findMany({
      include: { products: true },
    });
    console.log(
      'Todas as categorias com produtos:',
      JSON.stringify(allCategories, null, 2)
    );
  } catch (error) {
    console.error('Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
