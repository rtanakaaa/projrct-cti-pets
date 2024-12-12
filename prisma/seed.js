const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const categories = [
    {
      name: 'Cães',
      slug: 'caes',
      description: 'Produtos para cães',
      iconName: 'Dog',
    },
    {
      name: 'Gatos',
      slug: 'gatos',
      description: 'Produtos para gatos',
      iconName: 'Cat',
    },
    {
      name: 'Peixes',
      slug: 'peixes',
      description: 'Produtos para peixes',
      iconName: 'Fish',
    },
    {
      name: 'Aves',
      slug: 'aves',
      description: 'Produtos para aves',
      iconName: 'Bird',
    },
  ];

  for (const category of categories) {
    const createdCategory = await prisma.category.create({ data: category });
    console.log(`Categoria criada: ${createdCategory.name}`);

    const product = await prisma.product.create({
      data: {
        name: `Ração Premium para ${category.name}`,
        slug: `racao-premium-${category.slug}`,
        description: `Ração de alta qualidade para ${category.name.toLowerCase()}`,
        price: 49.99,
        stockQuantity: 100,
        isFeatured: true,
        categoryId: createdCategory.id,
      },
    });
    console.log(`Produto criado: ${product.name}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
