/** @format */

// scripts/test-db.ts
import { prisma } from "./lib/prisma";

async function testDatabase() {
  try {
    console.log("Testing database connection...");

    // Test connection
    await prisma.$connect();
    console.log("✓ Database connected successfully");

    // Test query
    const userCount = await prisma.user.count();
    console.log(`✓ Found ${userCount} users in database`);

    // Test user creation (optional)
    /* 
    const testUser = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
        password: 'hashed_password_here'
      }
    })
    console.log('✓ Test user created:', testUser)
    */
  } catch (error) {
    console.error("✗ Database test failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();
