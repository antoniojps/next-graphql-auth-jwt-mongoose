import mongoose from 'mongoose'
import validator from 'validator'


// USER
// schema
const UserSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email',
    },
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  surname: {
    type: String,
    trim: true,
  },
  admin: {
    type: Boolean,
    sparce: true,
  },
  moderator: {
    type: Boolean,
    sparce: true,
  },
})

// model methods
UserSchema.statics = {
  findByEmail (email) {
    return User.findOne({
      email,
    })
  },
  newUserObj ({email, password}) {
    return {
      email,
      password
    }
  },
  createUser(newUser) {
    const user = new User(newUser)
    return user.save()
  },
}

// instance methods
UserSchema.methods = {
  toObj () {
    const userObj = this.toObject()
    return userObj
  },
}

// model
const User = mongoose.models.User || mongoose.model('User', UserSchema)

export default User