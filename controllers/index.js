const { User, Task } = require('../models')

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body)
    return res.status(201).json({ user })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Task,
        },
      ],
    })
    return res.status(200).json({ users })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

const getUserById = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Task,
        },
      ],
    })
    if (user) {
      return res.status(200).json({ user })
    } else {
      return res.status(404).send('Cant find User')
    }
  } catch (error) {
    res.status(500).send('Error', error.message)
  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const [updated] = await User.update(
      {
        firstName: 'Stive',
        lastName: 'Smith',
        email: 'abc@d.c',
        password: 'secret',
      },
      { where: { id: id } }
    )
    if (updated) {
      const updatedUser = await User.findOne({ where: { id: id } })
      return res.status(200).json({ user: updatedUser })
    }
    throw new Error('User not found')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await User.destroy({
      where: { id: id },
    })
    if (deleted) {
      res.status(200).json({ deleted })
    }
    throw new Error('User not found')
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
}
