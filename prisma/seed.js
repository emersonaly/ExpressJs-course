// Utilizamos el cliente de Prisma para interactuar con la base de datos
import { PrismaClient } from '../generated/client/index.js';
import { PrismaPg } from '@prisma/adapter-pg';

process.loadEnvFile();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function seed() {
  const users = [
    { name: 'Usuario 1', email: 'email1@mail.com', password: 'password1', role: 'ADMIN' },
    { name: 'Usuario 2', email: 'email2@mail.com', password: 'password2', role: 'USER' },
    { name: 'Usuario 3', email: 'email3@mail.com', password: 'password3', role: 'USER' }
  ];

  for (const user of users) {
    await prisma.user.create({
      data: user
    });
  }
  console.log('✅ Usuarios de demostración creados con éxito.');
}

async function clear() {
  // Primero eliminamos citas (si las hubiera) para evitar errores de clave foránea si agregas la relación después
  await prisma.appointment.deleteMany();
  await prisma.user.deleteMany();
  console.log('🗑️  Datos de Appointments y Users eliminados con éxito.');
}

async function main() {
  const action = process.argv[2]; // Capturamos el argumento de la terminal

  if (action === 'seed') {
    await seed();
  } else if (action === 'clear') {
    await clear();
  } else if (action === 'reset') {
    await clear();
    await seed();
  } else {
    console.log('⚠️  Por favor, especifica una acción válida:');
    console.log('   node prisma/seed.js seed  -> Popular la base de datos');
    console.log('   node prisma/seed.js clear -> Eliminar todos los datos');
    console.log('   node prisma/seed.js reset -> Eliminar y volver a popular');
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());