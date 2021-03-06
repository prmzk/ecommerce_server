'use strict';
module.exports = (sequelize, DataTypes) => {
    class Product extends sequelize.Sequelize.Model {}
    Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please insert the name of the product'
        },
        notEmpty: {
          msg: 'Please insert the name of the product'
        },
      }
    },
    img_url: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please insert the price of the product'
        },
        notEmpty: {
          msg: 'Please insert the price of the product'
        },
        min: {
          args: [0],
          msg: 'Price not not valid.'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please insert the stock of the product'
        },
        notEmpty: {
          msg: 'Please insert the stock of the product'
        },
        min: {
          args: [0],
          msg: 'Stock is not valid.'
        }
      }
    },
    category: {
      type: DataTypes.STRING
    },
    highlighted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Product must belong to a store'
        },
        notEmpty: {
          msg: 'Product must belong to a store'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: 'No descriptions.'
    }
  }, {
    sequelize,
    modelName: 'Product'
  });
  Product.associate = function(models) {
    Product.belongsTo(models.Store, { foreignKey: 'store_id' })
    Product.belongsToMany(models.Cart, {
      through: {
        model: models.CartProduct
      },
      foreignKey: 'product_id'
    })
  };
  return Product;
};