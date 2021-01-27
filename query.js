const { User, Task } = require('./models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// Raw SQL: SELECT * FROM "Users";
const findAll = async () => {
  const users = await User.findAll()
  console.log('All Users', JSON.stringify(users, null, 4))
}

// Raw SQL: SELECT * FROM "Users" WHERE firstName = "John";
const findAllJohns = async () => {
  const johns = await User.findAll({
    where: {
      firstName: 'John',
    },
  })
  console.log('All Users named John:', JSON.stringify(johns, null, 4))
}

// Create a new user
// Raw SQL: INSERT INTO "Users" (id, firstName, lastName, email, userName, password, jobTitle)
// VALUES (DEFAULT, 'Jane', 'Doe', 'jane@jane.com', 'janedoe', '123456789', 'Systems Analyst')
const createUser = async () => {
  const jane = await User.create({
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@jane.com',
    userName: 'janedoe',
    password: '12345678',
    jobTitle: 'System Analist',
  })
  console.log('Jane auto-generated ID:', jane.id)
}

// Delete everyone named "Jane"
// Raw SQL: DELETE FROM "Users" WHERE firstName = 'Jane'
const destroyUser = async () => {
  const destroyed = User.destroy({
    where: {
      firstName: 'Jane',
    },
  })
  console.log('destroyed: ', destroyed)
}

// Change lastname "Doe" to "Smith"
// UPDATE "Users" SET lastName='Smith' WHERE lastName = 'Doe'
const updateUser = async () => {
  const updated = User.update(
    { lastName: 'Smith' },
    {
      where: {
        lastName: 'Doe',
      },
    }
  )
  console.log('updated: ', updated)
}

// Find all users and only show their email
// Raw SQL: SELECT email FROM "Users";
const findAllEmails = async () => {
  const emails = await User.findAll({
    attributes: ['email'],
  })
  console.log('all users emails: ', emails)
}

// Find all users where firstname is either John or Jane
// Raw SQL: SELECT * FROM "Users" WHERE firstName = "John" OR firstName = "Jane";
const findAllJohnorJanes = async () => {
  const johnOrJanes = await User.findAll({
    where: {
      [Op.or]: [{ firstName: 'John' }, { firstName: 'Jane' }],
    },
  })
  console.log('John or Janes', johnOrJanes)
}

// Find a task with its associated user
// Raw SQL: SELECT * FROM "Tasks" JOIN "Users" ON "Users"."id" = "Tasks"."userId";

const findAllWithTasks = async () => {
  const tasks = await User.findAll({
    include: [
      {
        model: Task,
      },
    ],
  })
  console.log('All tasks with users: ', JSON.stringify(tasks, null, 4))
}

// Find a task with its associated user
// Raw SQL: SELECT * FROM "Tasks" JOIN "Users" ON "Users"."id" = "Tasks"."userId";
// !!! (node:15037) UnhandledPromiseRejectionWarning: SequelizeEagerLoadingError: User is not associated to Task!
const findTasksWithUser = async () => {
  const tasks = await Task.findAll({
    include: [
      {
        model: User,
      },
    ],
  })
  console.log(
    'All tasks with their associated user:',
    JSON.stringify(tasks, null, 4)
  )
}

// Find all users named John with their associated tasks
// Raw SQL: SELECT * FROM "Users" WHERE firstName = "John" JOIN tasks ON "Tasks"."userId" = "Users".id;
const findAllJohnsWithTasks = async () => {
  const users = await User.findAll({
    where: { firstName: 'John' },
    include: [
      {
        model: Task,
      },
    ],
  })
  console.log(
    'All users named John with their associated tasks:',
    JSON.stringify(users, null, 4)
  )
}

findAllJohnsWithTasks()
