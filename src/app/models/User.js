import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

class User extends Model {

  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      nickname: DataTypes.STRING,
      email: DataTypes.STRING,
      password_hash: DataTypes.STRING,
    }, {
      sequelize,
      paranoid: true, // paranoid
      deletedAt: 'deleted_at', // paranoid
      hooks: {
        beforeCreate: async (user) => {
          user.password_hash = await bcrypt.hash(user.password_hash, 8)
        },
        afterCreate: async (user) => {
          
          const transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "seu usuario",
              pass: "sua senha"
            }
          });

          transport.sendMail({
            from: 'devinhouse@gmail.com', // sender address
            to: user.email, // list of receivers
            subject: "Sua conta DevInHouse", // Subject line
            text: "Sua conta criada", // plain text body
            html: `<div>
                <h1>DevInHouse</h1>
              <p>Bem vindo ${user.name} sua conta foi criada</p>
            </div>`, // html body
          })
        }
      }
    })
  }

  static associate(models) {
    this.hasMany(
      models.Post,
      {
        foreignKey: 'user_id',
        as: 'posts'
      }
    );
  }

}

export default User