import { sequelize, DataTypes, Sequelize } from '../config/database.js';

const Duck = sequelize.define('Duck', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  color: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [['Red', 'Green', 'Yellow', 'Black']]
    }
  },
  size: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [['XLarge', 'Large', 'Medium', 'Small', 'XSmall']]
    }
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  tableName: 'ducks',
  timestamps: false,
});

Duck.prototype.softDelete = async function() {
  await this.update({ deleted: true }); 
};

export default Duck;