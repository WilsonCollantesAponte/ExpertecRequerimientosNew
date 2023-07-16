const { DataTypes } = require("sequelize");
// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize("sqlite::memory:");

module.exports = (sequelizeInstance) => {
  sequelizeInstance.define(
    "Requirement",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      tipoRequerimiento: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      plataforma: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      vista: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      interaccion: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      prioridad: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      emailCliente: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      emailDesarrollador: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      fechaInicio: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      fechaFin: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      tiempoEstimado: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      estadoFinalAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      estadoFinalDev: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
