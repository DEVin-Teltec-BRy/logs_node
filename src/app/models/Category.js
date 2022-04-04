import { Model, DataTypes } from 'sequelize';

class Category extends Model {

    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
        }, {
            sequelize
        })
    }

}

export default Category;