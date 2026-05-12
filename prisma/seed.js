/**
 * SCRIPT DE SEMILLAS (SEEDING) PARA PRISMA
 * 
 * Este script permite gestionar los datos iniciales de la base de datos.
 * 
 * USO:
 *   node prisma/seed.js <comando>
 * 
 * COMANDOS:
 *   seed   - Crea datos de demostración (Usuarios, Bloques de Tiempo y Citas).
 *   clear  - Elimina todos los registros de las tablas vinculadas.
 *   reset  - Ejecuta 'clear' seguido de 'seed' para una limpieza y repoblación total.
 * 
 * REQUISITOS:
 *   - El archivo .env debe tener configurada la variable DATABASE_URL.
 *   - Haber ejecutado 'npx prisma generate' si hubo cambios en el esquema.
 */

// Utilizamos el cliente de Prisma para interactuar con la base de datos
import { PrismaClient } from '../generated/client/index.js';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

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

  const createdUsers = [];
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const u = await prisma.user.create({
      data: {
        ...user,
        password: hashedPassword
      }
    });
    createdUsers.push(u);
  }
  console.log('✅ Usuarios de demostración creados con éxito (contraseñas hasheadas).');

  const timeBlocks = [
    { startTime: new Date('2026-05-10T09:00:00Z'), endTime: new Date('2026-05-10T10:00:00Z') },
    { startTime: new Date('2026-05-10T10:00:00Z'), endTime: new Date('2026-05-10T11:00:00Z') },
    { startTime: new Date('2026-05-10T11:00:00Z'), endTime: new Date('2026-05-10T12:00:00Z') },
    { startTime: new Date('2026-05-10T12:00:00Z'), endTime: new Date('2026-05-10T13:00:00Z') },
    { startTime: new Date('2026-05-10T13:00:00Z'), endTime: new Date('2026-05-10T14:00:00Z') },
  ];

  const createdBlocks = [];
  for (const block of timeBlocks) {
    const b = await prisma.timeBlock.create({
      data: block
    });
    createdBlocks.push(b);
  }
  console.log('✅ Bloques de tiempo creados con éxito.');

  const appointments = [
    { date: new Date('2026-05-10'), userId: createdUsers[0].id, timeBlockId: createdBlocks[0].id },
    { date: new Date('2026-05-10'), userId: createdUsers[1].id, timeBlockId: createdBlocks[1].id },
    { date: new Date('2026-05-11'), userId: createdUsers[2].id, timeBlockId: createdBlocks[2].id },
  ];

  for (const appointment of appointments) {
    await prisma.appointment.create({
      data: appointment
    });
  }
  console.log('✅ Citas de demostración creadas con éxito.');
}

async function clear() {
  // Eliminamos en orden para evitar errores de integridad referencial
  await prisma.appointment.deleteMany();
  await prisma.timeBlock.deleteMany();
  await prisma.user.deleteMany();
  console.log('🗑️  Datos de Appointments, TimeBlocks y Users eliminados con éxito.');
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