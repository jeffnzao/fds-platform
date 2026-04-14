// prisma/seed.js — Données initiales FDS

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding FDS database...');

  // ─── Pays ────────────────────────────────────────────────
  const countries = await Promise.all([
    prisma.country.upsert({
      where: { code: 'GA' },
      update: {},
      create: { name: 'Gabon', code: 'GA', flag: '🇬🇦', isActive: true },
    }),
    prisma.country.upsert({
      where: { code: 'FR' },
      update: {},
      create: { name: 'France', code: 'FR', flag: '🇫🇷', isActive: true },
    }),
    prisma.country.upsert({
      where: { code: 'US' },
      update: {},
      create: { name: 'États-Unis', code: 'US', flag: '🇺🇸', isActive: true },
    }),
    prisma.country.upsert({
      where: { code: 'BE' },
      update: {},
      create: { name: 'Belgique', code: 'BE', flag: '🇧🇪', isActive: true },
    }),
  ]);

  console.log(`✅ ${countries.length} pays créés`);

  const gabon = countries.find(c => c.code === 'GA');
  const france = countries.find(c => c.code === 'FR');

  // ─── Pôles thématiques ───────────────────────────────────
  const polesData = [
    // Gabon
    { name: 'Économie & Finance', color: '#10B981', icon: 'TrendingUp', countryId: gabon.id },
    { name: 'Santé', color: '#EF4444', icon: 'Heart', countryId: gabon.id },
    { name: 'Éducation', color: '#3B82F6', icon: 'BookOpen', countryId: gabon.id },
    { name: 'Jeunesse & Sport', color: '#F59E0B', icon: 'Zap', countryId: gabon.id },
    { name: 'Communication', color: '#8B5CF6', icon: 'Radio', countryId: gabon.id },
    // France - Pôles spécifiques
    { name: 'Diaspora & Retour', color: '#06B6D4', icon: 'Globe', countryId: france.id },
    { name: 'Économie & Entrepreneuriat', color: '#10B981', icon: 'TrendingUp', countryId: france.id },
    { name: 'Social & Solidarité', color: '#EF4444', icon: 'Heart', countryId: france.id },
    { name: 'Communication', color: '#8B5CF6', icon: 'Radio', countryId: france.id },
    { name: 'Citoyenneté & Droits', color: '#3B82F6', icon: 'Shield', countryId: france.id },
    { name: 'Institutions', color: '#F59E0B', icon: 'Building', countryId: france.id },
  ];

  const poles = [];
  for (const poleData of polesData) {
    const pole = await prisma.pole.upsert({
      where: { id: poleData.name + poleData.countryId }, // trick pour éviter les doublons
      update: {},
      create: poleData,
    }).catch(() => prisma.pole.create({ data: poleData }));
    poles.push(pole);
  }

  console.log(`✅ ${poles.length} pôles créés`);

  // ─── Super Admin ─────────────────────────────────────────
  const adminPassword = await bcrypt.hash('Admin@FDS2024!', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@fds-gabon.org' },
    update: {},
    create: {
      email: 'admin@fds-gabon.org',
      passwordHash: adminPassword,
      firstName: 'Super',
      lastName: 'Admin',
      role: 'SUPER_ADMIN',
      status: 'ACTIF',
      emailVerified: true,
      countryId: gabon.id,
    },
  });

  console.log(`✅ Super Admin créé: ${admin.email} / Admin@FDS2024!`);

  // ─── Utilisateurs de test ────────────────────────────────
  const testPassword = await bcrypt.hash('Test@1234!', 12);

  const respPays = await prisma.user.upsert({
    where: { email: 'resp.gabon@fds-gabon.org' },
    update: {},
    create: {
      email: 'resp.gabon@fds-gabon.org',
      passwordHash: testPassword,
      firstName: 'Jean-Claude',
      lastName: 'Ndong',
      role: 'RESPONSABLE_PAYS',
      status: 'ACTIF',
      emailVerified: true,
      countryId: gabon.id,
      memberNumber: 'FDS-GA-001',
    },
  });

  const membre = await prisma.user.upsert({
    where: { email: 'membre@fds-gabon.org' },
    update: {},
    create: {
      email: 'membre@fds-gabon.org',
      passwordHash: testPassword,
      firstName: 'Marie',
      lastName: 'Obame',
      role: 'MEMBRE',
      status: 'ACTIF',
      emailVerified: true,
      countryId: gabon.id,
      memberNumber: 'FDS-GA-042',
    },
  });

  console.log(`✅ Utilisateurs de test créés`);
  console.log(`   - resp.gabon@fds-gabon.org / Test@1234!`);
  console.log(`   - membre@fds-gabon.org / Test@1234!`);

  // ─── Utilisateurs France ──────────────────────────────────
  const president = await prisma.user.upsert({
    where: { email: 'president@fds-france.org' },
    update: {},
    create: {
      email: 'president@fds-france.org',
      passwordHash: testPassword,
      firstName: 'Pierre',
      lastName: 'Dubois',
      role: 'PRESIDENT',
      status: 'ACTIF',
      emailVerified: true,
      countryId: france.id,
      memberNumber: 'FDS-FR-001',
    },
  });

  const sg = await prisma.user.upsert({
    where: { email: 'sg@fds-france.org' },
    update: {},
    create: {
      email: 'sg@fds-france.org',
      passwordHash: testPassword,
      firstName: 'Marie',
      lastName: 'Martin',
      role: 'SECRETAIRE_GENERAL',
      status: 'ACTIF',
      emailVerified: true,
      countryId: france.id,
      memberNumber: 'FDS-FR-002',
    },
  });

  console.log(`✅ Utilisateurs France créés`);
  console.log(`   - president@fds-france.org / Test@1234!`);
  console.log(`   - sg@fds-france.org / Test@1234!`);

  console.log('\n🎉 Seeding terminé avec succès !');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
